import React from 'react'
import Footer from '../componant/Footer'
import Header from '../componant/Header'

const FEATURES = [
  {
    title: 'विश्वासाई सेवा',
    desc: 'तुमच्या प्रवासाची काळजी आमची',
    bg: '#1f4d3d',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'परवडणारे दर',
    desc: 'उत्तम सेवा, सर्वोत्तम दर',
    bg: '#f5581f',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41 12 22l-9-9 8.59-8.59A2 2 0 0 1 13 4h6a2 2 0 0 1 2 2v6a2 2 0 0 1-.41 1.41z" />
        <circle cx="15.5" cy="7.5" r="1.2" fill="#fff" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'सुरक्षित बुकिंग',
    desc: '100% सुरक्षित आणि विश्वासाई',
    bg: '#1f4d3d',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z" />
      </svg>
    ),
  },
  {
    title: '24/7 ग्राहक सेवा',
    desc: 'आम्ही नेहमी तुमच्या सोबत',
    bg: '#f5581f',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  },
]

const DESTINATIONS = [
  {
    name: 'सिंहगड',
    place: 'पुणे, महाराष्ट्र',
    rating: '4.7',
    img: 'https://i.pinimg.com/736x/0e/b2/19/0eb219593e7827dd3f17a2a0437de8af.jpg',
  },
  {
    name: 'अंधारबन जंगल ट्रेक',
    place: 'पुण्यापासून 57 किमी दूर, महाराष्ट्र',
    rating: '4.8',
    img: 'https://i.pinimg.com/736x/c9/54/da/c954dac030ebf3136a679fcd4833e360.jpg',
  },
  {
    name: 'महाबळेश्वर',
    place: 'सातारा, महाराष्ट्र',
    rating: '4.6',
    img: 'https://i.pinimg.com/736x/1d/bc/30/1dbc30df56f9334526b7d82e222ea9aa.jpg',
  },
  {
    name: 'लोणावळा',
    place: 'पुणे, महाराष्ट्र',
    rating: '4.5',
    img: 'https://i.pinimg.com/736x/4d/c4/6f/4dc46fc494eb775d263aced9a5953b2f.jpg',
  },
]

