import React from 'react'


const ViewBookingsModal = ({ show, onClose, bookings }) => {

    if (!show || !bookings) return null

    return (
        <>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">View Booking</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>

                        <div className="modal-body">
                            <div className="row g-3">

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Booking Reference</label>
                                    <p className="fw-semibold">{bookings.booking_reference || '-'}</p>
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label text-muted mb-1">Customer ID</label>
                                    <p className="fw-semibold">{bookings.customer_id ?? '-'}</p>
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label text-muted mb-1">Schedule ID</label>
                                    <p className="fw-semibold">{bookings.schedule_id ?? '-'}</p>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Total Travelers</label>
                                    <p className="fw-semibold">{bookings.number_of_travelers ?? '-'}</p>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Adults</label>
                                    <p className="fw-semibold">{bookings.number_of_adults ?? '-'}</p>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Children</label>
                                    <p className="fw-semibold">{bookings.number_of_children ?? '-'}</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Total Price</label>
                                    <p className="fw-semibold">{bookings.total_price || '-'}</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Discount Applied</label>
                                    <p className="fw-semibold">{bookings.discount_applied || '-'}</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Booking Status</label>
                                    <p>
                                        <span className={`badge text-capitalize ${bookings.booking_status === 'confirmed' ? 'bg-success' : bookings.booking_status === 'pending' ? 'bg-warning text-dark' : bookings.booking_status === 'cancelled' ? 'bg-danger' : 'bg-secondary'}`}>
                                            {bookings.booking_status || '-'}
                                        </span>
                                    </p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Payment Status</label>
                                    <p>
                                        <span className={`badge text-capitalize ${bookings.payment_status === 'paid' ? 'bg-success' : bookings.payment_status === 'pending' ? 'bg-warning text-dark' : bookings.payment_status === 'refunded' ? 'bg-secondary' : 'bg-danger'}`}>
                                            {bookings.payment_status || '-'}
                                        </span>
                                    </p>
                                </div>

                                <div className="col-12">
                                    <label className="form-label text-muted mb-1">Special Requests</label>
                                    <p style={{ whiteSpace: 'pre-line' }}>{bookings.special_requests || '-'}</p>
                                </div>

                                <div className="col-12">
                                    <label className="form-label text-muted mb-1">Cancellation Reason</label>
                                    <p style={{ whiteSpace: 'pre-line' }}>{bookings.cancellation_reason || '-'}</p>
                                </div>

                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" onClick={onClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    )
}

export default ViewBookingsModal