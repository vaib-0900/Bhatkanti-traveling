import React from 'react'
import Header from '../componant/Header'
import Footer from '../componant/Footer'

const STATS = [
  { value: '12+', label: 'वर्षांचा अनुभव' },
  { value: '25,000+', label: 'समाधानी प्रवासी' },
  { value: '180+', label: 'पर्यटन स्थळे' },
  { value: '500+', label: 'टूर पॅकेजेस' },
]

const VALUES = [
  {
    title: 'विश्वासाई सेवा',
    desc: 'प्रत्येक सहलीमागे आमची पारदर्शक आणि प्रामाणिक सेवा असते.',
    bg: '#1f4d3d',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'वैयक्तिक नियोजन',
    desc: 'तुमच्या आवडीनुसार सानुकूल तयार केलेली प्रवास योजना.',
    bg: '#f5581f',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M9 13h6M9 17h6" />
      </svg>
    ),
  },
  {
    title: 'स्थानिक तज्ज्ञता',
    desc: 'महाराष्ट्रातील प्रत्येक कोपऱ्याची सखोल माहिती असलेली टीम.',
    bg: '#1f4d3d',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: '24/7 सहाय्य',
    desc: 'सहलीदरम्यान कधीही मदत हवी असल्यास आम्ही सोबत आहोत.',
    bg: '#f5581f',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  },
]

const TEAM = [
  {
    name: 'रोहन देशमुख',
    role: 'संस्थापक व CEO',
    img: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'स्नेहा पाटील',
    role: 'ऑपरेशन्स प्रमुख',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'अमित जोशी',
    role: 'प्रवास सल्लागार',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'प्रिया कुलकर्णी',
    role: 'ग्राहक सेवा प्रमुख',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  },
]

