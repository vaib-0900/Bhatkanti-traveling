import React, { useEffect, useMemo, useState } from 'react'
import Header from '../componant/Header'
import Footer from '../componant/Footer'
import AuthUser from '../Auth/AuthUser'

const GENDERS = ['male', 'female', 'other']

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card' },
  { id: 'upi', label: 'UPI' },
  { id: 'netbanking', label: 'Net Banking' },
  { id: 'cash', label: 'Cash (Pay at Office)' },
]

const STEPS = ['Trip Details', 'Traveler Info', 'Review & Pay']

// Reads the logged-in customer's id from localStorage. Adjust the keys
// below to match whatever your customer-auth flow actually stores
// (e.g. AuthUser's login response). Tries a few common patterns.
const getCustomerId = () => {
  try {
    const direct =
      localStorage.getItem('customer_id') ||
      localStorage.getItem('user_id') ||
      localStorage.getItem('id')
    if (direct) return direct

    const rawUser = localStorage.getItem('user') || localStorage.getItem('customer')
    if (rawUser) {
      const parsed = JSON.parse(rawUser)
      return parsed?._id || parsed?.id || parsed?.customer_id || null
    }
  } catch (e) {
    console.log('Could not resolve customer id from localStorage', e)
  }
  return null
}

const emptyTraveler = (isPrimary = false) => ({
  first_name: '',
  last_name: '',
  gender: 'male',
  nationality: '',
  passport_number: '',
  passport_expiry: '',
  is_primary: isPrimary,
})

