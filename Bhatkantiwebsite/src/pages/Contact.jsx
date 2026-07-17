import React, { useState } from 'react'
import Header from '../componant/Header'
import Footer from '../componant/Footer'

const CONTACT_INFO = [
  {
    label: 'Our Address',
    value: 'Pune, Maharashtra, India',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: 'Call Us',
    value: '+91 98765 43210',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.4 1.9.6 2.9.7a2 2 0 0 1 1.6 2z" />
      </svg>
    ),
  },
  {
    label: 'Email Us',
    value: 'info@bhatkanti.com',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 6 10-6" />
      </svg>
    ),
  },
]

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <Header />
      <main className="main" id="top">

        {/* ===================== Page Banner ===================== */}
        <section className="bhk-contact-banner mt-8">
          <img
            className="bhk-banner-img"
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80"
            alt="Contact us"
          />
          <div className="bhk-banner-overlay" />
          <div className="container position-relative text-center">
            <h1>Contact Us</h1>
            <p className="mb-0">
              <span>Home</span> <span className="sep">/</span> <span className="active">Contact Us</span>
            </p>
          </div>
        </section>

        {/* ===================== Contact info cards ===================== */}
        <section className="bhk-contact-info">
          <div className="container">
            <div className="row g-4">
              {CONTACT_INFO.map((c) => (
                <div className="col-md-4" key={c.label}>
                  <div className="bhk-info-card">
                    <div className="bhk-info-icon">{c.icon}</div>
                    <div>
                      <div className="bhk-info-label">{c.label}</div>
                      <div className="bhk-info-value">{c.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== Form + Map ===================== */}
        <section className="bhk-contact-main">
          <div className="container">
            <div className="row g-4 align-items-stretch">

              <div className="col-lg-6">
                <div className="bhk-contact-card">
                  <h5 className="bhk-eyebrow">Get In Touch</h5>
                  <h2 className="bhk-heading">Send Us a Message</h2>

                  {sent ? (
                    <div className="bhk-sent-msg">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1f4d3d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <p>Thanks, {form.name || 'traveler'}! We've received your message and will get back to you shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="row g-3">
                        <div className="col-sm-6">
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="form-control bhk-input"
                            required
                          />
                        </div>
                        <div className="col-sm-6">
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="form-control bhk-input"
                          />
                        </div>
                        <div className="col-12">
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className="form-control bhk-input"
                            required
                          />
                        </div>
                        <div className="col-12">
                          <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Your Message"
                            className="form-control bhk-input"
                            required
                          />
                        </div>
                        <div className="col-12">
                          <button type="submit" className="bhk-submit-btn">Send Message</button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="bhk-map-wrap">
                  <iframe
                    title="Bhatkanti Location"
                    src="https://www.google.com/maps?q=Pune,Maharashtra&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        .bhk-eyebrow {
          color: #f5581f;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 0.4rem;
        }
        .bhk-heading {
          font-weight: 700;
          font-size: 1.7rem;
          color: #1e1e1e;
          margin-bottom: 1.25rem;
        }

        /* Banner */
        .bhk-contact-banner {
          position: relative;
          overflow: hidden;
          padding: 7rem 0 3.5rem;
          min-height: 260px;
          display: flex;
          align-items: center;
        }
        .bhk-banner-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
        .bhk-banner-overlay {
          position: absolute; inset: 0;
        
          z-index: 0;
        }
        .bhk-contact-banner .container { z-index: 1; }
        .bhk-contact-banner h1 { color: #fff; font-weight: 700; font-size: 2.4rem; margin-bottom: 0.6rem; }
        .bhk-contact-banner p { color: rgba(255,255,255,0.7); font-size: 0.95rem; }
        .bhk-contact-banner .active { color: #f5a623; font-weight: 600; }
        .bhk-contact-banner .sep { margin: 0 6px; }

        /* Info cards */
        .bhk-contact-info { padding: 3rem 0 1rem; }
        .bhk-info-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #fff;
          border-radius: 14px;
          padding: 1.5rem;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          height: 100%;
        }
        .bhk-info-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #1f4d3d;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bhk-info-label { font-size: 0.8rem; color: #9ca3af; }
        .bhk-info-value { font-weight: 700; color: #1e1e1e; font-size: 0.95rem; }

        /* Form + Map */
        .bhk-contact-main { padding: 3rem 0 5rem; }
        .bhk-contact-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          padding: 2rem;
          height: 100%;
        }
        .bhk-input {
          border: 1px solid #e5e7eb !important;
          border-radius: 8px !important;
          padding: 0.7rem 0.9rem !important;
          font-size: 0.92rem;
        }
        .bhk-input:focus {
          border-color: #1f4d3d !important;
          box-shadow: 0 0 0 3px rgba(31,77,61,0.1) !important;
        }
        .bhk-submit-btn {
          background: #1f4d3d;
          color: #fff;
          border: none;
          font-weight: 600;
          padding: 0.8rem 2rem;
          border-radius: 8px;
          transition: background 0.2s ease;
        }
        .bhk-submit-btn:hover { background: #173a2e; }

        .bhk-sent-msg {
          background: #f0f7f4;
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
        }
        .bhk-sent-msg svg {
          background: #1f4d3d;
          border-radius: 50%;
          padding: 10px;
          box-sizing: content-box;
          margin-bottom: 1rem;
        }
        .bhk-sent-msg p { color: #1e1e1e; margin: 0; line-height: 1.6; }

        .bhk-map-wrap {
          border-radius: 16px;
          overflow: hidden;
          min-height: 320px;
          height: 100%;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }

        @media (max-width: 767px) {
          .bhk-contact-banner { padding: 6rem 0 2.5rem; }
          .bhk-contact-card { padding: 1.5rem; }
          .bhk-map-wrap { min-height: 260px; }
        }
      `}</style>
    </>
  )
}

export default Contact
