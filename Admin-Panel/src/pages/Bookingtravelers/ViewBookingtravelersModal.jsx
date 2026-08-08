import React from 'react'


const ViewBookingtravelersModal = ({ show, onClose, bookingtravelers }) => {

    if (!show || !bookingtravelers) return null

    return (
        <>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">View Booking Traveler</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>

                        <div className="modal-body">
                            <div className="row g-3">

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Booking ID</label>
                                    <p className="fw-semibold">{bookingtravelers.booking_id ?? '-'}</p>
                                </div>

                                <div className="col-md-8">
                                    <label className="form-label text-muted mb-1">Full Name</label>
                                    <p className="fw-semibold">{bookingtravelers.first_name} {bookingtravelers.last_name}</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Date of Birth</label>
                                    <p className="fw-semibold">{bookingtravelers.date_of_birth || '-'}</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Gender</label>
                                    <p className="fw-semibold text-capitalize">{bookingtravelers.gender || '-'}</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Passport Number</label>
                                    <p className="fw-semibold">{bookingtravelers.passport_number || '-'}</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Passport Expiry</label>
                                    <p className="fw-semibold">{bookingtravelers.passport_expiry || '-'}</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Nationality</label>
                                    <p className="fw-semibold text-capitalize">{bookingtravelers.nationality || '-'}</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Traveler Type</label>
                                    <p>
                                        <span className={`badge ${bookingtravelers.is_primary ? 'bg-success' : 'bg-secondary'}`}>
                                            {bookingtravelers.is_primary ? 'Primary' : 'Companion'}
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

export default ViewBookingtravelersModal