import React from 'react'
import { Link } from 'react-router-dom'

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Tour packages', to: '/tour-packages' },
  { label: 'Destination', to: '/destination' },
  { label: 'About Us', to: '/about' },
  { label: 'contact', to: '/contact' },
  { label: 'Booking', to: '/booking' },
]

const POPULAR_PLACES = [
  { label: 'सिंहगड, पुणे', to: '/destination/sinhagad' },
  { label: 'गोवा', to: '/destination/goa' },
  { label: 'महाबळेश्वर, सातारा', to: '/destination/mahabaleshwar' },
  { label: 'लोणावळा, पुणे', to: '/destination/lonavala' },
]

const SOCIALS = [
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.5 22v-8.5h2.85l.43-3.31H13.5V8.05c0-.96.27-1.61 1.64-1.61h1.75V3.48A23.6 23.6 0 0 0 14.5 3.3c-2.44 0-4.11 1.49-4.11 4.22v2.67H7.53v3.31h2.86V22z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 5.9c-.7.3-1.5.6-2.3.7a4 4 0 0 0 1.8-2.2 8 8 0 0 1-2.5 1 4 4 0 0 0-6.9 3.6A11.4 11.4 0 0 1 3.9 4.6a4 4 0 0 0 1.2 5.3c-.6 0-1.2-.2-1.8-.5v.1a4 4 0 0 0 3.2 3.9c-.6.2-1.2.2-1.8.1a4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18.6 11.3 11.3 0 0 0 8.1 20.4c7.3 0 11.3-6 11.3-11.3v-.5c.8-.6 1.4-1.3 2-2.1z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
        <path d="M10.5 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

const Footer = () => {
  return (
    <footer className="bhk-footer">
      <div className="bhk-footer-top">
        <div className="container">
          <div className="row g-4">

            {/* Brand column */}
            <div className="col-lg-4 col-md-6">
              <div className="bhk-footer-brand">भटकंती</div>
              <p className="bhk-footer-tagline">प्रवास तुमचा, साथी आमची!</p>
              <p className="bhk-footer-about">
                तुमच्या स्वप्नातील सहलीसाठी टूर पॅकेजेस, हॉटेल्स आणि तिकीट बुकिंग
                आता एका क्लिकवर — सोपे, विश्वासाई आणि परवडणारे.
              </p>
              <div className="bhk-footer-socials">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label} className="bhk-social-btn">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="col-lg-2 col-md-6">
              <h6 className="bhk-footer-heading">Quick Links</h6>
              <ul className="bhk-footer-list">
                {QUICK_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular destinations */}
            <div className="col-lg-3 col-md-6">
              <h6 className="bhk-footer-heading">Popular places</h6>
              <ul className="bhk-footer-list">
                {POPULAR_PLACES.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact + newsletter */}
            <div className="col-lg-3 col-md-6">
              <h6 className="bhk-footer-heading">Contact us</h6>
              <ul className="bhk-footer-contact">
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>पुणे, महाराष्ट्र, भारत</span>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.4 1.9.6 2.9.7a2 2 0 0 1 1.6 2z" />
                  </svg>
                  <span>+91 98765 43210</span>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 6 10-6" />
                  </svg>
                  <span>info@bhatkanti.com</span>
                </li>
              </ul>

              <form className="bhk-newsletter" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="तुमचा ई-मेल टाका" className="form-control" />
                <button type="submit" aria-label="Subscribe">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2 11 13" />
                    <path d="M22 2 15 22l-4-9-9-4z" />
                  </svg>
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>

      <div className="bhk-footer-bottom">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
          <p className="mb-0">© {new Date().getFullYear()} भटकंती. सर्व हक्क राखीव.</p>
          <div className="bhk-footer-legal">
            <Link to="/privacy">गोपनीयता धोरण</Link>
            <span>•</span>
            <Link to="/terms">नियम व अटी</Link>
          </div>
        </div>
      </div>

      <style>{`
        .bhk-footer {
          background: #123527;
          color: rgba(255,255,255,0.75);
        }
        .bhk-footer-top {
          padding: 4rem 0 2.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .bhk-footer-brand {
          font-family: 'Noto Sans Devanagari', serif;
          font-weight: 700;
          font-size: 2.1rem;
          color: #fff;
          line-height: 1;
        }
        .bhk-footer-tagline {
          color: #f5a623;
          font-size: 0.85rem;
          margin: 0.4rem 0 1rem;
        }
        .bhk-footer-about {
          font-size: 0.9rem;
          line-height: 1.7;
          max-width: 320px;
          color: rgba(255,255,255,0.65);
          margin-bottom: 1.5rem;
        }
        .bhk-footer-socials {
          display: flex;
          gap: 0.6rem;
        }
        .bhk-social-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .bhk-social-btn:hover {
          background: #f5581f;
          color: #fff;
          transform: translateY(-3px);
        }

        .bhk-footer-heading {
          color: #fff;
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 1.25rem;
          position: relative;
          padding-bottom: 0.6rem;
        }
        .bhk-footer-heading::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 28px;
          height: 3px;
          border-radius: 2px;
          background: #f5581f;
        }

        .bhk-footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .bhk-footer-list li { margin-bottom: 0.75rem; }
        .bhk-footer-list a {
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          font-size: 0.92rem;
          transition: color 0.2s ease, padding-left 0.2s ease;
        }
        .bhk-footer-list a:hover {
          color: #fff;
          padding-left: 4px;
        }

        .bhk-footer-contact {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem;
        }
        .bhk-footer-contact li {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          margin-bottom: 0.9rem;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.75);
        }
        .bhk-footer-contact svg {
          color: #f5a623;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .bhk-newsletter {
          display: flex;
          background: rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 4px;
        }
        .bhk-newsletter input {
          background: transparent;
          border: none;
          color: #fff;
          font-size: 0.85rem;
          padding: 0.5rem 0.75rem;
        }
        .bhk-newsletter input::placeholder { color: rgba(255,255,255,0.5); }
        .bhk-newsletter input:focus {
          outline: none;
          box-shadow: none;
          background: transparent;
          color: #fff;
        }
        .bhk-newsletter button {
          background: #f5581f;
          border: none;
          border-radius: 6px;
          width: 38px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
        }
        .bhk-newsletter button:hover { background: #d8481a; }

        .bhk-footer-bottom {
          padding: 1.25rem 0;
          font-size: 0.85rem;
        }
        .bhk-footer-bottom p { color: rgba(255,255,255,0.6); }
        .bhk-footer-legal {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .bhk-footer-legal a {
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-size: 0.85rem;
        }
        .bhk-footer-legal a:hover { color: #fff; }
        .bhk-footer-legal span { color: rgba(255,255,255,0.35); }

        @media (max-width: 767px) {
          .bhk-footer-top { padding: 3rem 0 2rem; text-align: left; }
        }
      `}</style>
    </footer>
  )
}

export default Footer
