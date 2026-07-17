function Dashboard() {
  const stats = [
    { title: "Total Bookings", value: "120", icon: "bi-journal-check", color: "primary", trend: "+12%", trendUp: true },
    { title: "Total Tours", value: "15", icon: "bi-map", color: "success", trend: "+8%", trendUp: true },
    { title: "Total Customers", value: "80", icon: "bi-people", color: "warning", trend: "+5%", trendUp: true },
  ];

  const recentBookings = [
    { id: 1, customer: "Alice Johnson", tour: "Bali Paradise", date: "2026-07-15", status: "Confirmed", amount: "$1,240" },
    { id: 2, customer: "Bob Smith", tour: "Tokyo Explorer", date: "2026-07-18", status: "Pending", amount: "$980" },
    { id: 3, customer: "Carol White", tour: "Greek Islands", date: "2026-07-20", status: "Completed", amount: "$2,150" },
    { id: 4, customer: "David Brown", tour: "New York City", date: "2026-07-22", status: "Confirmed", amount: "$760" },
  ];

  const getStatusBadge = (status) => {
    const colors = {
      Confirmed: "success",
      Pending: "warning",
      Completed: "info",
    };
    return `bg-${colors[status] || "secondary"}`;
  };

  return (
    <div className="dashboard-container">
      {/* Page Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">
            <i className="bi bi-speedometer2 me-3 text-primary"></i>
            Dashboard
          </h1>
          <p className="dashboard-subtitle">Welcome back, Admin! Here's what's happening with your tours today.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary btn-add">
            <i className="bi bi-plus-circle me-2"></i>New Booking
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-card-inner">
              <div className="stat-content">
                <span className="stat-label">{s.title}</span>
                <div className="stat-value-wrapper">
                  <span className="stat-value">{s.value}</span>
                  <span className={`stat-trend ${s.trendUp ? "trend-up" : "trend-down"}`}>
                    <i className={`bi bi-${s.trendUp ? "arrow-up" : "arrow-down"}-short`}></i>
                    {s.trend}
                  </span>
                </div>
              </div>
              <div className={`stat-icon-wrapper bg-${s.color}-soft`}>
                <i className={`bi ${s.icon} text-${s.color}`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings Table */}
      <div className="table-card">
        <div className="table-card-header">
          <div>
            <h5 className="table-card-title">
              <i className="bi bi-clock-history me-2 text-primary"></i>
              Recent Bookings
            </h5>
            <p className="table-card-subtitle">Latest customer bookings from the past 7 days</p>
          </div>
          <button className="btn btn-outline-primary btn-sm btn-view-all">
            View All <i className="bi bi-chevron-right ms-1"></i>
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-modern">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Tour</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <div className="customer-cell">
                      <div className="customer-avatar">
                        {booking.customer.charAt(0)}
                      </div>
                      <span className="customer-name">{booking.customer}</span>
                    </div>
                  </td>
                  <td>{booking.tour}</td>
                  <td>{new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td>
                    <span className={`status-badge ${getStatusBadge(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="fw-semibold">{booking.amount}</td>
                  <td className="text-end">
                    <button className="btn-action-icon" title="View Details">
                      <i className="bi bi-three-dots-vertical"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          padding: 24px 28px;
          background: #f8fafc;
          min-height: 100vh;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        /* Header */
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          margin-bottom: 32px;
          gap: 16px;
        }

        .dashboard-title {
          font-size: 28px;
          font-weight: 700;
          color: #0b1120;
          margin: 0 0 4px 0;
          letter-spacing: -0.5px;
          display: flex;
          align-items: center;
        }

        .dashboard-title i {
          font-size: 30px;
        }

        .dashboard-subtitle {
          font-size: 15px;
          color: #64748b;
          margin: 0;
          font-weight: 400;
        }

        .header-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .btn-add {
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          border: none;
          padding: 10px 22px;
          font-weight: 600;
          font-size: 14px;
          border-radius: 12px;
          box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
          color: white;
        }

        .btn-add:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
          background: linear-gradient(135deg, #2563eb, #4f46e5);
          color: white;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: white;
          border-radius: 16px;
          padding: 20px 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03);
          transition: all 0.3s ease;
          border: 1px solid rgba(226, 232, 240, 0.6);
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.06);
          border-color: #e2e8f0;
        }

        .stat-card-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stat-content {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .stat-label {
          font-size: 13px;
          font-weight: 500;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }

        .stat-value-wrapper {
          display: flex;
          align-items: baseline;
          gap: 12px;
        }

        .stat-value {
          font-size: 32px;
          font-weight: 700;
          color: #0b1120;
          letter-spacing: -0.5px;
          line-height: 1;
        }

        .stat-trend {
          font-size: 13px;
          font-weight: 600;
          padding: 2px 10px;
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
          gap: 2px;
        }

        .stat-trend.trend-up {
          color: #16a34a;
          background: #dcfce7;
        }

        .stat-trend.trend-down {
          color: #dc2626;
          background: #fee2e2;
        }

        .stat-trend i {
          font-size: 18px;
          line-height: 1;
        }

        .stat-icon-wrapper {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-icon-wrapper i {
          font-size: 26px;
        }

        .bg-primary-soft {
          background: #eff6ff;
        }
        .bg-success-soft {
          background: #f0fdf4;
        }
        .bg-warning-soft {
          background: #fffbeb;
        }

        .text-primary { color: #3b82f6; }
        .text-success { color: #22c55e; }
        .text-warning { color: #f59e0b; }

        /* Table Card */
        .table-card {
          background: white;
          border-radius: 16px;
          padding: 24px 28px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03);
          border: 1px solid rgba(226, 232, 240, 0.6);
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
          font-size: 18px;
          font-weight: 600;
          color: #0b1120;
          margin: 0;
          display: flex;
          align-items: center;
        }

        .table-card-subtitle {
          font-size: 14px;
          color: #94a3b8;
          margin: 2px 0 0 0;
        }

        .btn-view-all {
          border-radius: 10px;
          padding: 6px 16px;
          font-weight: 500;
          border-color: #e2e8f0;
          color: #475569;
          transition: all 0.2s ease;
        }

        .btn-view-all:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
          color: #0b1120;
        }

        /* Modern Table */
        .table-modern {
          margin: 0;
          border-collapse: separate;
          border-spacing: 0 4px;
          width: 100%;
        }

        .table-modern thead th {
          background: #f8fafc;
          padding: 12px 16px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #64748b;
          border: none;
          border-radius: 0;
        }

        .table-modern thead th:first-child {
          border-radius: 10px 0 0 10px;
          padding-left: 20px;
        }

        .table-modern thead th:last-child {
          border-radius: 0 10px 10px 0;
          padding-right: 20px;
        }

        .table-modern tbody tr {
          background: white;
          transition: all 0.15s ease;
          border-radius: 10px;
        }

        .table-modern tbody tr:hover {
          background: #f8fafc;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }

        .table-modern tbody td {
          padding: 14px 16px;
          border: none;
          vertical-align: middle;
          font-size: 14px;
          color: #1e293b;
        }

        .table-modern tbody td:first-child {
          border-radius: 10px 0 0 10px;
          padding-left: 20px;
        }

        .table-modern tbody td:last-child {
          border-radius: 0 10px 10px 0;
          padding-right: 20px;
        }

        .customer-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .customer-avatar {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
          color: #4f46e5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          flex-shrink: 0;
        }

        .customer-name {
          font-weight: 500;
          color: #0b1120;
        }

        .status-badge {
          padding: 4px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.3px;
          display: inline-block;
          background: #e2e8f0;
          color: #475569;
        }

        .status-badge.bg-success {
          background: #dcfce7;
          color: #16a34a;
        }

        .status-badge.bg-warning {
          background: #fef3c7;
          color: #d97706;
        }

        .status-badge.bg-info {
          background: #dbeafe;
          color: #2563eb;
        }

        .btn-action-icon {
          background: none;
          border: none;
          color: #94a3b8;
          padding: 4px 8px;
          border-radius: 8px;
          transition: all 0.2s ease;
          font-size: 18px;
        }

        .btn-action-icon:hover {
          background: #f1f5f9;
          color: #0b1120;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .dashboard-container {
            padding: 16px;
          }

          .dashboard-title {
            font-size: 22px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .stat-value {
            font-size: 26px;
          }

          .table-card {
            padding: 16px;
          }

          .table-card-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .table-modern tbody td,
          .table-modern thead th {
            padding: 10px 12px;
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;