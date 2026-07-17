import React from "react";

function Payments() {
  const [payments, setPayments] = React.useState([
    { id: 1, bookingId: "BK001", customer: "Rahul Sharma", tour: "Goa Trip", amount: "$1,240", method: "Credit Card", date: "2026-07-10", status: "Completed" },
    { id: 2, bookingId: "BK002", customer: "Sneha Patil", tour: "Kerala Backwaters", amount: "$980", method: "UPI", date: "2026-07-12", status: "Pending" },
    { id: 3, bookingId: "BK003", customer: "Amit Singh", tour: "Himalayan Trek", amount: "$2,150", method: "Bank Transfer", date: "2026-07-15", status: "Completed" },
    { id: 4, bookingId: "BK004", customer: "Priya Mehta", tour: "Rajasthan Heritage", amount: "$1,850", method: "Credit Card", date: "2026-07-18", status: "Failed" },
    { id: 5, bookingId: "BK005", customer: "Vikram Reddy", tour: "Andaman Islands", amount: "$1,620", method: "UPI", date: "2026-07-20", status: "Refunded" },
  ]);

  const [showModal, setShowModal] = React.useState(false);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);
  const [selectedPayment, setSelectedPayment] = React.useState(null);
  const [newPayment, setNewPayment] = React.useState({
    bookingId: "",
    customer: "",
    tour: "",
    amount: "",
    method: "Credit Card",
    date: "",
    status: "Pending",
  });

  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("All");
  const [filterMethod, setFilterMethod] = React.useState("All");
  const [editingId, setEditingId] = React.useState(null);

  const paymentMethods = ["Credit Card", "Debit Card", "UPI", "Bank Transfer", "Cash", "PayPal"];
  const tours = ["Goa Trip", "Kerala Backwaters", "Himalayan Trek", "Rajasthan Heritage", "Andaman Islands"];

  // Summary statistics
  const totalPayments = payments.length;
  const totalAmount = payments.reduce((sum, p) => {
    const num = parseFloat(p.amount.replace(/[$,]/g, ''));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);
  const completedPayments = payments.filter(p => p.status === "Completed").length;
  const pendingPayments = payments.filter(p => p.status === "Pending").length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPayment({ ...newPayment, [name]: value });
  };

  const handleAddPayment = () => {
    if (newPayment.bookingId && newPayment.customer && newPayment.tour && newPayment.amount && newPayment.date) {
      if (editingId !== null) {
        // Edit existing payment
        setPayments(payments.map(p => 
          p.id === editingId ? { ...newPayment, id: editingId } : p
        ));
        setEditingId(null);
      } else {
        // Add new payment
        const newId = payments.length > 0 ? Math.max(...payments.map(p => p.id)) + 1 : 1;
        const paymentToAdd = {
          ...newPayment,
          id: newId,
          status: newPayment.status || "Pending",
        };
        setPayments([...payments, paymentToAdd]);
      }
      setNewPayment({ bookingId: "", customer: "", tour: "", amount: "", method: "Credit Card", date: "", status: "Pending" });
      setShowModal(false);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleDeletePayment = (id) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      setPayments(payments.filter(p => p.id !== id));
    }
  };

  const handleEditPayment = (payment) => {
    setNewPayment({
      bookingId: payment.bookingId,
      customer: payment.customer,
      tour: payment.tour,
      amount: payment.amount,
      method: payment.method,
      date: payment.date,
      status: payment.status,
    });
    setEditingId(payment.id);
    setShowModal(true);
  };

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setShowDetailsModal(true);
  };

  const handleStatusChange = (id, newStatus) => {
    setPayments(payments.map(p => 
      p.id === id ? { ...p, status: newStatus } : p
    ));
  };

  const filteredPayments = payments.filter(p => {
    const matchesSearch = p.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.tour.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || p.status === filterStatus;
    const matchesMethod = filterMethod === "All" || p.method === filterMethod;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const getStatusBadge = (status) => {
    const colors = {
      Completed: "status-completed",
      Pending: "status-pending",
      Failed: "status-failed",
      Refunded: "status-refunded",
    };
    return colors[status] || "status-pending";
  };

  const getMethodIcon = (method) => {
    const icons = {
      "Credit Card": "💳",
      "Debit Card": "💳",
      "UPI": "📱",
      "Bank Transfer": "🏦",
      "Cash": "💵",
      "PayPal": "🌐",
    };
    return icons[method] || "💳";
  };

  return (
    <div className="payments-container">
      {/* Page Header */}
      <div className="payments-header">
        <div>
          <h1 className="payments-title">
            <svg className="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            Payments
          </h1>
          <p className="payments-subtitle">Manage all customer payments and transactions.</p>
        </div>
        <button className="btn-add-payment" onClick={() => {
          setEditingId(null);
          setNewPayment({ bookingId: "", customer: "", tour: "", amount: "", method: "Credit Card", date: "", status: "Pending" });
          setShowModal(true);
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          Add Payment
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-total">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Payments</span>
            <span className="stat-value">{totalPayments}</span>
          </div>
        </div>
        <div className="stat-card stat-amount">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v12" />
              <path d="M8 10h8" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Amount</span>
            <span className="stat-value">${totalAmount.toLocaleString()}</span>
          </div>
        </div>
        <div className="stat-card stat-completed">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Completed</span>
            <span className="stat-value">{completedPayments}</span>
          </div>
        </div>
        <div className="stat-card stat-pending">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Pending</span>
            <span className="stat-value">{pendingPayments}</span>
          </div>
        </div>
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
            placeholder="Search by customer, booking ID or tour..."
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
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
        <div className="filter-wrapper">
          <select
            className="filter-select"
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
          >
            <option value="All">All Methods</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="UPI">UPI</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cash">Cash</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="table-card">
        <div className="table-card-header">
          <div>
            <h5 className="table-card-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16M4 12h16M4 18h10" />
              </svg>
              All Payments
              <span className="payment-count">{filteredPayments.length}</span>
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

        {filteredPayments.length === 0 ? (
          <div className="empty-state">
            <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            <p className="empty-text">No payments found</p>
            <p className="empty-subtext">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Tour</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <span className="payment-id">#PY{String(p.id).padStart(4, '0')}</span>
                    </td>
                    <td>
                      <span className="booking-id">{p.bookingId}</span>
                    </td>
                    <td>
                      <div className="customer-cell">
                        <div className="customer-avatar">
                          {p.customer.charAt(0)}
                        </div>
                        <span className="customer-name">{p.customer}</span>
                      </div>
                    </td>
                    <td>{p.tour}</td>
                    <td className="fw-semibold amount">{p.amount}</td>
                    <td>
                      <span className="method-badge">
                        <span className="method-icon">{getMethodIcon(p.method)}</span>
                        {p.method}
                      </span>
                    </td>
                    <td>{new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td>
                      <div className="status-wrapper">
                        <span className={`status-badge ${getStatusBadge(p.status)}`}>
                          {p.status}
                        </span>
                        <select 
                          className="status-select"
                          value={p.status}
                          onChange={(e) => handleStatusChange(p.id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                          <option value="Failed">Failed</option>
                          <option value="Refunded">Refunded</option>
                        </select>
                      </div>
                    </td>
                    <td className="text-end">
                      <button className="btn-action" title="View Details" onClick={() => handleViewDetails(p)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <button className="btn-action" title="Edit" onClick={() => handleEditPayment(p)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                      </button>
                      <button className="btn-action btn-action-danger" title="Delete" onClick={() => handleDeletePayment(p.id)}>
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

      {/* Add/Edit Payment Modal */}
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
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                        <line x1="1" y1="10" x2="23" y2="10" />
                      </>
                    )}
                  </svg>
                  {editingId !== null ? "Edit Payment" : "Add New Payment"}
                </h3>
                <p className="modal-subtitle">
                  {editingId !== null ? "Update the payment details below." : "Fill in the details to create a new payment."}
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
                  <label className="form-label">Booking ID <span className="required">*</span></label>
                  <input
                    type="text"
                    name="bookingId"
                    className="form-input"
                    placeholder="e.g. BK001"
                    value={newPayment.bookingId}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Customer Name <span className="required">*</span></label>
                  <input
                    type="text"
                    name="customer"
                    className="form-input"
                    placeholder="Enter customer name"
                    value={newPayment.customer}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Tour Package <span className="required">*</span></label>
                  <select
                    name="tour"
                    className="form-input"
                    value={newPayment.tour}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a tour</option>
                    {tours.map((tour) => (
                      <option key={tour} value={tour}>{tour}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Amount <span className="required">*</span></label>
                  <input
                    type="text"
                    name="amount"
                    className="form-input"
                    placeholder="e.g. $1,240"
                    value={newPayment.amount}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Payment Method <span className="required">*</span></label>
                  <select
                    name="method"
                    className="form-input"
                    value={newPayment.method}
                    onChange={handleInputChange}
                  >
                    {paymentMethods.map((method) => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Payment Date <span className="required">*</span></label>
                  <input
                    type="date"
                    name="date"
                    className="form-input"
                    value={newPayment.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group full-width">
                  <label className="form-label">Status</label>
                  <select
                    name="status"
                    className="form-input"
                    value={newPayment.status}
                    onChange={handleInputChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Failed">Failed</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAddPayment}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {editingId !== null ? "Update Payment" : "Create Payment"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showDetailsModal && selectedPayment && (
        <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
          <div className="modal-container modal-details" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">
                  <svg className="modal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Payment Details
                </h3>
                <p className="modal-subtitle">Complete payment information</p>
              </div>
              <button className="modal-close" onClick={() => setShowDetailsModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="modal-body details-body">
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Payment ID</span>
                  <span className="detail-value">#PY{String(selectedPayment.id).padStart(4, '0')}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Booking ID</span>
                  <span className="detail-value">{selectedPayment.bookingId}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Customer</span>
                  <span className="detail-value">{selectedPayment.customer}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Tour Package</span>
                  <span className="detail-value">{selectedPayment.tour}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Amount</span>
                  <span className="detail-value amount">{selectedPayment.amount}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Payment Method</span>
                  <span className="detail-value">
                    <span className="method-icon">{getMethodIcon(selectedPayment.method)}</span>
                    {selectedPayment.method}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Date</span>
                  <span className="detail-value">{new Date(selectedPayment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status</span>
                  <span className={`status-badge ${getStatusBadge(selectedPayment.status)}`}>
                    {selectedPayment.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowDetailsModal(false)}>
                Close
              </button>
              <button className="btn btn-primary" onClick={() => {
                setShowDetailsModal(false);
                handleEditPayment(selectedPayment);
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                Edit Payment
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
          --green: #10B981;
          --green-bg: #D1FAE5;
          --yellow: #F59E0B;
          --yellow-bg: #FEF3C7;
          --red: #EF4444;
          --red-bg: #FEE2E2;
          --blue: #3B82F6;
          --blue-bg: #DBEAFE;
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

        .payments-container {
          padding: 28px 32px;
          background: var(--gray-50);
          min-height: 100vh;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* ===== Header ===== */
        .payments-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 24px;
        }

        .payments-title {
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

        .payments-subtitle {
          font-size: 14px;
          color: var(--gray-500);
          margin: 2px 0 0 0;
        }

        .btn-add-payment {
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

        .btn-add-payment svg {
          width: 18px;
          height: 18px;
          stroke: currentColor;
        }

        .btn-add-payment:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(79, 70, 229, 0.35);
        }

        /* ===== Stats ===== */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .stat-card {
          background: white;
          border-radius: var(--radius);
          padding: 18px 22px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: var(--shadow);
          border: 1px solid var(--gray-100);
          transition: var(--transition);
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-icon svg {
          width: 22px;
          height: 22px;
        }

        .stat-total .stat-icon {
          background: var(--primary-bg);
          color: var(--primary);
        }

        .stat-amount .stat-icon {
          background: #ECFDF5;
          color: var(--green);
        }

        .stat-completed .stat-icon {
          background: var(--green-bg);
          color: var(--green);
        }

        .stat-pending .stat-icon {
          background: var(--yellow-bg);
          color: var(--yellow);
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-label {
          font-size: 12px;
          font-weight: 500;
          color: var(--gray-500);
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .stat-value {
          font-size: 22px;
          font-weight: 700;
          color: var(--gray-900);
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

        .payment-count {
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

        .payment-id {
          font-weight: 600;
          color: var(--primary);
          font-size: 13px;
        }

        .booking-id {
          font-weight: 500;
          color: var(--gray-600);
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

        .amount {
          font-weight: 600;
          color: var(--gray-900);
        }

        .method-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          background: var(--gray-100);
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          color: var(--gray-700);
        }

        .method-icon {
          font-size: 14px;
        }

        .status-badge {
          padding: 4px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.2px;
          display: inline-block;
        }

        .status-completed {
          background: var(--green-bg);
          color: #065F46;
        }

        .status-pending {
          background: var(--yellow-bg);
          color: #92400E;
        }

        .status-failed {
          background: var(--red-bg);
          color: #991B1B;
        }

        .status-refunded {
          background: var(--blue-bg);
          color: #1E40AF;
        }

        .status-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .status-select {
          padding: 2px 8px;
          border: 1px solid var(--gray-200);
          border-radius: 6px;
          font-size: 11px;
          background: white;
          cursor: pointer;
          outline: none;
          transition: var(--transition);
        }

        .status-select:focus {
          border-color: var(--primary);
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
          background: var(--red-bg);
          color: var(--red);
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

        .modal-details {
          max-width: 520px;
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
          color: var(--red);
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

        /* ===== Details Modal ===== */
        .details-body {
          padding: 16px 28px 24px;
        }

        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 12px 16px;
          background: var(--gray-50);
          border-radius: 10px;
        }

        .detail-item .detail-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          color: var(--gray-500);
        }

        .detail-item .detail-value {
          font-size: 15px;
          font-weight: 500;
          color: var(--gray-800);
        }

        .detail-item .detail-value.amount {
          font-weight: 700;
          color: var(--gray-900);
        }

        /* ===== Responsive ===== */
        @media (max-width: 768px) {
          .payments-container {
            padding: 16px;
          }

          .payments-title {
            font-size: 20px;
          }

          .payments-header {
            flex-direction: column;
            align-items: stretch;
          }

          .btn-add-payment {
            justify-content: center;
          }

          .stats-grid {
            grid-template-columns: 1fr 1fr;
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

          .details-grid {
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

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default Payments;