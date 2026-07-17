import React, { useState } from 'react'
import Header from '../componant/Header'
import Footer from '../componant/Footer'

const SECTIONS = [
  { key: 'forts', label: 'Forts' },
  { key: 'hills', label: 'Hill Stations' },
  { key: 'waterfalls', label: 'Waterfalls' },
  { key: 'india', label: "India's Best" },
]

const FORTS = [
  {
    name: 'Sinhagad Fort',
    place: 'Pune, Maharashtra',
    rating: '4.7',
    desc: 'A historic hilltop fort famed for its role in Maratha history and popular sunrise treks.',
    img: 'https://i.pinimg.com/736x/0e/b2/19/0eb219593e7827dd3f17a2a0437de8af.jpg',
  },
  {
    name: 'Raigad Fort',
    place: 'Raigad, Maharashtra',
    rating: '4.8',
    desc: 'The former capital of the Maratha Empire, reachable by a scenic ropeway ride.',
    img: 'https://i.pinimg.com/1200x/e8/e4/bb/e8e4bb21b904c6bfd942e71f52d49741.jpg',
  },
  {
    name: 'Rajgad Fort',
    place: 'Pune, Maharashtra',
    rating: '4.6',
    desc: 'A rugged trekker\u2019s favorite with sweeping views of the Sahyadri ranges.',
    img: 'https://i.pinimg.com/736x/6b/b2/a1/6bb2a1fbbee0708f328ad694a6a00056.jpg',
  },
  {
    name: 'Pratapgad Fort',
    place: 'Satara, Maharashtra',
    rating: '4.6',
    desc: 'Perched near Mahabaleshwar, known for dense forests and a dramatic monsoon look.',
    img: 'https://i.pinimg.com/736x/aa/3c/29/aa3c298f8e6abf998ab95485a25267a0.jpg',
  },
]

const HILLS = [
  {
    name: 'Mahabaleshwar',
    place: 'Satara, Maharashtra',
    rating: '4.6',
    desc: 'Strawberry farms, viewpoints, and cool weather make this a classic hill retreat.',
    img: 'https://i.pinimg.com/736x/1d/bc/30/1dbc30df56f9334526b7d82e222ea9aa.jpg',
  },
  {
    name: 'Lonavala',
    place: 'Pune, Maharashtra',
    rating: '4.5',
    desc: 'Misty valleys and chikki shops, best visited during the monsoon season.',
    img: 'https://i.pinimg.com/736x/4d/c4/6f/4dc46fc494eb775d263aced9a5953b2f.jpg',
  },
  {
    name: 'Panchgani',
    place: 'Satara, Maharashtra',
    rating: '4.5',
    desc: 'Table Land plateau and orchard views set this hill station apart.',
    img: 'https://i.pinimg.com/736x/be/88/1e/be881e539afe6635fee9a134d54c7842.jpg',
  },
  {
    name: 'Matheran',
    place: 'Raigad, Maharashtra',
    rating: '4.4',
    desc: 'Asia\u2019s only auto-free hill station, explored on foot or by toy train.',
    img: 'https://i.pinimg.com/736x/a2/12/ff/a212ff08ddaa385a981d3dea4f1f7f95.jpg',
  },
]

const WATERFALLS = [
  {
    name: 'Randha Falls',
    place: 'Ahmednagar, Maharashtra',
    rating: '4.5',
    desc: 'A dramatic 170-foot drop on the Pravara river, at its best right after the monsoon.',
    img: 'https://i.pinimg.com/736x/e4/72/bb/e472bbc43167ad9a69985a7fffb96b49.jpg',
  },
  {
    name: 'Vajrai Waterfall',
    place: 'Satara, Maharashtra',
    rating: '4.7',
    desc: 'One of India\u2019s tallest waterfalls, cascading in a three-tier drop near Kas plateau.',
    img: 'https://i.pinimg.com/736x/56/a4/be/56a4be1a94091388d24fea019968fc8c.jpg',
  },
  {
    name: 'Kune Falls',
    place: 'Lonavala, Maharashtra',
    rating: '4.4',
    desc: 'One of the highest waterfalls in the country, easily visible from the highway.',
    img: 'https://i.pinimg.com/1200x/d3/9e/67/d39e678031dc0e7e570e04cc346c1cb0.jpg',
  },
  {
    name: 'Devkund Waterfall',
    place: 'Raigad, Maharashtra',
    rating: '4.6',
    desc: 'A turquoise plunge pool reached after a scenic riverside trek near Bhira.',
    img: 'https://i.pinimg.com/1200x/53/29/7b/53297b5a4818f7403886f82267288fc3.jpg',
  },
]

