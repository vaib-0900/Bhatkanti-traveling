import React, { useState } from 'react';

const CATEGORIES = ['All', 'Trekking', 'Beach', 'Hill Station', 'Heritage', 'Adventure'];

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
    img: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=700&q=80',
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
];

// Get unique categories for dropdown (excluding 'All')
const CATEGORY_OPTIONS = CATEGORIES.filter(cat => cat !== 'All');

const TourPackages = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [packages, setPackages] = useState(PACKAGES);
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    place: '',
    category: 'Trekking',
    duration: '',
    rating: '4.0',
    price: '',
    oldPrice: '',
    img: '',
    tag: '',
  });

  const filtered = activeCategory === 'All'
    ? packages
    : packages.filter((p) => p.category === activeCategory);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      place: '',
      category: 'Trekking',
      duration: '',
      rating: '4.0',
      price: '',
      oldPrice: '',
      img: '',
      tag: '',
    });
    setEditingPackage(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (pkg) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      place: pkg.place,
      category: pkg.category,
      duration: pkg.duration,
      rating: pkg.rating,
      price: pkg.price.toString(),
      oldPrice: pkg.oldPrice.toString(),
      img: pkg.img,
      tag: pkg.tag || '',
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newPackage = {
      id: editingPackage ? editingPackage.id : Date.now(),
      name: formData.name,
      place: formData.place,
      category: formData.category,
      duration: formData.duration,
      rating: formData.rating,
      price: parseFloat(formData.price),
      oldPrice: parseFloat(formData.oldPrice),
      img: formData.img || 'https://placehold.co/400x300?text=Tour+Package',
      tag: formData.tag || null,
    };

    if (editingPackage) {
      // Edit existing package
      setPackages(packages.map(p => p.id === editingPackage.id ? newPackage : p));
    } else {
      // Add new package
      setPackages([newPackage, ...packages]);
    }
    
    setShowModal(false);
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      setPackages(packages.filter(p => p.id !== id));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  return (
    <>
    
      <main className="main" id="top">

        {/* ===================== Page Banner ===================== */}


        {/* ===================== Header with Add Button ===================== */}
        <section className="bhk-tp-header">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <h2 className="bhk-section-title mb-0">Explore Our Packages</h2>
              <button className="bhk-add-btn" onClick={openAddModal}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Tour Package
              </button>
            </div>
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
            {packages.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted mb-3">No tour packages available.</p>
                <button className="bhk-add-btn" onClick={openAddModal}>
                  Add Your First Package
                </button>
              </div>
            ) : (
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
                        {/* Action buttons on card */}
                        <div className="bhk-pkg-actions">
                          <button 
                            className="bhk-action-btn edit" 
                            onClick={() => openEditModal(pkg)}
                            title="Edit Package"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>
                          <button 
                            className="bhk-action-btn delete" 
                            onClick={() => handleDelete(pkg.id)}
                            title="Delete Package"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
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
            )}

            {filtered.length === 0 && packages.length > 0 && (
              <p className="text-center text-muted py-5">No packages found in this category.</p>
            )}
          </div>
        </section>  

      </main>

      {/* ===================== Add/Edit Modal ===================== */}
      {showModal && (
        <div className="bhk-modal-overlay" onClick={handleCloseModal}>
          <div className="bhk-modal" onClick={(e) => e.stopPropagation()}>
            <div className="bhk-modal-header">
              <h3>{editingPackage ? 'Edit Tour Package' : 'Add New Tour Package'}</h3>
              <button className="bhk-modal-close" onClick={handleCloseModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="bhk-modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Package Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Place *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="place"
                      value={formData.place}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Category *</label>
                    <select
                      className="form-select"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      {CATEGORY_OPTIONS.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Duration *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="duration"
                      placeholder="e.g., 4 Days / 3 Nights"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Rating</label>
                    <input
                      type="number"
                      className="form-control"
                      name="rating"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Price (₹) *</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Old Price (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="oldPrice"
                      value={formData.oldPrice}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-8">
                    <label className="form-label">Image URL</label>
                    <input
                      type="url"
                      className="form-control"
                      name="img"
                      placeholder="https://example.com/image.jpg"
                      value={formData.img}
                      onChange={handleInputChange}
                    />
                    <small className="text-muted">Leave empty for placeholder image</small>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Tag</label>
                    <input
                      type="text"
                      className="form-control"
                      name="tag"
                      placeholder="Popular, Best Seller, etc."
                      value={formData.tag}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="bhk-modal-footer">
                <button type="button" className="bhk-modal-btn cancel" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="bhk-modal-btn submit">
                  {editingPackage ? 'Update Package' : 'Add Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
          background: rgba(0,0,0,0.4);
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

        /* Header with Add Button */
        .bhk-tp-header {
          padding: 2.5rem 0 0.5rem;
        }
        .bhk-section-title {
          font-weight: 700;
          color: #1e1e1e;
        }
        .bhk-add-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #1f4d3d;
          color: #fff;
          border: none;
          padding: 0.6rem 1.4rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .bhk-add-btn:hover {
          background: #123527;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(31, 77, 61, 0.3);
        }

        /* Filter bar */
        .bhk-tp-filter {
          padding: 1.5rem 0 0.5rem;
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
          cursor: pointer;
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
        
        /* Package Actions (Edit/Delete) */
        .bhk-pkg-actions {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          gap: 6px;
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .bhk-pkg-card:hover .bhk-pkg-actions {
          opacity: 1;
        }
        .bhk-action-btn {
          width: 34px;
          height: 34px;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          background: rgba(255,255,255,0.95);
          color: #444;
        }
        .bhk-action-btn.edit:hover {
          background: #1f4d3d;
          color: #fff;
        }
        .bhk-action-btn.delete:hover {
          background: #dc3545;
          color: #fff;
        }

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

        /* ===== Modal Styles ===== */
        .bhk-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: fadeIn 0.25s ease;
        }
        .bhk-modal {
          background: #fff;
          border-radius: 16px;
          max-width: 650px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp 0.3s ease;
          box-shadow: 0 24px 48px rgba(0,0,0,0.2);
        }
        .bhk-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          background: #fff;
          z-index: 1;
          border-radius: 16px 16px 0 0;
        }
        .bhk-modal-header h3 {
          font-weight: 700;
          color: #1e1e1e;
          margin: 0;
        }
        .bhk-modal-close {
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
          padding: 4px;
          border-radius: 50%;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bhk-modal-close:hover {
          background: #f3f4f6;
          color: #1e1e1e;
        }
        .bhk-modal-body {
          padding: 1.5rem;
        }
        .bhk-modal-body .form-label {
          font-weight: 600;
          font-size: 0.85rem;
          color: #374151;
          margin-bottom: 0.25rem;
        }
        .bhk-modal-body .form-control,
        .bhk-modal-body .form-select {
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 0.6rem 0.75rem;
          font-size: 0.9rem;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .bhk-modal-body .form-control:focus,
        .bhk-modal-body .form-select:focus {
          border-color: #1f4d3d;
          box-shadow: 0 0 0 3px rgba(31, 77, 61, 0.15);
        }
        .bhk-modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          padding: 1rem 1.5rem 1.5rem;
          border-top: 1px solid #e5e7eb;
        }
        .bhk-modal-btn {
          padding: 0.6rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .bhk-modal-btn.cancel {
          background: #f3f4f6;
          color: #374151;
        }
        .bhk-modal-btn.cancel:hover {
          background: #e5e7eb;
        }
        .bhk-modal-btn.submit {
          background: #1f4d3d;
          color: #fff;
        }
        .bhk-modal-btn.submit:hover {
          background: #123527;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(31, 77, 61, 0.3);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @media (max-width: 767px) {
          .bhk-tp-banner { padding: 6rem 0 2.5rem; }
          .bhk-modal { max-width: 100%; margin: 1rem; }
          .bhk-modal-body { padding: 1rem; }
          .bhk-pkg-actions { opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default TourPackages;