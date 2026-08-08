import React from 'react'


const ViewNotificationsModal = ({ show, onClose, notifications }) => {

    if (!show || !notifications) return null

    return (
        <>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">View Notification</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>

                        <div className="modal-body">
                            <div className="row g-3">

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Recipient Type</label>
                                    <p>
                                        <span className="badge bg-secondary text-capitalize">
                                            {notifications.recipient_type || '-'}
                                        </span>
                                    </p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Recipient ID Type</label>
                                    <p className="fw-semibold">{notifications.recipient_id_type || '-'}</p>
                                </div>

                                <div className="col-12">
                                    <label className="form-label text-muted mb-1">Subject</label>
                                    <p className="fw-semibold">{notifications.subject || '-'}</p>
                                </div>

                                <div className="col-12">
                                    <label className="form-label text-muted mb-1">Message</label>
                                    <p style={{ whiteSpace: 'pre-line' }}>{notifications.message || '-'}</p>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Sent Via</label>
                                    <p className="fw-semibold text-capitalize">{notifications.sent_via || '-'}</p>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Status</label>
                                    <p>
                                        <span className={`badge text-capitalize ${notifications.status === 'sent' ? 'bg-success' : notifications.status === 'pending' ? 'bg-warning text-dark' : notifications.status === 'failed' ? 'bg-danger' : 'bg-secondary'}`}>
                                            {notifications.status || '-'}
                                        </span>
                                    </p>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Read Status</label>
                                    <p>
                                        <span className={`badge ${notifications.is_read ? 'bg-success' : 'bg-secondary'}`}>
                                            {notifications.is_read ? 'Read' : 'Unread'}
                                        </span>
                                    </p>
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

export default ViewNotificationsModal