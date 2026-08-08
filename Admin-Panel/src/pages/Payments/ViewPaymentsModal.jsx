import React from 'react'


const ViewPaymentsModal = ({ show, onClose, payments }) => {

    if (!show || !payments) return null

    return (
        <>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">View Payment</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>

                        <div className="modal-body">
                            <div className="row g-3">

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Booking ID</label>
                                    <p className="fw-semibold">{payments.booking_id ?? '-'}</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Payment Reference</label>
                                    <p className="fw-semibold">{payments.payment_reference || '-'}</p>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Amount</label>
                                    <p className="fw-semibold">{payments.amount || '-'}</p>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Currency</label>
                                    <p className="fw-semibold">{payments.currency || '-'}</p>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Payment Method</label>
                                    <p>
                                        <span className="badge bg-secondary text-capitalize">
                                            {payments.payment_method || '-'}
                                        </span>
                                    </p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Transaction ID</label>
                                    <p className="fw-semibold">{payments.transaction_id || '-'}</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Processed By</label>
                                    <p className="fw-semibold">{payments.processed_by ?? '-'}</p>
                                </div>

                                <div className="col-12">
                                    <label className="form-label text-muted mb-1">Refund Reason</label>
                                    <p style={{ whiteSpace: 'pre-line' }}>{payments.refund_reason || '-'}</p>
                                </div>

                                <div className="col-12">
                                    <label className="form-label text-muted mb-1">Notes</label>
                                    <p style={{ whiteSpace: 'pre-line' }}>{payments.notes || '-'}</p>
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

export default ViewPaymentsModal