const INDIA_BEST = [
  {
    name: 'Goa',
    place: 'Goa',
    rating: '4.8',
    desc: 'Golden beaches, Portuguese heritage, and a legendary nightlife scene.',
    img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Kerala Backwaters',
    place: 'Alleppey, Kerala',
    rating: '4.9',
    desc: 'Drift through palm-lined canals aboard a traditional houseboat.',
    img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Kashmir Valley',
    place: 'Srinagar, Kashmir',
    rating: '4.8',
    desc: 'Snow-capped peaks, Dal Lake shikaras, and the "Paradise on Earth".',
    img: 'https://i.pinimg.com/1200x/61/03/8b/61038b9d0d4199a7e43f9a159883a555.jpg',
  },
  {
    name: 'Jaipur',
    place: 'Rajasthan',
    rating: '4.7',
    desc: 'The Pink City\u2019s forts, palaces, and bustling bazaars.',
    img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Ladakh',
    place: 'Leh, Ladakh',
    rating: '4.9',
    desc: 'High-altitude lakes, monasteries, and epic mountain roads.',
    img: 'https://i.pinimg.com/736x/43/6c/db/436cdbe4f28921357895615ceb44e540.jpg',
  },
  {
    name: 'Andaman Islands',
    place: 'Andaman & Nicobar',
    rating: '4.8',
    desc: 'Turquoise waters, coral reefs, and some of India\u2019s finest beaches.',
    img: 'https://i.pinimg.com/1200x/c9/51/8c/c9518c6754c82f797ece4a8cca5421d8.jpg',
  },
]

const DATA = { forts: FORTS, hills: HILLS, waterfalls: WATERFALLS, india: INDIA_BEST }

function DestinationCard({ d }) {
  return (
    <div className="bhk-d-card">
      <div className="bhk-d-img-wrap">
        <img src={d.img} alt={d.name} />
        <span className="bhk-d-rating">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#f5a623" stroke="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01z" />
          </svg>
          {d.rating}
        </span>
      </div>
      <div className="bhk-d-body">
        <div className="bhk-d-place">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f5581f" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {d.place}
        </div>
        <h5 className="bhk-d-name">{d.name}</h5>
        <p className="bhk-d-desc">{d.desc}</p>
        <a href="#" className="bhk-d-link">
          Explore
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </div>
  )
}