const Booking = () => {
  const { http } = AuthUser()

  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [bookingResult, setBookingResult] = useState(null)

  // ---- data fetched from backend (same endpoints as the admin panel) ----
  const [packages, setPackages] = useState([])
  const [loadingPackages, setLoadingPackages] = useState(true)
  const [schedules, setSchedules] = useState([])

  const getPackages = async () => {
    setLoadingPackages(true)
    await http.get('/tourpackages/list')
      .then((res) => {
        // only show packages that are actually bookable
        const active = (res.data || []).filter(
          (p) => p.is_active && p.status === 'published'
        )
        setPackages(active)
      })
      .catch((err) => {
        console.log(err)
        console.log('Error fetching tourpackages')
      })
      .finally(() => setLoadingPackages(false))
  }

  // Fetched quietly in the background — no schedule UI is shown. We just
  // need a valid schedule_id to send with the booking (backend requires it).
  const getSchedules = async () => {
    await http.get('/tourschedule/list')
      .then((res) => setSchedules(res.data || []))
      .catch((err) => {
        console.log(err)
        console.log('Error fetching tourschedule')
      })
  }

  useEffect(() => {
    getPackages()
    getSchedules()
  }, [])

  const [form, setForm] = useState({
    packageId: '',
    numberOfAdults: 1,
    numberOfChildren: 0,
    name: '',
    email: '',
    phone: '',
    notes: '',
    paymentMethod: 'card',
    currency: 'INR',
  })

  const [travelers, setTravelers] = useState([emptyTraveler(true)])

  // set default package once packages load
  useEffect(() => {
    if (packages.length > 0 && !form.packageId) {
      setForm((prev) => ({ ...prev, packageId: packages[0]._id }))
    }
  }, [packages])

  const selectedPackage = packages.find((p) => p._id === form.packageId) || null

  // auto-pick the first available departure for the selected package —
  // no UI shown, this is purely to satisfy the backend's required schedule_id
  const autoSchedule = useMemo(() => {
    if (!form.packageId) return null
    return (
      schedules.find(
        (s) =>
          String(s.package_id) === String(form.packageId) &&
          !s.is_cancelled &&
          Number(s.available_seats) > 0
      ) || null
    )
  }, [schedules, form.packageId])

  const totalTravelers =
    Number(form.numberOfAdults || 0) + Number(form.numberOfChildren || 0)

  // keep the travelers array length in sync with adults + children count
  useEffect(() => {
    setTravelers((prev) => {
      const next = [...prev]
      if (next.length < totalTravelers) {
        while (next.length < totalTravelers) {
          next.push(emptyTraveler(next.length === 0))
        }
      } else if (next.length > totalTravelers) {
        next.length = Math.max(totalTravelers, 1)
      }
      return next
    })
  }, [totalTravelers])

  const pricing = useMemo(() => {
    if (!selectedPackage) return { base: 0, subtotal: 0, taxes: 0, total: 0, discount: 0 }

    const unitPrice = Number(selectedPackage.discount_price || selectedPackage.base_price || 0)

    const listPrice = Number(selectedPackage.base_price || 0)
    const discountPerPerson = Math.max(listPrice - unitPrice, 0)

    const travelersCount = Math.max(totalTravelers, 1)
    const base = unitPrice * travelersCount
    const subtotal = base
    const taxes = Math.round(subtotal * 0.05)
    const total = subtotal + taxes
    const discount = discountPerPerson * travelersCount

    return { base, subtotal, taxes, total, discount }
  }, [selectedPackage, totalTravelers])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleTravelerChange = (index, field, value) => {
    setTravelers((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedPackage) {
      setSubmitError('Please choose a tour package.')
      return
    }

    const customerId = getCustomerId()
    if (!customerId) {
      setSubmitError('You need to be logged in to complete a booking.')
      return
    }

    if (!autoSchedule) {
      setSubmitError('No available departure for this package right now. Please try another package.')
      return
    }

    setSubmitting(true)
    setSubmitError('')

    const bookingPayload = {
      booking_reference: `BK-${Date.now().toString(36).toUpperCase()}`,
      customer_id: customerId,
      schedule_id: autoSchedule._id,
      number_of_travelers: totalTravelers,
      number_of_adults: Number(form.numberOfAdults),
      number_of_children: Number(form.numberOfChildren),
      total_price: pricing.total,
      discount_applied: pricing.discount,
      booking_status: 'pending',
      payment_status: 'pending',
      contact_name: form.name,
      contact_email: form.email,
      contact_phone: form.phone,
      special_requests: form.notes,
    }

    try {
      const bookingRes = await http.post('/bookings/store', bookingPayload)
      const bookingId =
        bookingRes.data?._id || bookingRes.data?.booking?._id || bookingRes.data?.id

      if (!bookingId) {
        throw new Error('Booking created but no booking id was returned')
      }

      // create a traveler record for each traveler on this booking
      await Promise.all(
        travelers.map((t) =>
          http.post('/bookingtravelers/store', {
            ...t,
            booking_id: bookingId,
          })
        )
      )

      // create the matching payment record for this booking
      const paymentPayload = {
        booking_id: bookingId,
        amount: pricing.total,
        currency: form.currency,
        payment_method: form.paymentMethod,
        transaction_id: '',
        processed_by: null,
      }

      const paymentRes = await http.post('/payments/store', paymentPayload)

      setBookingResult({ ...bookingRes.data, _id: bookingId, payment: paymentRes.data })
      setSubmitted(true)
    } catch (err) {
      console.log('BOOKING SUBMIT ERROR:', err)
      setSubmitError(
        err?.response?.data?.message ||
          'Something went wrong while creating your booking. Please try again.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <>
        <Header />
        <main className="main" id="top">
          <section className="bhk-book-success">
            <div className="container text-center">
              <div className="bhk-success-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h2>Booking Request Received!</h2>
              <p>
                Thanks {form.name || 'traveler'}, we've received your request for{' '}
                <strong>{selectedPackage?.package_name}</strong>
                {bookingResult?.booking_reference && (
                  <> (Ref: <strong>{bookingResult.booking_reference}</strong>)</>
                )}
                {bookingResult?.payment?.payment_reference && (
                  <> — Payment Ref: <strong>{bookingResult.payment.payment_reference}</strong></>
                )}
                . Our team will contact you at{' '}
                {form.phone || form.email || 'your provided details'} within 24 hours to confirm your trip.
              </p>
              <a href="/" className="bhk-cta-btn">Back to Home</a>
            </div>
          </section>
        </main>
        <Footer />
        <style>{`
          .bhk-book-success { padding: 8rem 0 6rem; }
          .bhk-success-icon {
            width: 84px; height: 84px; border-radius: 50%;
            background: #1f4d3d; display: flex; align-items: center; justify-content: center;
            margin: 0 auto 1.5rem;
          }
          .bhk-book-success h2 { font-weight: 700; color: #1e1e1e; margin-bottom: 0.75rem; }
          .bhk-book-success p { color: #6b7280; max-width: 480px; margin: 0 auto 2rem; line-height: 1.7; }
          .bhk-cta-btn {
            display: inline-block; background: #f5581f; color: #fff; font-weight: 600;
            padding: 0.85rem 2.25rem; border-radius: 8px; text-decoration: none;
            transition: background 0.2s ease, transform 0.2s ease;
          }
          .bhk-cta-btn:hover { background: #d8481a; color: #fff; transform: translateY(-2px); }
        `}</style>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="main" id="top">

        {/* ===================== Page Banner ===================== */}
        <section className="bhk-book-banner mt-7">
          <img
            className="bhk-banner-img"
            src="https://i.pinimg.com/1200x/85/62/a8/8562a863b19d2075eb119f1a22044bfe.jpg"
          />
          <div className="bhk-banner-overlay" />
          <div className="container position-relative text-center">
            <h1>Book Your Trip</h1>
            <p className="mb-0">
              <span>Home</span> <span className="sep">/</span> <span className="active">Booking</span>
            </p>
          </div>
        </section>

        {/* ===================== Booking form ===================== */}
        <section className="bhk-book-section">
          <div className="container">

            {/* Step indicator */}
            <div className="bhk-steps">
              {STEPS.map((label, i) => (
                <div key={label} className={'bhk-step' + (i === step ? ' active' : i < step ? ' done' : '')}>
                  <span className="bhk-step-num">{i < step ? '✓' : i + 1}</span>
                  <span className="bhk-step-label">{label}</span>
                  {i < STEPS.length - 1 && <span className="bhk-step-line" />}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row g-4">

                {/* Form column */}
                <div className="col-lg-8">
                  <div className="bhk-form-card">

                    {/* Step 1 */}
                    {step === 0 && (
                      <>
                        <h5 className="bhk-form-title">Choose Your Package</h5>

                        {loadingPackages ? (
                          <p className="text-muted">Loading packages...</p>
                        ) : packages.length === 0 ? (
                          <p className="text-muted">No packages available right now.</p>
                        ) : (
                          <>
                            <div className="mb-3">
                              <label className="bhk-label">Tour Package</label>
                              <select
                                name="packageId"
                                value={form.packageId}
                                onChange={handleChange}
                                className="form-select bhk-input-plain"
                              >
                                {packages.map((p) => (
                                  <option value={p._id} key={p._id}>
                                    {p.package_name} — {p.destination}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="row g-3">
                              <div className="col-sm-6">
                                <label className="bhk-label">Adults</label>
                                <input
                                  type="number"
                                  min={1}
                                  max={20}
                                  name="numberOfAdults"
                                  value={form.numberOfAdults}
                                  onChange={handleChange}
                                  className="form-control bhk-input-plain"
                                  required
                                />
                              </div>
                              <div className="col-sm-6">
                                <label className="bhk-label">Children</label>
                                <input
                                  type="number"
                                  min={0}
                                  max={20}
                                  name="numberOfChildren"
                                  value={form.numberOfChildren}
                                  onChange={handleChange}
                                  className="form-control bhk-input-plain"
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {/* Step 2 */}
                    {step === 1 && (
                      <>
                        <h5 className="bhk-form-title">Traveler Information</h5>

                        <div className="row g-3 mb-4">
                          <div className="col-sm-6">
                            <label className="bhk-label">Contact Name</label>
                            <input
                              type="text"
                              name="name"
                              value={form.name}
                              onChange={handleChange}
                              placeholder="Your full name"
                              className="form-control bhk-input-plain"
                              required
                            />
                          </div>
                          <div className="col-sm-6">
                            <label className="bhk-label">Phone Number</label>
                            <input
                              type="tel"
                              name="phone"
                              value={form.phone}
                              onChange={handleChange}
                              placeholder="+91 98765 43210"
                              className="form-control bhk-input-plain"
                              required
                            />
                          </div>
                          <div className="col-12">
                            <label className="bhk-label">Email Address</label>
                            <input
                              type="email"
                              name="email"
                              value={form.email}
                              onChange={handleChange}
                              placeholder="you@example.com"
                              className="form-control bhk-input-plain"
                              required
                            />
                          </div>
                        </div>

                        {travelers.map((t, i) => (
                          <div key={i} className="bhk-traveler-block">
                            <h6 className="bhk-traveler-title">
                              Traveler {i + 1} {t.is_primary ? '(Primary)' : ''}
                            </h6>
                            <div className="row g-3">
                              <div className="col-sm-6">
                                <label className="bhk-label">First Name</label>
                                <input
                                  type="text"
                                  className="form-control bhk-input-plain"
                                  value={t.first_name}
                                  onChange={(e) => handleTravelerChange(i, 'first_name', e.target.value)}
                                  required
                                />
                              </div>
                              <div className="col-sm-6">
                                <label className="bhk-label">Last Name</label>
                                <input
                                  type="text"
                                  className="form-control bhk-input-plain"
                                  value={t.last_name}
                                  onChange={(e) => handleTravelerChange(i, 'last_name', e.target.value)}
                                  required
                                />
                              </div>
                              <div className="col-sm-4">
                                <label className="bhk-label">Gender</label>
                                <select
                                  className="form-select bhk-input-plain"
                                  value={t.gender}
                                  onChange={(e) => handleTravelerChange(i, 'gender', e.target.value)}
                                >
                                  {GENDERS.map((g) => (
                                    <option value={g} key={g} className="text-capitalize">{g}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="col-sm-4">
                                <label className="bhk-label">Nationality</label>
                                <input
                                  type="text"
                                  className="form-control bhk-input-plain"
                                  value={t.nationality}
                                  onChange={(e) => handleTravelerChange(i, 'nationality', e.target.value)}
                                />
                              </div>
                              <div className="col-sm-4">
                                <label className="bhk-label">Passport Number</label>
                                <input
                                  type="text"
                                  className="form-control bhk-input-plain"
                                  value={t.passport_number}
                                  onChange={(e) => handleTravelerChange(i, 'passport_number', e.target.value)}
                                />
                              </div>
                              <div className="col-sm-6">
                                <label className="bhk-label">Passport Expiry</label>
                                <input
                                  type="date"
                                  className="form-control bhk-input-plain"
                                  value={t.passport_expiry}
                                  onChange={(e) => handleTravelerChange(i, 'passport_expiry', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="mb-3">
                          <label className="bhk-label">Special Requests (optional)</label>
                          <textarea
                            name="notes"
                            value={form.notes}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Dietary needs, accessibility, celebration occasions..."
                            className="form-control bhk-input-plain"
                          />
                        </div>
                      </>
                    )}

                    {/* Step 3 */}
                    {step === 2 && (
                      <>
                        <h5 className="bhk-form-title">Review Your Booking</h5>
                        <ul className="bhk-review-list">
                          <li><span>Package</span><strong>{selectedPackage?.package_name || '—'}</strong></li>
                          <li><span>Destination</span><strong>{selectedPackage?.destination || '—'}</strong></li>
                          <li><span>Travelers</span><strong>{form.numberOfAdults}A / {form.numberOfChildren}C</strong></li>
                          <li><span>Contact</span><strong>{form.name || '—'}</strong></li>
                          <li><span>Email</span><strong>{form.email || '—'}</strong></li>
                          <li><span>Phone</span><strong>{form.phone || '—'}</strong></li>
                        </ul>

                        <div className="row g-3 mb-3">
                          <div className="col-sm-7">
                            <label className="bhk-label">Payment Method</label>
                            <select
                              name="paymentMethod"
                              value={form.paymentMethod}
                              onChange={handleChange}
                              className="form-select bhk-input-plain"
                            >
                              {PAYMENT_METHODS.map((m) => (
                                <option value={m.id} key={m.id}>{m.label}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-sm-5">
                            <label className="bhk-label">Currency</label>
                            <select
                              name="currency"
                              value={form.currency}
                              onChange={handleChange}
                              className="form-select bhk-input-plain"
                            >
                              <option value="INR">INR (₹)</option>
                              <option value="USD">USD ($)</option>
                            </select>
                          </div>
                        </div>

                        {submitError && (
                          <div className="alert alert-danger py-2 px-3" style={{ fontSize: '0.85rem' }}>
                            {submitError}
                          </div>
                        )}

                        <div className="bhk-payment-note">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1f4d3d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="10" rx="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                          Payment is collected securely after our team confirms availability.
                        </div>
                      </>
                    )}

                    {/* Step controls */}
                    <div className="bhk-step-actions">
                      {step > 0 && (
                        <button type="button" onClick={back} className="bhk-btn-outline" disabled={submitting}>
                          Back
                        </button>
                      )}
                      {step < STEPS.length - 1 && (
                        <button
                          type="button"
                          onClick={next}
                          className="bhk-btn-solid ms-auto"
                          disabled={step === 0 && !form.packageId}
                        >
                          Continue
                        </button>
                      )}
                      {step === STEPS.length - 1 && (
                        <button type="submit" className="bhk-btn-solid ms-auto" disabled={submitting}>
                          {submitting ? 'Submitting...' : 'Confirm Booking'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Summary sidebar */}
                <div className="col-lg-4">
                  <div className="bhk-summary-card">
                    {selectedPackage?.featured_image && (
                      <img
                        src={`http://localhost:3000/media/${selectedPackage.featured_image}`}
                        alt={selectedPackage.package_name}
                        className="bhk-summary-img"
                      />
                    )}
                    <div className="bhk-summary-body">
                      <h6>{selectedPackage?.package_name || 'Select a package'}</h6>
                      {selectedPackage && (
                        <p className="bhk-summary-place">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f5581f" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {selectedPackage.destination}
                        </p>
                      )}

                      <div className="bhk-summary-row">
                        <span>Base price × {totalTravelers || 1}</span>
                        <span>₹{pricing.base.toLocaleString('en-IN')}</span>
                      </div>
                      {pricing.discount > 0 && (
                        <div className="bhk-summary-row">
                          <span>Discount</span>
                          <span>−₹{pricing.discount.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div className="bhk-summary-row">
                        <span>Taxes &amp; fees (5%)</span>
                        <span>₹{pricing.taxes.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="bhk-summary-total">
                        <span>Total</span>
                        <span>₹{pricing.total.toLocaleString('en-IN')}</span>
                      </div>

                      <div className="bhk-summary-features">
                        <div><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1f4d3d" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg> Free cancellation up to 48 hrs</div>
                        <div><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1f4d3d" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg> 24/7 traveler support</div>
                        <div><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1f4d3d" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg> Best price guaranteed</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </form>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        /* Banner */
        .bhk-book-banner {
          position: relative;
          overflow: hidden;
          padding: 7rem 0 3.5rem;
          min-height: 280px;
          display: flex;
          align-items: center;
        }
        .bhk-banner-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
        .bhk-banner-overlay {
          position: absolute; inset: 0;
          z-index: 0;
        }
        .bhk-book-banner .container { z-index: 1; }
        .bhk-book-banner h1 { color: #fff; font-weight: 700; font-size: 2.4rem; margin-bottom: 0.6rem; }
        .bhk-book-banner p { color: rgba(255,255,255,0.7); font-size: 0.95rem; }
        .bhk-book-banner .active { color: #f5a623; font-weight: 600; }
        .bhk-book-banner .sep { margin: 0 6px; }

        .bhk-book-section { padding: 3.5rem 0 5rem; }

        /* Steps */
        .bhk-steps {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }
        .bhk-step {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .bhk-step-num {
          width: 30px; height: 30px; border-radius: 50%;
          background: #e5e7eb; color: #6b7280;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem; font-weight: 700;
        }
        .bhk-step.active .bhk-step-num { background: #1f4d3d; color: #fff; }
        .bhk-step.done .bhk-step-num { background: #f5581f; color: #fff; }
        .bhk-step-label { font-size: 0.85rem; font-weight: 600; color: #6b7280; }
        .bhk-step.active .bhk-step-label { color: #1e1e1e; }
        .bhk-step-line { width: 40px; height: 2px; background: #e5e7eb; margin: 0 6px; }

        /* Form card */
        .bhk-form-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          padding: 2rem;
        }
        .bhk-form-title { font-weight: 700; color: #1e1e1e; margin-bottom: 1.25rem; }
        .bhk-label { display: block; font-size: 0.82rem; color: #6b7280; margin-bottom: 0.35rem; font-weight: 600; }
        .bhk-input-plain {
          border: 1px solid #e5e7eb !important;
          border-radius: 8px !important;
          padding: 0.6rem 0.8rem !important;
          font-size: 0.92rem;
        }
        .bhk-input-plain:focus {
          border-color: #1f4d3d !important;
          box-shadow: 0 0 0 3px rgba(31,77,61,0.1) !important;
        }

        .bhk-traveler-block {
          border: 1px dashed #e5e7eb;
          border-radius: 10px;
          padding: 1rem;
          margin-bottom: 1rem;
        }
        .bhk-traveler-title { font-weight: 700; font-size: 0.88rem; color: #1f4d3d; margin-bottom: 0.75rem; }

        .bhk-review-list { list-style: none; padding: 0; margin: 0 0 1.5rem; }
        .bhk-review-list li {
          display: flex;
          justify-content: space-between;
          padding: 0.65rem 0;
          border-bottom: 1px dashed #eee;
          font-size: 0.9rem;
        }
        .bhk-review-list li span { color: #6b7280; }
        .bhk-review-list li strong { color: #1e1e1e; }
        .bhk-payment-note {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f0f7f4;
          color: #1f4d3d;
          font-size: 0.85rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
        }

        .bhk-step-actions {
          display: flex;
          align-items: center;
          margin-top: 2rem;
          gap: 0.75rem;
        }
        .bhk-btn-outline {
          background: transparent;
          border: 1px solid #d1d5db;
          color: #444;
          font-weight: 600;
          padding: 0.7rem 1.5rem;
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        .bhk-btn-outline:hover { border-color: #1f4d3d; color: #1f4d3d; }
        .bhk-btn-solid {
          background: #1f4d3d;
          border: none;
          color: #fff;
          font-weight: 600;
          padding: 0.7rem 1.75rem;
          border-radius: 8px;
          transition: background 0.2s ease;
        }
        .bhk-btn-solid:hover { background: #173a2e; }
        .bhk-btn-solid:disabled, .bhk-btn-outline:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Summary sidebar */
        .bhk-summary-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          position: sticky;
          top: 100px;
        }
        .bhk-summary-img { width: 100%; height: 160px; object-fit: cover; }
        .bhk-summary-body { padding: 1.5rem; }
        .bhk-summary-body h6 { font-weight: 700; color: #1e1e1e; margin-bottom: 0.3rem; }
        .bhk-summary-place {
          display: flex; align-items: center; gap: 5px;
          font-size: 0.8rem; color: #9ca3af; margin-bottom: 1.1rem;
        }
        .bhk-summary-row {
          display: flex; justify-content: space-between;
          font-size: 0.85rem; color: #6b7280; padding: 0.45rem 0;
        }
        .bhk-summary-total {
          display: flex; justify-content: space-between;
          font-weight: 700; font-size: 1.05rem; color: #1e1e1e;
          padding-top: 0.75rem; margin-top: 0.5rem;
          border-top: 1px solid #f0f0f0;
        }
        .bhk-summary-total span:last-child { color: #1f4d3d; }
        .bhk-summary-features {
          margin-top: 1.25rem;
          display: flex; flex-direction: column; gap: 0.55rem;
        }
        .bhk-summary-features div {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.78rem; color: #6b7280;
        }

        @media (max-width: 991px) {
          .bhk-summary-card { position: static; margin-top: 1.5rem; }
        }
        @media (max-width: 767px) {
          .bhk-book-banner { padding: 6rem 0 2.5rem; }
          .bhk-form-card { padding: 1.5rem; }
        }
      `}</style>
    </>
  )
}

export default Booking