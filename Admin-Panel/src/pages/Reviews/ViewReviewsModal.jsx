import React from 'react'


const ViewReviewsModal = ({ show, onClose, reviews }) => {

    if (!show || !reviews) return null

    const ratingValue = Number(reviews.rating) || 0
    const fullStars = Math.round(ratingValue)

    return (
        <>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">View Review</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>

                        <div className="modal-body">
                            <div className="row g-3">

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Booking ID</label>
                                    <p className="fw-semibold">{reviews.booking_id ?? '-'}</p>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Customer ID</label>
                                    <p className="fw-semibold">{reviews.customer_id ?? '-'}</p>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Package ID</label>
                                    <p className="fw-semibold">{reviews.package_id ?? '-'}</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Rating</label>
                                    <p className="fw-semibold">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <i
                                                key={star}
                                                className="fa fa-star me-1"
                                                style={{ color: star <= fullStars ? '#ffc107' : '#e0e0e0' }}
                                            ></i>
                                        ))}
                                        <span className="ms-2">{reviews.rating ?? '-'}</span>
                                    </p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Status</label>
                                    <p>
                                        <span className={`badge ${reviews.is_approved ? 'bg-success' : 'bg-secondary'}`}>
                                            {reviews.is_approved ? 'Approved' : 'Pending'}
                                        </span>
                                    </p>
                                </div>

                                <div className="col-12">
                                    <label className="form-label text-muted mb-1">Title</label>
                                    <p className="fw-semibold">{reviews.title || '-'}</p>
                                </div>

                                <div className="col-12">
                                    <label className="form-label text-muted mb-1">Comment</label>
                                    <p style={{ whiteSpace: 'pre-line' }}>{reviews.comment || '-'}</p>
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

export default ViewReviewsModal