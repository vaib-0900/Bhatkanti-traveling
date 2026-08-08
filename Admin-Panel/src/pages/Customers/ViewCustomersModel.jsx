import React from 'react'


const ViewCustomersModal = ({ show, onClose, customers }) => {

    if (!show || !customers) return null

    return (
        <>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">View Customer</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>

                        <div className="modal-body">
                            <div className="row g-3">

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Full Name</label>
                                    <p className="fw-semibold">{customers.first_name} {customers.last_name}</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Email</label>
                                    <p className="fw-semibold">{customers.email || '-'}</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Phone</label>
                                    <p className="fw-semibold">{customers.phone || '-'}</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Date of Birth</label>
                                    <p className="fw-semibold">{customers.date_of_birth || '-'}</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Nationality</label>
                                    <p className="fw-semibold text-capitalize">{customers.nationality || '-'}</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Passport Number</label>
                                    <p className="fw-semibold">{customers.passport_number || '-'}</p>
                                </div>

                                <div className="col-12">
                                    <label className="form-label text-muted mb-1">Address</label>
                                    <p>{customers.address || '-'}</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Emergency Contact Name</label>
                                    <p className="fw-semibold">{customers.emergency_contact_name || '-'}</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Emergency Contact Phone</label>
                                    <p className="fw-semibold">{customers.emergency_contact_phone || '-'}</p>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Preferred Language</label>
                                    <p className="fw-semibold">{customers.preferred_language || '-'}</p>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Newsletter</label>
                                    <p>
                                        <span className={`badge ${customers.newsletter_subscription ? 'bg-success' : 'bg-secondary'}`}>
                                            {customers.newsletter_subscription ? 'Subscribed' : 'Not Subscribed'}
                                        </span>
                                    </p>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Status</label>
                                    <p>
                                        <span className={`badge ${customers.is_active ? 'bg-success' : 'bg-danger'}`}>
                                            {customers.is_active ? 'Active' : 'Inactive'}
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

export default ViewCustomersModal