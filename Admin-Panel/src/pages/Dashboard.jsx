import React, { useEffect, useState } from 'react'
import AuthUser from '../Auth/AuthUser'


const Dashboard = () => {
    const { http } = AuthUser()

    const [loading, setLoading] = useState(true)
    const [bookings, setBookings] = useState([])
    const [customers, setCustomers] = useState([])
    const [payments, setPayments] = useState([])
    const [packages, setPackages] = useState([])
    const [reviews, setReviews] = useState([])

    const getDashboardData = async () => {
        setLoading(true)
        await Promise.all([
            http.get('/booking/list').then((res) => setBookings(res.data || [])).catch(() => setBookings([])),
            http.get('/customer/list').then((res) => setCustomers(res.data || [])).catch(() => setCustomers([])),
            http.get('/payment/list').then((res) => setPayments(res.data || [])).catch(() => setPayments([])),
            http.get('/tourpackage/list').then((res) => setPackages(res.data || [])).catch(() => setPackages([])),
            http.get('/review/list').then((res) => setReviews(res.data || [])).catch(() => setReviews([]))
        ]).finally(() => setLoading(false))
    }

    useEffect(() => {
        getDashboardData()
    }, [])

    // ---- Derived stats ----
    const totalBookings = bookings.length
    const totalCustomers = customers.length
    const activePackages = packages.filter((p) => p.is_active).length
    const totalRevenue = payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0)
    const pendingPayments = payments.filter((p) => p.payment_status === 'pending' || p.status === 'pending').length
    const avgRating = reviews.length
        ? (reviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) / reviews.length).toFixed(1)
        : '0.0'

    const bookingStatusCounts = ['pending', 'confirmed', 'completed', 'cancelled'].map((status) => ({
        status,
        count: bookings.filter((b) => b.booking_status === status).length
    }))
    const maxBookingStatusCount = Math.max(1, ...bookingStatusCounts.map((s) => s.count))

    const paymentStatusCounts = ['pending', 'paid', 'refunded', 'failed'].map((status) => ({
        status,
        count: payments.filter((p) => p.payment_status === status).length
    }))
    const maxPaymentStatusCount = Math.max(1, ...paymentStatusCounts.map((s) => s.count))

    const recentBookings = [...bookings]
        .sort((a, b) => (b.booking_id || 0) - (a.booking_id || 0))
        .slice(0, 5)

    const recentReviews = [...reviews]
        .sort((a, b) => (b.booking_id || 0) - (a.booking_id || 0))
        .slice(0, 4)

    const statusColor = (status) => {
        switch (status) {
            case 'confirmed':
            case 'completed':
            case 'paid':
                return '#22c55e'
            case 'pending':
                return '#f7971e'
            case 'cancelled':
            case 'failed':
                return '#f5576c'
            case 'refunded':
                return '#8a8f98'
            default:
                return '#4facfe'
        }
    }

    return (
        <>
            {/* Breadcrumb */}
            <div className="page-header">
                <h3 className="fw-bold">Dashboard</h3>
                <p className="text-muted mb-0">Overview of bookings, customers, and revenue</p>
            </div>

            {loading ? (
                <div className="text-center py-5 text-muted">Loading dashboard...</div>
            ) : (
                <>
                    {/* KPI Cards */}
                    <div className="row g-3 mb-4">

                        <div className="col-6 col-md-4 col-xl-2">
                            <div className="kpi-card" style={{ '--kpi-from': '#667eea', '--kpi-to': '#764ba2' }}>
                                <i className="fa fa-calendar-check kpi-icon"></i>
                                <div className="kpi-value">{totalBookings}</div>
                                <div className="kpi-label">Total Bookings</div>
                            </div>
                        </div>

                        <div className="col-6 col-md-4 col-xl-2">
                            <div className="kpi-card" style={{ '--kpi-from': '#4facfe', '--kpi-to': '#00f2fe' }}>
                                <i className="fa fa-users kpi-icon"></i>
                                <div className="kpi-value">{totalCustomers}</div>
                                <div className="kpi-label">Customers</div>
                            </div>
                        </div>

                        <div className="col-6 col-md-4 col-xl-2">
                            <div className="kpi-card" style={{ '--kpi-from': '#43e97b', '--kpi-to': '#38f9d7' }}>
                                <i className="fa fa-rupee-sign kpi-icon"></i>
                                <div className="kpi-value">{totalRevenue.toLocaleString()}</div>
                                <div className="kpi-label">Total Revenue</div>
                            </div>
                        </div>

                        <div className="col-6 col-md-4 col-xl-2">
                            <div className="kpi-card" style={{ '--kpi-from': '#f7971e', '--kpi-to': '#ffd200' }}>
                                <i className="fa fa-hourglass-half kpi-icon"></i>
                                <div className="kpi-value">{pendingPayments}</div>
                                <div className="kpi-label">Pending Payments</div>
                            </div>
                        </div>

                        <div className="col-6 col-md-4 col-xl-2">
                            <div className="kpi-card" style={{ '--kpi-from': '#f093fb', '--kpi-to': '#f5576c' }}>
                                <i className="fa fa-map-marked-alt kpi-icon"></i>
                                <div className="kpi-value">{activePackages}</div>
                                <div className="kpi-label">Active Packages</div>
                            </div>
                        </div>

                        <div className="col-6 col-md-4 col-xl-2">
                            <div className="kpi-card" style={{ '--kpi-from': '#fa709a', '--kpi-to': '#fee140' }}>
                                <i className="fa fa-star kpi-icon"></i>
                                <div className="kpi-value">{avgRating}</div>
                                <div className="kpi-label">Avg. Rating</div>
                            </div>
                        </div>

                    </div>

                    <div className="row g-3 mb-4">

                        {/* Booking Status Breakdown */}
                        <div className="col-md-6">
                            <div className="card shadow-sm h-100">
                                <div className="card-header bg-white">
                                    <h6 className="fw-bold mb-0">Booking Status</h6>
                                </div>
                                <div className="card-body">
                                    {bookingStatusCounts.map((item) => (
                                        <div key={item.status} className="mb-3">
                                            <div className="d-flex justify-content-between mb-1">
                                                <span className="text-capitalize small fw-semibold">{item.status}</span>
                                                <span className="text-muted small">{item.count}</span>
                                            </div>
                                            <div className="bar-track">
                                                <div
                                                    className="bar-fill"
                                                    style={{
                                                        width: `${(item.count / maxBookingStatusCount) * 100}%`,
                                                        background: statusColor(item.status)
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Payment Status Breakdown */}
                        <div className="col-md-6">
                            <div className="card shadow-sm h-100">
                                <div className="card-header bg-white">
                                    <h6 className="fw-bold mb-0">Payment Status</h6>
                                </div>
                                <div className="card-body">
                                    {paymentStatusCounts.map((item) => (
                                        <div key={item.status} className="mb-3">
                                            <div className="d-flex justify-content-between mb-1">
                                                <span className="text-capitalize small fw-semibold">{item.status}</span>
                                                <span className="text-muted small">{item.count}</span>
                                            </div>
                                            <div className="bar-track">
                                                <div
                                                    className="bar-fill"
                                                    style={{
                                                        width: `${(item.count / maxPaymentStatusCount) * 100}%`,
                                                        background: statusColor(item.status)
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row g-3">

                        {/* Recent Bookings */}
                        <div className="col-md-7">
                            <div className="card shadow-sm h-100">
                                <div className="card-header bg-white">
                                    <h6 className="fw-bold mb-0">Recent Bookings</h6>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Reference</th>
                                                <th>Customer</th>
                                                <th>Travelers</th>
                                                <th>Total</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentBookings.length === 0 && (
                                                <tr>
                                                    <td colSpan="5" className="text-center text-muted py-4">No bookings yet</td>
                                                </tr>
                                            )}
                                            {recentBookings.map((b, key) => (
                                                <tr key={key}>
                                                    <td>{b.booking_reference}</td>
                                                    <td>{b.customer_id}</td>
                                                    <td>{b.number_of_travelers}</td>
                                                    <td>{b.total_price}</td>
                                                    <td>
                                                        <span
                                                            className="badge text-capitalize"
                                                            style={{ background: statusColor(b.booking_status) }}
                                                        >
                                                            {b.booking_status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Recent Reviews */}
                        <div className="col-md-5">
                            <div className="card shadow-sm h-100">
                                <div className="card-header bg-white">
                                    <h6 className="fw-bold mb-0">Recent Reviews</h6>
                                </div>
                                <div className="card-body">
                                    {recentReviews.length === 0 && (
                                        <div className="text-center text-muted py-4">No reviews yet</div>
                                    )}
                                    {recentReviews.map((r, key) => (
                                        <div key={key} className={key !== recentReviews.length - 1 ? 'pb-3 mb-3 border-bottom' : ''}>
                                            <div className="d-flex justify-content-between align-items-start">
                                                <span className="fw-semibold">{r.title}</span>
                                                <span className="text-warning small">
                                                    <i className="fa fa-star me-1"></i>{r.rating}
                                                </span>
                                            </div>
                                            <p className="text-muted small mb-0">{r.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </>
            )}

            <style jsx>{`
.kpi-card {
  position: relative;
  border-radius: 16px;
  padding: 18px 16px;
  color: white;
  background: linear-gradient(135deg, var(--kpi-from) 0%, var(--kpi-to) 100%);
  box-shadow: 0 6px 20px rgba(0,0,0,0.12);
  min-height: 118px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.kpi-icon {
  font-size: 1.1rem;
  opacity: 0.85;
}

.kpi-value {
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.1;
  margin-top: 8px;
}

.kpi-label {
  font-size: 0.78rem;
  opacity: 0.9;
  margin-top: 2px;
}

.bar-track {
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: #eef0f3;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.4s ease;
}
    `}</style>
        </>
    )
}

export default Dashboard