const About = () => {
  return (
    <>
      <Header />
      <main className="main" id="top">

        {/* ===================== Page Banner ===================== */}
        <section className="bhk-about-banner mt-6">
          <img
            className="bhk-banner-img"
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80"
            alt="Mountain valley landscape"
          />
          <div className="bhk-banner-overlay" />
          <div className="container position-relative text-center mt-7">
            <h1>About us</h1>
            <p className="mb-0">
              <span>Home</span> <span className="sep">/</span> <span className="active">About us</span>
            </p>
          </div>
        </section>

        {/* ===================== Our Story ===================== */}
        <section className="bhk-story py-6">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <div className="bhk-story-img-wrap">
                  <img
                    src="https://i.pinimg.com/1200x/22/37/42/22374267fcaf2b5f01b76281301107ef.jpg"
                    alt="टीम भटकंती"
                    className="bhk-story-img-main"
                  />
                  <img
                    src="https://i.pinimg.com/1200x/de/2d/bf/de2dbf5cab2167d1443f6c596bdf3022.jpg"
                    alt="ट्रेकिंग टीम"
                    className="bhk-story-img-badge"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <h5 className="bhk-eyebrow">आमची कहाणी</h5>
                <h2 className="bhk-heading">
                  प्रवासाची आवड, <span>विश्वासाची वाट</span>
                </h2>
                <p className="bhk-story-text">
                  भटकंतीची सुरुवात एका साध्या विचारातून झाली — प्रत्येक प्रवाशाला
                  त्रासमुक्त आणि संस्मरणीय सहल मिळावी.  2026 पासून आम्ही महाराष्ट्रातील
                  आणि भारतभरातील हजारो प्रवाशांना त्यांच्या स्वप्नातील ठिकाणी
                  पोहोचवण्यात मदत केली आहे.
                </p>
                <p className="bhk-story-text">
                  गड-किल्ल्यांच्या ट्रेकपासून ते समुद्रकिनाऱ्यावरील विश्रांतीपर्यंत,
                  आमची टीम प्रत्येक सहल काळजीपूर्वक आखते — जेणेकरून तुम्ही फक्त
                  प्रवासाचा आनंद घ्यावा, बाकी सर्व चिंता आमच्यावर सोडा.
                </p>
                <div className="row bhk-story-points g-3">
                  <div className="col-sm-6">
                    <div className="bhk-point">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1f4d3d" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg>
                      स्थानिक तज्ज्ञ मार्गदर्शक
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="bhk-point">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1f4d3d" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg>
                      सानुकूल प्रवास योजना
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="bhk-point">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1f4d3d" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg>
                      पारदर्शक किंमत
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="bhk-point">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1f4d3d" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg>
                      24/7 प्रवास सहाय्य
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== Stats ===================== */}
        <section className="bhk-stats">
          <div className="container">
            <div className="row g-4 text-center">
              {STATS.map((s) => (
                <div className="col-6 col-md-3" key={s.label}>
                  <div className="bhk-stat-value">{s.value}</div>
                  <div className="bhk-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== Mission & Vision ===================== */}
        <section className="py-6">
          <div className="container">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="bhk-mv-card">
                  <div className="bhk-mv-icon" style={{ background: '#1f4d3d' }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <h4>आमचे ध्येय</h4>
                  <p>
                    प्रत्येक प्रवाशाला परवडणाऱ्या दरात, सुरक्षित आणि आनंददायी प्रवास
                    अनुभव देणे — जेणेकरून प्रवास ही चिंता न राहता एक आठवण बनेल.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="bhk-mv-card">
                  <div className="bhk-mv-icon" style={{ background: '#f5581f' }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <h4>आमची दृष्टी</h4>
                  <p>
                    महाराष्ट्र आणि भारतातील सर्वात विश्वासाई प्रवास साथी बनणे,
                    जिथे प्रत्येक प्रवासी निश्चिंतपणे आपली सहल आमच्यावर सोपवू शकेल.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== Why Choose Us ===================== */}
        <section className="bhk-values">
          <div className="container">
            <div className="text-center mb-5">
              <h5 className="bhk-eyebrow justify-content-center">आमची वैशिष्ट्ये</h5>
              <h2 className="bhk-heading">आम्हालाच का निवडावे?</h2>
            </div>
            <div className="row g-4">
              {VALUES.map((v) => (
                <div className="col-6 col-md-3" key={v.title}>
                  <div className="bhk-value-card">
                    <div className="bhk-value-icon" style={{ background: v.bg }}>
                      {v.icon}
                    </div>
                    <h6>{v.title}</h6>
                    <p>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== Team ===================== */}
        <section className="py-6">
          <div className="container">
            <div className="text-center mb-5">
              <h5 className="bhk-eyebrow justify-content-center">आमची टीम</h5>
              <h2 className="bhk-heading">तुमच्या सहलीमागील चेहरे</h2>
            </div>
            <div className="row g-4">
              {TEAM.map((t) => (
                <div className="col-6 col-md-3" key={t.name}>
                  <div className="bhk-team-card">
                    <div className="bhk-team-img">
                      <img src={t.img} alt={t.name} />
                    </div>
                    <h6>{t.name}</h6>
                    <p>{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== CTA ===================== */}
        <section className="bhk-about-cta">
          <div className="container text-center position-relative">
            <h2>तुमची पुढची सहल आमच्यासोबत ठरवूया!</h2>
            <p>आजच आमच्याशी संपर्क साधा आणि तुमच्या स्वप्नातील प्रवासाला सुरुवात करा.</p>
            <a href="/booking" className="bhk-cta-btn">सहल बुक करा</a>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        .py-6 { padding-top: 4.5rem; padding-bottom: 4.5rem; }
        .bhk-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #f5581f;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }
        .bhk-heading {
          font-weight: 700;
          font-size: 2.1rem;
          color: #1e1e1e;
          margin-bottom: 1.25rem;
        }
        .bhk-heading span { color: #1f4d3d; }

        /* Banner */
        .bhk-about-banner {
          position: relative;
          overflow: hidden;
          padding: 6.5rem 0 3.5rem;
          margin-top: 0;
          min-height: 320px;
          display: flex;
          align-items: center;
        }
        .bhk-banner-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }
        .bhk-banner-overlay {
          position: absolute;
          inset: 0;
         
          z-index: 0;
        }
        .bhk-about-banner .container { z-index: 1; }
        .bhk-about-banner h1 {
          color: #fff;
          font-weight: 700;
          font-size: 2.6rem;
          margin-bottom: 0.6rem;
        }
        .bhk-about-banner p { color: rgba(255,255,255,0.7); font-size: 0.95rem; }
        .bhk-about-banner .active { color: #f5a623; font-weight: 600; }
        .bhk-about-banner .sep { margin: 0 6px; }

        /* Story */
        .bhk-story-img-wrap {
          position: relative;
        }
        .bhk-story-img-main {
          width: 100%;
          border-radius: 20px;
          object-fit: cover;
          height: 420px;
          box-shadow: 0 20px 45px rgba(0,0,0,0.12);
        }
        .bhk-story-img-badge {
          position: absolute;
          bottom: -30px;
          right: -20px;
          width: 160px;
          height: 160px;
          object-fit: cover;
          border-radius: 16px;
          border: 6px solid #fff;
          box-shadow: 0 15px 30px rgba(0,0,0,0.15);
        }
        .bhk-story-text {
          color: #5e6282;
          font-size: 0.98rem;
          line-height: 1.75;
          margin-bottom: 1.1rem;
        }
        .bhk-story-points { margin-top: 1.5rem; }
        .bhk-point {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.92rem;
          font-weight: 600;
          color: #1e1e1e;
        }

        /* Stats */
        .bhk-stats {
          background: #1f4d3d;
          padding: 3rem 0;
        }
        .bhk-stat-value {
          font-size: 2.4rem;
          font-weight: 700;
          color: #fff;
        }
        .bhk-stat-label {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.7);
          margin-top: 0.25rem;
        }

        /* Mission / Vision */
        .bhk-mv-card {
          background: #fafafa;
          border-radius: 16px;
          padding: 2.25rem;
          height: 100%;
        }
        .bhk-mv-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .bhk-mv-card h4 {
          font-weight: 700;
          color: #1e1e1e;
          margin-bottom: 0.75rem;
        }
        .bhk-mv-card p {
          color: #5e6282;
          font-size: 0.95rem;
          line-height: 1.7;
          margin: 0;
        }

        /* Values */
        .bhk-values { background: #fafafa; padding: 4.5rem 0; }
        .bhk-value-card {
          background: #fff;
          border-radius: 14px;
          padding: 1.75rem 1.25rem;
          text-align: center;
          height: 100%;
          box-shadow: 0 8px 20px rgba(0,0,0,0.05);
          transition: transform 0.25s ease;
        }
        .bhk-value-card:hover { transform: translateY(-6px); }
        .bhk-value-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }
        .bhk-value-card h6 { font-weight: 700; color: #1e1e1e; margin-bottom: 0.5rem; }
        .bhk-value-card p { font-size: 0.85rem; color: #6b7280; margin: 0; }

        /* Team */
        .bhk-team-card { text-align: center; }
        .bhk-team-img {
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 1rem;
        }
        .bhk-team-img img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.3s ease;
        }
        .bhk-team-card:hover .bhk-team-img img { transform: scale(1.06); }
        .bhk-team-card h6 { font-weight: 700; color: #1e1e1e; margin-bottom: 0.2rem; }
        .bhk-team-card p { font-size: 0.85rem; color: #f5581f; margin: 0; }

        /* CTA */
        .bhk-about-cta {
          background: linear-gradient(135deg, #1f4d3d 0%, #123527 100%);
          padding: 4.5rem 0;
        }
        .bhk-about-cta h2 { color: #fff; font-weight: 700; font-size: 2rem; margin-bottom: 0.75rem; }
        .bhk-about-cta p { color: rgba(255,255,255,0.75); margin-bottom: 1.75rem; }
        .bhk-cta-btn {
          display: inline-block;
          background: #f5581f;
          color: #fff;
          font-weight: 600;
          padding: 0.85rem 2.25rem;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .bhk-cta-btn:hover { background: #d8481a; color: #fff; transform: translateY(-2px); }

        @media (max-width: 767px) {
          .bhk-story-img-badge { display: none; }
          .bhk-about-banner { padding: 5.5rem 0 2.5rem; }
        }
      `}</style>
    </>
  )
}

export default About
