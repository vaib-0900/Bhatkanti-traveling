import React, { useState } from 'react'
import Header from '../componant/Header'
import Footer from '../componant/Footer'

const CATEGORIES = ['All', 'Trekking', 'Beach', 'Hill Station', 'Heritage', 'Adventure']

const PACKAGES = [
  {
    id: 1,
    name: 'Sinhagad Fort Trek',
    place: 'Pune, Maharashtra',
    category: 'Trekking',
    duration: '1 Day',
    rating: '4.7',
    price: 999,
    oldPrice: 1499,
    img: 'https://i.pinimg.com/736x/0e/b2/19/0eb219593e7827dd3f17a2a0437de8af.jpg',
    tag: 'Popular',
  },
  {
    id: 2,
    name: 'Goa Beach Getaway',
    place: 'Goa',
    category: 'Beach',
    duration: '4 Days / 3 Nights',
    rating: '4.8',
    price: 8999,
    oldPrice: 11999,
    img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=80',
    tag: 'Best Seller',
  },
  {
    id: 3,
    name: 'Mahabaleshwar Hills Escape',
    place: 'Satara, Maharashtra',
    category: 'Hill Station',
    duration: '2 Days / 1 Night',
    rating: '4.6',
    price: 4499,
    oldPrice: 5999,
    img: 'https://i.pinimg.com/736x/cc/1a/fb/cc1afbfcbcb00aa18b6422307a36c315.jpg',
    tag: null,
  },
  {
    id: 4,
    name: 'Lonavala Monsoon Special',
    place: 'Pune, Maharashtra',
    category: 'Hill Station',
    duration: '2 Days / 1 Night',
    rating: '4.5',
    price: 3999,
    oldPrice: 4999,
    img: 'https://i.pinimg.com/736x/4d/c4/6f/4dc46fc494eb775d263aced9a5953b2f.jpg',
    tag: null,
  },
  {
    id: 5,
    name: 'Kerala Backwaters Tour',
    place: 'Alleppey, Kerala',
    category: 'Beach',
    duration: '5 Days / 4 Nights',
    rating: '4.9',
    price: 14999,
    oldPrice: 18999,
    img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=700&q=80',
    tag: 'Best Seller',
  },
  {
    id: 6,
    name: 'Rajasthan Royal Heritage',
    place: 'Jaipur, Rajasthan',
    category: 'Heritage',
    duration: '6 Days / 5 Nights',
    rating: '4.7',
    price: 17999,
    oldPrice: 21999,
    img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=700&q=80',
    tag: null,
  },
  {
    id: 7,
    name: 'Ladakh Bike Expedition',
    place: 'Leh, Ladakh',
    category: 'Adventure',
    duration: '7 Days / 6 Nights',
    rating: '4.9',
    price: 24999,
    oldPrice: 29999,
    img: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=700&q=80',
    tag: 'Popular',
  },
  {
    id: 8,
    name: 'Kashmir Valley Dreams',
    place: 'Srinagar, Kashmir',
    category: 'Hill Station',
    duration: '5 Days / 4 Nights',
    rating: '4.8',
    price: 19999,
    oldPrice: 24999,
    img: 'https://i.pinimg.com/1200x/61/03/8b/61038b9d0d4199a7e43f9a159883a555.jpg',
    tag: null,
  },
  {
    id: 9,
    name: 'Harihar Fort Adventure Trek',
    place: 'Nashik, Maharashtra',
    category: 'Trekking',
    duration: '1 Day',
    rating: '4.6',
    price: 1299,
    oldPrice: 1799,
    img: 'https://vl-prod-static.b-cdn.net/system/images/000/704/237/eff5c6e94ef9941063e146d30452696f/original/CTKJxaBo0O0.jpg',
    tag: null,
  },
]