const Home = () => {
  return (
    <>
      <Header />
      <main className="main" id="top">

        {/* ===================== Hero Section ===================== */}
        <section className="bhk-hero">
          <img
            className="bhk-hero-img"
            src="https://static.vecteezy.com/system/resources/thumbnails/032/944/882/small_2x/one-person-holding-cameragraphing-mountain-peak-free-photo.jpg"
            alt="Traveler overlooking mountains"
          />
          <div className="bhk-hero-overlay" />

          <div className="container position-relative mt-6">
            <div className="row">
              <div className="col-lg-7 mt-5">
                <h1 className="bhk-hero-title">
                  प्रवासाची नवी दिशा!
                  <svg className="bhk-hero-arrow" width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#1e1e1e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2 11 13" />
                    <path d="M22 2 15 22l-4-9-9-4z" />
                  </svg>
                </h1>
                <p className="bhk-hero-sub">स्वप्नातील सहल, एका क्लिकवर!</p>
                <p className="bhk-hero-desc">
                  टूर पॅकेजेस, हॉटेल्स आणि तिकीट बुकिंग आता सोपे आणि जलद.
                </p>
              </div>
            </div>

            {/* Search card */}
            <div className="bhk-search-card">
              <div className="row g-3 align-items-end">
                <div className="col-md-3">
                  <label className="bhk-search-label">कोठे जायचे आहे?</label>
                  <div className="bhk-input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1f4d3d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <input type="text" className="form-control bhk-input" placeholder="ठिकाण शोधा" />
                  </div>
                </div>
                <div className="col-md-3">
                  <label className="bhk-search-label">चेक इन</label>
                  <div className="bhk-input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1f4d3d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    <input type="text" className="form-control bhk-input" placeholder="दिनांक निवडा" />
                  </div>
                </div>
                <div className="col-md-3">
                  <label className="bhk-search-label">चेक आउट</label>
                  <div className="bhk-input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1f4d3d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    <input type="text" className="form-control bhk-input" placeholder="दिनांक निवडा" />
                  </div>
                </div>
                <div className="col-md-2">
                  <label className="bhk-search-label">प्रवासी</label>
                  <div className="bhk-input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1f4d3d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <select className="form-select bhk-input">
                      <option>2 प्रवासी</option>
                      <option>1 प्रवासी</option>
                      <option>3 प्रवासी</option>
                      <option>4+ प्रवासी</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-1">
                  <button className="btn bhk-search-btn w-100">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                    <span className="ms-2 d-none d-md-inline">शोधा</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== Feature Strip ===================== */}
        <section className="bhk-features">
          <div className="container">
            <div className="row g-4 text-center text-md-start mt-2">
              {FEATURES.map((f) => (
                <div className="col-6 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start" key={f.title}>
                  <div className="bhk-feature-icon" style={{ background: f.bg }}>
                    {f.icon}
                  </div>
                  <div className="ms-3 text-start">
                    <div className="bhk-feature-title">{f.title}</div>
                    <div className="bhk-feature-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== Popular Destinations ===================== */}
        <section className="bhk-destinations">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="bhk-section-title">लोकप्रिय पर्यटन स्थळे</h2>
              <div className="bhk-title-divider">
                <span className="line orange" />
                <span className="dot" />
                <span className="line green" />
              </div>
            </div>

            <div className="row g-4">
              {DESTINATIONS.map((d) => (
                <div className="col-6 col-md-3" key={d.name}>
                  <div className="bhk-dest-card">
                    <img src={d.img} alt={d.name} />
                    <div className="bhk-dest-overlay" />
                    <span className="bhk-dest-rating">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#f5a623" stroke="none">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01z" />
                      </svg>
                      {d.rating}
                    </span>
                    <div className="bhk-dest-info">
                      <div className="bhk-dest-name">{d.name}</div>
                      <div className="bhk-dest-place">{d.place}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        /* ---------- Hero ---------- */
        .bhk-hero {
          position: relative;
          min-height: 670px;
          display: flex;
          align-items: center;
          padding-top: 7rem;
          padding-bottom: 6rem;
          overflow: hidden;
        }
        .bhk-hero-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }
        .bhk-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.85) 32%, rgba(255,255,255,0.15) 58%, rgba(255,255,255,0) 75%);
          z-index: 0;
        }
        .bhk-hero .container { z-index: 1; }
        .bhk-hero-title {
          font-weight: 700;
          font-size: 3rem;
          color: #1f4d3d;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .bhk-hero-arrow { flex-shrink: 0; margin-top: 0.4rem; }
        .bhk-hero-sub {
          font-size: 1.4rem;
          font-weight: 700;
          color: #1e1e1e;
          margin-bottom: 0.5rem;
        }
        .bhk-hero-desc {
          font-size: 1.05rem;
          color: #444;
          max-width: 520px;
          margin-bottom: 2.5rem;
        }

        /* ---------- Search card ---------- */
        .bhk-search-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 20px 45px rgba(0,0,0,0.12);
          padding: 1.75rem;
          max-width: 1050px;
        }
        .bhk-search-label {
          display: block;
          font-size: 0.8rem;
          color: #6b7280;
          margin-bottom: 0.4rem;
        }
        .bhk-input-icon {
          position: relative;
          display: flex;
          align-items: center;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 0 0.7rem;
        }
        .bhk-input-icon svg { flex-shrink: 0; }
        .bhk-input {
          border: none !important;
          box-shadow: none !important;
          padding: 0.6rem 0.5rem !important;
        }
        .bhk-input:focus { outline: none; box-shadow: none; }
        .bhk-search-btn {
          background: #1f4d3d;
          color: #fff;
          border-radius: 8px;
          padding: 0.65rem 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          font-weight: 600;
        }
        .bhk-search-btn:hover { background: #173a2e; color: #fff; }

        /* ---------- Features ---------- */
        .bhk-features {
          background: #fafafa;
          padding: 3rem 0;
        }
        .bhk-feature-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .bhk-feature-title {
          font-weight: 700;
          font-size: 1rem;
          color: #1e1e1e;
        }
        .bhk-feature-desc {
          font-size: 0.85rem;
          color: #6b7280;
        }

        /* ---------- Destinations ---------- */
        .bhk-destinations { padding: 4.5rem 0; }
        .bhk-section-title {
          font-weight: 700;
          font-size: 2rem;
          color: #1e1e1e;
          margin-bottom: 1rem;
        }
        .bhk-title-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .bhk-title-divider .line { height: 3px; width: 40px; border-radius: 2px; }
        .bhk-title-divider .line.orange { background: #f5581f; }
        .bhk-title-divider .line.green { background: #1f4d3d; }
        .bhk-title-divider .dot {
          width: 6px; height: 6px; border-radius: 50%; background: #1f4d3d;
        }

        .bhk-dest-card {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          aspect-ratio: 3 / 4;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
        }
        .bhk-dest-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.35s ease;
        }
        .bhk-dest-card:hover img { transform: scale(1.06); }
        .bhk-dest-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0) 65%);
        }
        .bhk-dest-rating {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(255,255,255,0.95);
          color: #1e1e1e;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 3px 9px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .bhk-dest-info {
          position: absolute;
          left: 14px;
          bottom: 12px;
          color: #fff;
        }
        .bhk-dest-name {
          font-weight: 700;
          font-size: 1.15rem;
        }
        .bhk-dest-place {
          font-size: 0.8rem;
          opacity: 0.9;
        }

        @media (max-width: 992px) {
          .bhk-hero-title { font-size: 2.2rem; }
          .bhk-hero-overlay { background: linear-gradient(180deg, rgba(255,255,255,0.97) 45%, rgba(255,255,255,0.55) 100%); }
        }
      `}</style>
    </>
  )
}

export default Home
