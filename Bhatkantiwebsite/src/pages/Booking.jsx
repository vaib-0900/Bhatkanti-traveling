import React, { useState, useMemo } from 'react'
import Header from '../componant/Header'
import Footer from '../componant/Footer'

const PACKAGES = [
  { id: 'sinhagad', name: 'Sinhagad Fort Trek', place: 'Pune, Maharashtra', price: 999, img: 'https://i.pinimg.com/736x/0e/b2/19/0eb219593e7827dd3f17a2a0437de8af.jpg' },
  { id: 'goa', name: 'Goa Beach Getaway', place: 'Goa', price: 8999, img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80' },
  { id: 'mahabaleshwar', name: 'Mahabaleshwar Hills Escape', place: 'Satara, Maharashtra', price: 4499, img: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=400&q=80' },
  { id: 'kerala', name: 'Kerala Backwaters Tour', place: 'Alleppey, Kerala', price: 14999, img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80' },
  { id: 'rajasthan', name: 'Rajasthan Royal Heritage', place: 'Jaipur, Rajasthan', price: 17999, img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=400&q=80' },
  { id: 'ladakh', name: 'Ladakh Bike Expedition', place: 'Leh, Ladakh', price: 24999, img: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=400&q=80' },
]

const ROOM_TYPES = [
  { id: 'standard', label: 'Standard Room', extra: 0 },
  { id: 'deluxe', label: 'Deluxe Room', extra: 800 },
  { id: 'suite', label: 'Premium Suite', extra: 2200 },
]

const STEPS = ['Trip Details', 'Traveler Info', 'Review & Pay']

const Booking = () => {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState({
    packageId: PACKAGES[0].id,
    checkIn: '',
    checkOut: '',
    travelers: 2,
    roomType: 'standard',
    name: '',
    email: '',
    phone: '',
    notes: '',
  })

  const selectedPackage = PACKAGES.find((p) => p.id === form.packageId) || PACKAGES[0]
  const selectedRoom = ROOM_TYPES.find((r) => r.id === form.roomType) || ROOM_TYPES[0]

  const pricing = useMemo(() => {
    const base = selectedPackage.price * Number(form.travelers || 1)
    const roomExtra = selectedRoom.extra * Number(form.travelers || 1)
    const subtotal = base + roomExtra
    const taxes = Math.round(subtotal * 0.05)
    const total = subtotal + taxes
    return { base, roomExtra, subtotal, taxes, total }
  }, [selectedPackage, selectedRoom, form.travelers])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
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
                <strong>{selectedPackage.name}</strong>. Our team will contact you at{' '}
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
                        <div className="mb-3">
                          <label className="bhk-label">Tour Package</label>
                          <select
                            name="packageId"
                            value={form.packageId}
                            onChange={handleChange}
                            className="form-select bhk-input-plain"
                          >
                            {PACKAGES.map((p) => (
                              <option value={p.id} key={p.id}>
                                {p.name} — {p.place}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="row g-3">
                          <div className="col-sm-6">
                            <label className="bhk-label">Check-in Date</label>
                            <input
                              type="date"
                              name="checkIn"
                              value={form.checkIn}
                              onChange={handleChange}
                              className="form-control bhk-input-plain"
                              required
                            />
                          </div>
                          <div className="col-sm-6">
                            <label className="bhk-label">Check-out Date</label>
                            <input
                              type="date"
                              name="checkOut"
                              value={form.checkOut}
                              onChange={handleChange}
                              className="form-control bhk-input-plain"
                              required
                            />
                          </div>
                          <div className="col-sm-6">
                            <label className="bhk-label">Number of Travelers</label>
                            <input
                              type="number"
                              min={1}
                              max={20}
                              name="travelers"
                              value={form.travelers}
                              onChange={handleChange}
                              className="form-control bhk-input-plain"
                              required
                            />
                          </div>
                          <div className="col-sm-6">
                            <label className="bhk-label">Room Type</label>
                            <select
                              name="roomType"
                              value={form.roomType}
                              onChange={handleChange}
                              className="form-select bhk-input-plain"
                            >
                              {ROOM_TYPES.map((r) => (
                                <option value={r.id} key={r.id}>
                                  {r.label} {r.extra > 0 ? `(+₹${r.extra}/person)` : ''}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Step 2 */}
                    {step === 1 && (
                      <>
                        <h5 className="bhk-form-title">Traveler Information</h5>
                        <div className="row g-3">
                          <div className="col-sm-6">
                            <label className="bhk-label">Full Name</label>
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
                          <div className="col-12">
                            <label className="bhk-label">Special Requests (optional)</label>
                            <textarea
                              name="notes"
                              value={form.notes}
                              onChange={handleChange}
                              rows={4}
                              placeholder="Dietary needs, accessibility, celebration occasions..."
                              className="form-control bhk-input-plain"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Step 3 */}
                    {step === 2 && (
                      <>
                        <h5 className="bhk-form-title">Review Your Booking</h5>
                        <ul className="bhk-review-list">
                          <li><span>Package</span><strong>{selectedPackage.name}</strong></li>
                          <li><span>Destination</span><strong>{selectedPackage.place}</strong></li>
                          <li><span>Check-in</span><strong>{form.checkIn || '—'}</strong></li>
                          <li><span>Check-out</span><strong>{form.checkOut || '—'}</strong></li>
                          <li><span>Travelers</span><strong>{form.travelers}</strong></li>
                          <li><span>Room Type</span><strong>{selectedRoom.label}</strong></li>
                          <li><span>Name</span><strong>{form.name || '—'}</strong></li>
                          <li><span>Email</span><strong>{form.email || '—'}</strong></li>
                          <li><span>Phone</span><strong>{form.phone || '—'}</strong></li>
                        </ul>
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
                        <button type="button" onClick={back} className="bhk-btn-outline">
                          Back
                        </button>
                      )}
                      {step < STEPS.length - 1 && (
                        <button type="button" onClick={next} className="bhk-btn-solid ms-auto">
                          Continue
                        </button>
                      )}
                      {step === STEPS.length - 1 && (
                        <button type="submit" className="bhk-btn-solid ms-auto">
                          Confirm Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Summary sidebar */}
                <div className="col-lg-4">
                  <div className="bhk-summary-card">
                    <img src={selectedPackage.img} alt={selectedPackage.name} className="bhk-summary-img" />
                    <div className="bhk-summary-body">
                      <h6>{selectedPackage.name}</h6>
                      <p className="bhk-summary-place">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f5581f" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {selectedPackage.place}
                      </p>

                      <div className="bhk-summary-row">
                        <span>Base price × {form.travelers || 1}</span>
                        <span>₹{pricing.base.toLocaleString('en-IN')}</span>
                      </div>
                      {pricing.roomExtra > 0 && (
                        <div className="bhk-summary-row">
                          <span>Room upgrade</span>
                          <span>₹{pricing.roomExtra.toLocaleString('en-IN')}</span>
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