function DestinationSection({ id, eyebrow, title, subtitle, items, tint }) {
  return (
    <section id={id} className={'bhk-d-section' + (tint ? ' bhk-d-section-tint' : '')}>
      <div className="container">
        <div className="d-flex align-items-end justify-content-between flex-wrap mb-4 gap-2">
          <div>
            <h5 className="bhk-eyebrow">{eyebrow}</h5>
            <h2 className="bhk-heading mb-0">{title}</h2>
            {subtitle && <p className="bhk-d-subtitle">{subtitle}</p>}
          </div>
        </div>
        <div className="row g-4">
          {items.map((d) => (
            <div className="col-6 col-lg-3" key={d.name}>
              <DestinationCard d={d} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Destination = () => {
  const [active, setActive] = useState('forts')

  const scrollTo = (key) => {
    setActive(key)
    const el = document.getElementById(key)
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 90
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <>
      <Header />
      <main className="main" id="top">

        {/* ===================== Page Banner ===================== */}
        <section className="bhk-d-banner mt-7">
          <img
            className="bhk-banner-img"
            src="https://i.pinimg.com/1200x/a0/61/1a/a0611ac6cba4630c95a75abc5e8e1db7.jpg"
            alt="Sahyadri mountain range"
          />
          <div className="bhk-banner-overlay" />
          <div className="container position-relative text-center">
            <h1>Destinations</h1>
            <p className="mb-0">
              <span>Home</span> <span className="sep">/</span> <span className="active">Destinations</span>
            </p>
          </div>
        </section>

        {/* ===================== Sticky section nav ===================== */}
        <div className="bhk-d-nav">
          <div className="container">
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              {SECTIONS.map((s) => (
                <button
                  key={s.key}
                  onClick={() => scrollTo(s.key)}
                  className={'bhk-filter-btn' + (active === s.key ? ' active' : '')}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <DestinationSection
          id="forts"
          eyebrow="Maharashtra"
          title="Historic Forts"
          subtitle="Trek through Maratha history on these iconic hilltop forts."
          items={DATA.forts}
        />

        <DestinationSection
          id="hills"
          eyebrow="Maharashtra"
          title="Hill Stations"
          subtitle="Cool climate, misty valleys and weekend-perfect getaways."
          items={DATA.hills}
          tint
        />

        <DestinationSection
          id="waterfalls"
          eyebrow="Maharashtra"
          title="Waterfalls"
          subtitle="Chase the monsoon to these breathtaking cascades."
          items={DATA.waterfalls}
        />

        <DestinationSection
          id="india"
          eyebrow="Across the country"
          title="India's Best Destinations"
          subtitle="From beaches to the Himalayas — the trips every traveler dreams of."
          items={DATA.india}
          tint
        />

        {/* ===================== CTA ===================== */}
        <section className="bhk-d-cta">
          <div className="container text-center">
            <h2>Found your next destination?</h2>
            <p>Let us build a custom tour package around the place you love most.</p>
            <a href="/tour-packages" className="bhk-cta-btn">Browse Tour Packages</a>
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
          font-size: 1.9rem;
          color: #1e1e1e;
        }
        .bhk-d-subtitle {
          color: #6b7280;
          font-size: 0.92rem;
          margin: 0.4rem 0 0;
          max-width: 520px;
        }

        /* Banner */
        .bhk-d-banner {
          position: relative;
          overflow: hidden;
          padding: 7rem 0 3.5rem;
          min-height: 300px;
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
        .bhk-d-banner .container { z-index: 1; }
        .bhk-d-banner h1 {
          color: #fff;
          font-weight: 700;
          font-size: 2.6rem;
          margin-bottom: 0.6rem;
        }
        .bhk-d-banner p { color: rgba(255,255,255,0.7); font-size: 0.95rem; }
        .bhk-d-banner .active { color: #f5a623; font-weight: 600; }
        .bhk-d-banner .sep { margin: 0 6px; }

        /* Sticky nav */
        .bhk-d-nav {
          position: sticky;
          top: 0;
          z-index: 20;
          background: #fff;
          padding: 1.1rem 0;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }
        .bhk-filter-btn {
          border: 1px solid #e5e7eb;
          background: #fff;
          color: #444;
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.5rem 1.2rem;
          border-radius: 30px;
          transition: all 0.2s ease;
        }
        .bhk-filter-btn:hover { border-color: #1f4d3d; color: #1f4d3d; }
        .bhk-filter-btn.active {
          background: #1f4d3d;
          border-color: #1f4d3d;
          color: #fff;
        }

        /* Sections */
        .bhk-d-section { padding: 3.5rem 0; }
        .bhk-d-section-tint { background: #fafafa; }

        /* Card */
        .bhk-d-card {
          background: #fff;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0,0,0,0.06);
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .bhk-d-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 30px rgba(0,0,0,0.1);
        }
        .bhk-d-img-wrap {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }
        .bhk-d-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.35s ease;
        }
        .bhk-d-card:hover .bhk-d-img-wrap img { transform: scale(1.08); }
        .bhk-d-rating {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(255,255,255,0.95);
          color: #1e1e1e;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .bhk-d-body {
          padding: 1rem 1.1rem 1.25rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .bhk-d-place {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          color: #9ca3af;
          margin-bottom: 0.3rem;
        }
        .bhk-d-name {
          font-weight: 700;
          font-size: 1rem;
          color: #1e1e1e;
          margin-bottom: 0.4rem;
        }
        .bhk-d-desc {
          font-size: 0.82rem;
          color: #6b7280;
          line-height: 1.55;
          margin-bottom: 0.9rem;
          flex: 1;
        }
        .bhk-d-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #1f4d3d;
          font-weight: 700;
          font-size: 0.82rem;
          text-decoration: none;
          margin-top: auto;
        }
        .bhk-d-link:hover { color: #f5581f; }

        /* CTA */
        .bhk-d-cta {
          background: linear-gradient(135deg, #1f4d3d 0%, #123527 100%);
          padding: 4rem 0;
        }
        .bhk-d-cta h2 { color: #fff; font-weight: 700; font-size: 1.9rem; margin-bottom: 0.6rem; }
        .bhk-d-cta p { color: rgba(255,255,255,0.75); margin-bottom: 1.6rem; }
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
          .bhk-d-banner { padding: 6rem 0 2.5rem; }
          .bhk-d-nav { position: static; }
        }
      `}</style>
    </>
  )
}

export default Destination
