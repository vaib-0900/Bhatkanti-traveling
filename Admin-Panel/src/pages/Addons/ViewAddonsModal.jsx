import React from 'react'


const ViewAddonsModal = ({ show, onClose, addons }) => {

    if (!show || !addons) return null

    return (
        <>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">View Addon</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>

                        <div className="modal-body">
                            <div className="row g-3">

                                <div className="col-12">
                                    <label className="form-label text-muted mb-1">Addon Name</label>
                                    <p className="fw-semibold">{addons.addon_name || '-'}</p>
                                </div>

                                <div className="col-12">
                                    <label className="form-label text-muted mb-1">Description</label>
                                    <p>{addons.description || '-'}</p>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Price</label>
                                    <p className="fw-semibold">{addons.price ?? '-'}</p>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Currency</label>
                                    <p className="fw-semibold">{addons.currency || '-'}</p>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Pricing Type</label>
                                    <p>
                                        <span className="badge bg-secondary">
                                            {addons.is_per_person ? 'Per Person' : 'Flat'}
                                        </span>
                                    </p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Status</label>
                                    <p>
                                        <span className={`badge ${addons.is_active ? 'bg-success' : 'bg-danger'}`}>
                                            {addons.is_active ? 'Active' : 'Inactive'}
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

export default ViewAddonsModal