const TourPackages = () => {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? PACKAGES
      : PACKAGES.filter((p) => p.category === activeCategory)

  return (
    <>
      <Header />
      <main className="main" id="top">

        {/* ===================== Page Banner ===================== */}
        <section className="bhk-tp-banner mt-7">
          <img
            className="bhk-banner-img"
            src="https://i.pinimg.com/1200x/85/62/a8/8562a863b19d2075eb119f1a22044bfe.jpg"
            alt="Scenic travel destination"
          />
          <div className="bhk-banner-overlay" />
          <div className="container position-relative text-center">
            <h1>Tour Packages</h1>
            <p className="mb-0">
              <span>Home</span> <span className="sep">/</span> <span className="active">Tour Packages</span>
            </p>
          </div>
        </section>

        {/* ===================== Filter bar ===================== */}
        <section className="bhk-tp-filter">
          <div className="container">
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={
                    'bhk-filter-btn' + (activeCategory === cat ? ' active' : '')
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== Packages grid ===================== */}
        <section className="bhk-tp-grid">
          <div className="container">
            <div className="row g-4">
              {filtered.map((pkg) => (
                <div className="col-md-6 col-lg-4" key={pkg.id}>
                  <div className="bhk-pkg-card">
                    <div className="bhk-pkg-img-wrap">
                      <img src={pkg.img} alt={pkg.name} />
                      {pkg.tag && <span className="bhk-pkg-tag">{pkg.tag}</span>}
                      <span className="bhk-pkg-duration">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v5l3 3" />
                        </svg>
                        {pkg.duration}
                      </span>
                    </div>
                    <div className="bhk-pkg-body">
                      <div className="bhk-pkg-place">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f5581f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {pkg.place}
                      </div>
                      <h5 className="bhk-pkg-name">{pkg.name}</h5>
                      <div className="bhk-pkg-rating">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#f5a623" stroke="none">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01z" />
                        </svg>
                        <span>{pkg.rating}</span>
                        <span className="bhk-pkg-reviews">(120+ reviews)</span>
                      </div>
                      <div className="bhk-pkg-footer">
                        <div>
                          <span className="bhk-pkg-old">₹{pkg.oldPrice.toLocaleString('en-IN')}</span>
                          <span className="bhk-pkg-price">₹{pkg.price.toLocaleString('en-IN')}</span>
                          <span className="bhk-pkg-per">/ person</span>
                        </div>
                        <a href={`/tour-packages/${pkg.id}`} className="bhk-pkg-btn">
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-muted py-5">No packages found in this category.</p>
            )}
          </div>
        </section>

        {/* ===================== CTA ===================== */}
        <section className="bhk-tp-cta">
          <div className="container text-center">
            <h2>Can't find what you're looking for?</h2>
            <p>Tell us your dream destination and we'll design a custom itinerary just for you.</p>
            <a href="/contact" className="bhk-cta-btn">Request Custom Package</a>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        /* Banner */
        .bhk-tp-banner {
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
        .bhk-tp-banner .container { z-index: 1; }
        .bhk-tp-banner h1 {
          color: #fff;
          font-weight: 700;
          font-size: 2.6rem;
          margin-bottom: 0.6rem;
        }
        .bhk-tp-banner p { color: rgba(255,255,255,0.7); font-size: 0.95rem; }
        .bhk-tp-banner .active { color: #f5a623; font-weight: 600; }
        .bhk-tp-banner .sep { margin: 0 6px; }

        /* Filter bar */
        .bhk-tp-filter {
          padding: 2.5rem 0 0.5rem;
        }
        .bhk-filter-btn {
          border: 1px solid #e5e7eb;
          background: #fff;
          color: #444;
          font-size: 0.88rem;
          font-weight: 600;
          padding: 0.5rem 1.25rem;
          border-radius: 30px;
          transition: all 0.2s ease;
        }
        .bhk-filter-btn:hover {
          border-color: #1f4d3d;
          color: #1f4d3d;
        }
        .bhk-filter-btn.active {
          background: #1f4d3d;
          border-color: #1f4d3d;
          color: #fff;
        }

        /* Grid */
        .bhk-tp-grid { padding: 3rem 0 4.5rem; }
        .bhk-pkg-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .bhk-pkg-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 34px rgba(0,0,0,0.1);
        }
        .bhk-pkg-img-wrap {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }
        .bhk-pkg-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.35s ease;
        }
        .bhk-pkg-card:hover .bhk-pkg-img-wrap img { transform: scale(1.08); }
        .bhk-pkg-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #f5581f;
          color: #fff;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
        }
        .bhk-pkg-duration {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: rgba(0,0,0,0.55);
          color: #fff;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .bhk-pkg-body {
          padding: 1.25rem 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .bhk-pkg-place {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.8rem;
          color: #6b7280;
          margin-bottom: 0.35rem;
        }
        .bhk-pkg-name {
          font-weight: 700;
          color: #1e1e1e;
          margin-bottom: 0.5rem;
        }
        .bhk-pkg-rating {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.85rem;
          font-weight: 700;
          color: #1e1e1e;
          margin-bottom: 1rem;
        }
        .bhk-pkg-reviews {
          font-weight: 400;
          color: #9ca3af;
          font-size: 0.78rem;
        }
        .bhk-pkg-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px solid #f0f0f0;
        }
        .bhk-pkg-old {
          display: block;
          font-size: 0.75rem;
          color: #9ca3af;
          text-decoration: line-through;
        }
        .bhk-pkg-price {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1f4d3d;
        }
        .bhk-pkg-per {
          font-size: 0.72rem;
          color: #9ca3af;
        }
        .bhk-pkg-btn {
          background: #1f4d3d;
          color: #fff;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.5rem 0.9rem;
          border-radius: 8px;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.2s ease;
        }
        .bhk-pkg-btn:hover { background: #173a2e; color: #fff; }

        /* CTA */
        .bhk-tp-cta {
          background: linear-gradient(135deg, #1f4d3d 0%, #123527 100%);
          padding: 4rem 0;
        }
        .bhk-tp-cta h2 { color: #fff; font-weight: 700; font-size: 1.9rem; margin-bottom: 0.6rem; }
        .bhk-tp-cta p { color: rgba(255,255,255,0.75); margin-bottom: 1.6rem; }
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
          .bhk-tp-banner { padding: 6rem 0 2.5rem; }
        }
      `}</style>
    </>
  )
}

export default TourPackages
