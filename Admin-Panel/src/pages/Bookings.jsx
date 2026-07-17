import React from "react";

function Bookings() {
  const [bookings, setBookings] = React.useState([
    { id: 1, customer: "Rahul Sharma", tour: "Goa Trip", date: "2026-07-10", status: "Confirmed", amount: "$1,240" },
    { id: 2, customer: "Sneha Patil", tour: "Kerala Backwaters", date: "2026-07-15", status: "Pending", amount: "$980" },
    { id: 3, customer: "Amit Singh", tour: "Himalayan Trek", date: "2026-07-20", status: "Completed", amount: "$2,150" },
  ]);

  const [showModal, setShowModal] = React.useState(false);
  const [newBooking, setNewBooking] = React.useState({
    customer: "",
    tour: "",
    date: "",
    status: "Pending",
    amount: "",
  });

  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("All");
  const [editingId, setEditingId] = React.useState(null);

  const tours = ["Goa Trip", "Kerala Backwaters", "Himalayan Trek", "Rajasthan Heritage", "Andaman Islands"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking({ ...newBooking, [name]: value });
  };

  const handleAddBooking = () => {
    if (newBooking.customer && newBooking.tour && newBooking.date && newBooking.amount) {
      if (editingId !== null) {
        // Edit existing booking
        setBookings(bookings.map(b => 
          b.id === editingId ? { ...newBooking, id: editingId } : b
        ));
        setEditingId(null);
      } else {
        // Add new booking
        const newId = bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1;
        const bookingToAdd = {
          ...newBooking,
          id: newId,
          status: newBooking.status || "Pending",
        };
        setBookings([...bookings, bookingToAdd]);
      }
      setNewBooking({ customer: "", tour: "", date: "", status: "Pending", amount: "" });
      setShowModal(false);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleDeleteBooking = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      setBookings(bookings.filter(b => b.id !== id));
    }
  };

  const handleEditBooking = (booking) => {
    setNewBooking({
      customer: booking.customer,
      tour: booking.tour,
      date: booking.date,
      status: booking.status,
      amount: booking.amount,
    });
    setEditingId(booking.id);
    setShowModal(true);
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.tour.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const colors = {
      Confirmed: "status-confirmed",
      Pending: "status-pending",
      Completed: "status-completed",
    };
    return colors[status] || "status-pending";
  };

  return (
    <div className="bookings-container">
      {/* Page Header */}
      <div className="bookings-header">
        <div>
          <h1 className="bookings-title">
            <svg className="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16v16H4z" />
              <path d="M8 8h8" />
              <path d="M8 12h6" />
              <path d="M8 16h4" />
            </svg>
            Bookings
          </h1>
          <p className="bookings-subtitle">Manage all customer bookings and reservations.</p>
        </div>
        <button className="btn-add-booking" onClick={() => {
          setEditingId(null);
          setNewBooking({ customer: "", tour: "", date: "", status: "Pending", amount: "" });
          setShowModal(true);
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          Add Booking
        </button>
      </div>

      {/* Filters & Search */}
      <div className="filters-section">
        <div className="search-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search by customer or tour..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-wrapper">
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="table-card">
        <div className="table-card-header">
          <div>
            <h5 className="table-card-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16M4 12h16M4 18h10" />
              </svg>
              All Bookings
              <span className="booking-count">{filteredBookings.length}</span>
            </h5>
          </div>
          <div className="table-actions">
            <button className="btn-icon" title="Export" onClick={() => alert("Export functionality coming soon!")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
            <button className="btn-icon" title="Refresh" onClick={() => window.location.reload()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
            </button>
          </div>
        </div>

        {filteredBookings.length === 0 ? (
          <div className="empty-state">
            <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16v16H4z" />
              <path d="M8 8h8" />
              <path d="M8 12h6" />
              <path d="M8 16h4" />
            </svg>
            <p className="empty-text">No bookings found</p>
            <p className="empty-subtext">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Tour Package</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <span className="booking-id">#{String(b.id).padStart(4, '0')}</span>
                    </td>
                    <td>
                      <div className="customer-cell">
                        <div className="customer-avatar">
                          {b.customer.charAt(0)}
                        </div>
                        <span className="customer-name">{b.customer}</span>
                      </div>
                    </td>
                    <td>{b.tour}</td>
                    <td>{new Date(b.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td className="fw-semibold">{b.amount}</td>
                    <td>
                      <span className={`status-badge ${getStatusBadge(b.status)}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="text-end">
                      <button className="btn-action" title="Edit" onClick={() => handleEditBooking(b)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                      </button>
                      <button className="btn-action btn-action-danger" title="Delete" onClick={() => handleDeleteBooking(b.id)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Booking Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">
                  <svg className="modal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {editingId !== null ? (
                      <>
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </>
                    ) : (
                      <>
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                      </>
                    )}
                  </svg>
                  {editingId !== null ? "Edit Booking" : "Add New Booking"}
                </h3>
                <p className="modal-subtitle">
                  {editingId !== null ? "Update the booking details below." : "Fill in the details to create a new booking."}
                </p>
              </div>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Customer Name <span className="required">*</span></label>
                  <input
                    type="text"
                    name="customer"
                    className="form-input"
                    placeholder="Enter customer name"
                    value={newBooking.customer}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Tour Package <span className="required">*</span></label>
                  <select
                    name="tour"
                    className="form-input"
                    value={newBooking.tour}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a tour</option>
                    {tours.map((tour) => (
                      <option key={tour} value={tour}>{tour}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Booking Date <span className="required">*</span></label>
                  <input
                    type="date"
                    name="date"
                    className="form-input"
                    value={newBooking.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Amount <span className="required">*</span></label>
                  <input
                    type="text"
                    name="amount"
                    className="form-input"
                    placeholder="e.g. $1,240"
                    value={newBooking.amount}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group full-width">
                  <label className="form-label">Status</label>
                  <select
                    name="status"
                    className="form-input"
                    value={newBooking.status}
                    onChange={handleInputChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAddBooking}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {editingId !== null ? "Update Booking" : "Create Booking"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* ===== CSS Variables ===== */
        :root {
          --primary: #4F46E5;
          --primary-light: #818CF8;
          --primary-dark: #4338CA;
          --primary-bg: #EEF2FF;
          --gray-50: #F9FAFB;
          --gray-100: #F3F4F6;
          --gray-200: #E5E7EB;
          --gray-300: #D1D5DB;
          --gray-400: #9CA3AF;
          --gray-500: #6B7280;
          --gray-600: #4B5563;
          --gray-700: #374151;
          --gray-800: #1F2937;
          --gray-900: #111827;
          --radius: 12px;
          --radius-lg: 16px;
          --shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04);
          --shadow-lg: 0 20px 60px rgba(0,0,0,0.12);
          --transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .bookings-container {
          padding: 28px 32px;
          background: var(--gray-50);
          min-height: 100vh;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* ===== Header ===== */
        .bookings-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 28px;
        }

        .bookings-title {
          font-size: 26px;
          font-weight: 700;
          color: var(--gray-900);
          margin: 0;
          letter-spacing: -0.4px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-icon {
          width: 28px;
          height: 28px;
          color: var(--primary);
        }

        .bookings-subtitle {
          font-size: 14px;
          color: var(--gray-500);
          margin: 2px 0 0 0;
        }

        .btn-add-booking {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: var(--radius);
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: var(--transition);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
          white-space: nowrap;
        }

        .btn-add-booking svg {
          width: 18px;
          height: 18px;
          stroke: currentColor;
        }

        .btn-add-booking:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(79, 70, 229, 0.35);
        }

        /* ===== Filters ===== */
        .filters-section {
          display: flex;
          gap: 14px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .search-wrapper {
          flex: 1;
          min-width: 200px;
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          width: 18px;
          height: 18px;
          color: var(--gray-400);
        }

        .search-input {
          width: 100%;
          padding: 10px 16px 10px 44px;
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
          font-size: 14px;
          background: white;
          transition: var(--transition);
          outline: none;
          color: var(--gray-800);
        }

        .search-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.08);
        }

        .search-input::placeholder {
          color: var(--gray-400);
        }

        .filter-wrapper {
          min-width: 150px;
        }

        .filter-select {
          width: 100%;
          padding: 10px 16px;
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
          font-size: 14px;
          background: white;
          outline: none;
          cursor: pointer;
          transition: var(--transition);
          color: var(--gray-700);
        }

        .filter-select:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.08);
        }

        /* ===== Table Card ===== */
        .table-card {
          background: white;
          border-radius: var(--radius-lg);
          padding: 24px 28px;
          box-shadow: var(--shadow);
          border: 1px solid var(--gray-100);
        }

        .table-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .table-card-title {
          font-size: 17px;
          font-weight: 600;
          color: var(--gray-900);
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .table-card-title svg {
          width: 20px;
          height: 20px;
          color: var(--primary);
        }

        .booking-count {
          background: var(--primary-bg);
          color: var(--primary);
          font-size: 12px;
          font-weight: 600;
          padding: 2px 12px;
          border-radius: 20px;
          margin-left: 4px;
        }

        .table-actions {
          display: flex;
          gap: 6px;
        }

        .btn-icon {
          width: 36px;
          height: 36px;
          border: 1px solid var(--gray-200);
          border-radius: 10px;
          background: white;
          color: var(--gray-500);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
          cursor: pointer;
        }

        .btn-icon svg {
          width: 18px;
          height: 18px;
        }

        .btn-icon:hover {
          background: var(--gray-50);
          border-color: var(--gray-300);
          color: var(--gray-700);
        }

        /* ===== Table ===== */
        .table-responsive {
          overflow-x: auto;
        }

        .table-modern {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 4px;
        }

        .table-modern thead th {
          padding: 10px 16px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--gray-500);
          text-align: left;
          border-bottom: 1px solid var(--gray-100);
        }

        .table-modern thead th:first-child {
          padding-left: 20px;
        }

        .table-modern thead th:last-child {
          padding-right: 20px;
        }

        .table-modern tbody tr {
          transition: var(--transition);
        }

        .table-modern tbody tr:hover {
          background: var(--gray-50);
        }

        .table-modern tbody td {
          padding: 12px 16px;
          border: none;
          vertical-align: middle;
          font-size: 14px;
          color: var(--gray-700);
          border-bottom: 1px solid var(--gray-100);
        }

        .table-modern tbody td:first-child {
          padding-left: 20px;
        }

        .table-modern tbody td:last-child {
          padding-right: 20px;
        }

        .booking-id {
          font-weight: 600;
          color: var(--primary);
          font-size: 13px;
        }

        .customer-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .customer-avatar {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: var(--primary-bg);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 13px;
          flex-shrink: 0;
        }

        .customer-name {
          font-weight: 500;
          color: var(--gray-800);
        }

        .status-badge {
          padding: 4px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.2px;
          display: inline-block;
        }

        .status-confirmed {
          background: #D1FAE5;
          color: #065F46;
        }

        .status-pending {
          background: #FEF3C7;
          color: #92400E;
        }

        .status-completed {
          background: #DBEAFE;
          color: #1E40AF;
        }

        .btn-action {
          background: none;
          border: none;
          color: var(--gray-400);
          padding: 4px 8px;
          border-radius: 8px;
          transition: var(--transition);
          cursor: pointer;
        }

        .btn-action svg {
          width: 18px;
          height: 18px;
        }

        .btn-action:hover {
          background: var(--gray-100);
          color: var(--primary);
        }

        .btn-action-danger:hover {
          background: #FEE2E2;
          color: #DC2626;
        }

        .text-end {
          text-align: right;
        }

        .fw-semibold {
          font-weight: 600;
        }

        /* ===== Empty State ===== */
        .empty-state {
          text-align: center;
          padding: 48px 20px;
        }

        .empty-icon {
          width: 56px;
          height: 56px;
          color: var(--gray-300);
        }

        .empty-text {
          font-size: 18px;
          font-weight: 600;
          color: var(--gray-800);
          margin: 16px 0 4px;
        }

        .empty-subtext {
          color: var(--gray-500);
          margin: 0;
          font-size: 14px;
        }

        /* ===== Modal ===== */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.25s ease;
        }

        .modal-container {
          background: white;
          border-radius: var(--radius-lg);
          max-width: 540px;
          width: 92%;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp 0.3s ease;
          box-shadow: var(--shadow-lg);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 24px 28px 16px 28px;
          border-bottom: 1px solid var(--gray-100);
        }

        .modal-title {
          font-size: 19px;
          font-weight: 700;
          color: var(--gray-900);
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .modal-icon {
          width: 22px;
          height: 22px;
          color: var(--primary);
        }

        .modal-subtitle {
          font-size: 14px;
          color: var(--gray-500);
          margin: 4px 0 0 0;
        }

        .modal-close {
          background: var(--gray-100);
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gray-500);
          cursor: pointer;
          transition: var(--transition);
          flex-shrink: 0;
        }

        .modal-close svg {
          width: 18px;
          height: 18px;
        }

        .modal-close:hover {
          background: var(--gray-200);
          color: var(--gray-700);
        }

        .modal-body {
          padding: 24px 28px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--gray-700);
        }

        .required {
          color: #EF4444;
        }

        .form-input {
          padding: 9px 14px;
          border: 1px solid var(--gray-200);
          border-radius: 10px;
          font-size: 14px;
          transition: var(--transition);
          outline: none;
          background: white;
          color: var(--gray-800);
        }

        .form-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.08);
        }

        .form-input::placeholder {
          color: var(--gray-400);
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 16px 28px 24px 28px;
          border-top: 1px solid var(--gray-100);
        }

        .btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 22px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          border: none;
          cursor: pointer;
          transition: var(--transition);
        }

        .btn svg {
          width: 18px;
          height: 18px;
        }

        .btn-primary {
          background: var(--primary);
          color: white;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
        }

        .btn-primary:hover {
          background: var(--primary-dark);
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
        }

        .btn-secondary {
          background: var(--gray-100);
          color: var(--gray-600);
        }

        .btn-secondary:hover {
          background: var(--gray-200);
          color: var(--gray-800);
        }

        /* ===== Responsive ===== */
        @media (max-width: 768px) {
          .bookings-container {
            padding: 16px;
          }

          .bookings-title {
            font-size: 20px;
          }

          .bookings-header {
            flex-direction: column;
            align-items: stretch;
          }

          .btn-add-booking {
            justify-content: center;
          }

          .filters-section {
            flex-direction: column;
          }

          .filter-wrapper {
            min-width: unset;
          }

          .table-card {
            padding: 16px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .modal-container {
            width: 96%;
          }

          .modal-header,
          .modal-body,
          .modal-footer {
            padding-left: 20px;
            padding-right: 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default Bookings;