import React from 'react'


const ViewBookingaddonsModal = ({ show, onClose, bookingaddons }) => {

    if (!show || !bookingaddons) return null

    const total = (Number(bookingaddons.quantity) || 0) * (Number(bookingaddons.price_at_time) || 0)

    return (
        <>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">View Booking Addon</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>

                        <div className="modal-body">
                            <div className="row g-3">

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Booking Addon ID</label>
                                    <p className="fw-semibold">{bookingaddons.booking_addon_id ?? '-'}</p>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Booking ID</label>
                                    <p className="fw-semibold">{bookingaddons.booking_id ?? '-'}</p>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Addon ID</label>
                                    <p className="fw-semibold">{bookingaddons.addon_id ?? '-'}</p>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Quantity</label>
                                    <p className="fw-semibold">{bookingaddons.quantity ?? '-'}</p>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Price at Time</label>
                                    <p className="fw-semibold">{bookingaddons.price_at_time ?? '-'}</p>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Total</label>
                                    <p className="fw-semibold">{total}</p>
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

export default ViewBookingaddonsModal