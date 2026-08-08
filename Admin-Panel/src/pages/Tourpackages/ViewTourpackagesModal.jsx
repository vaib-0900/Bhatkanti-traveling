import React from 'react'


const ViewTourpackagesModal = ({ show, onClose, tourpackages }) => {

    if (!show || !tourpackages) return null

    const galleryList = tourpackages.gallery_images
        ? tourpackages.gallery_images.split(',').map((img) => img.trim()).filter(Boolean)
        : []

    return (
        <>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">View Tour Package</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>

                        <div className="modal-body">

                            {tourpackages.featured_image && (
                                <div className="text-center mb-4">
                                    <img
                                        src={tourpackages.featured_image}
                                        alt={tourpackages.package_name}
                                        style={{ maxHeight: '220px', borderRadius: '10px', objectFit: 'cover' }}
                                    />
                                </div>
                            )}

                            <div className="row g-3">

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Package Name</label>
                                    <p className="fw-semibold">{tourpackages.package_name || '-'}</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Slug</label>
                                    <p className="fw-semibold">{tourpackages.slug || '-'}</p>
                                </div>

                                <div className="col-12">
                                    <label className="form-label text-muted mb-1">Description</label>
                                    <p>{tourpackages.description || '-'}</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Destination</label>
                                    <p className="fw-semibold">{tourpackages.destination || '-'}</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Category</label>
                                    <p>
                                        <span className="badge bg-secondary text-capitalize">
                                            {tourpackages.category || '-'}
                                        </span>
                                    </p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Duration</label>
                                    <p className="fw-semibold">
                                        {tourpackages.duration_days || 0} Days / {tourpackages.duration_nights || 0} Nights
                                    </p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Group Size</label>
                                    <p className="fw-semibold">
                                        {tourpackages.min_group_size || '-'} - {tourpackages.max_group_size || '-'}
                                    </p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Base Price</label>
                                    <p className="fw-semibold">{tourpackages.base_price || '-'}</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-muted mb-1">Discount Price</label>
                                    <p className="fw-semibold">{tourpackages.discount_price || '-'}</p>
                                </div>

                                <div className="col-12">
                                    <label className="form-label text-muted mb-1">Inclusions</label>
                                    <p>{tourpackages.inclusions || '-'}</p>
                                </div>

                                <div className="col-12">
                                    <label className="form-label text-muted mb-1">Exclusions</label>
                                    <p>{tourpackages.exclusions || '-'}</p>
                                </div>

                                <div className="col-12">
                                    <label className="form-label text-muted mb-1">Itinerary</label>
                                    <p style={{ whiteSpace: 'pre-line' }}>{tourpackages.itinerary || '-'}</p>
                                </div>

                                {galleryList.length > 0 && (
                                    <div className="col-12">
                                        <label className="form-label text-muted mb-2">Gallery Images</label>
                                        <div className="d-flex flex-wrap gap-2">
                                            {galleryList.map((img, idx) => (
                                                <img
                                                    key={idx}
                                                    src={img}
                                                    alt={`gallery-${idx}`}
                                                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Status</label>
                                    <p>
                                        <span className={`badge text-capitalize ${tourpackages.status === 'published' ? 'bg-success' : tourpackages.status === 'draft' ? 'bg-warning text-dark' : 'bg-secondary'}`}>
                                            {tourpackages.status || '-'}
                                        </span>
                                    </p>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Featured</label>
                                    <p>
                                        <span className={`badge ${tourpackages.is_featured ? 'bg-success' : 'bg-secondary'}`}>
                                            {tourpackages.is_featured ? 'Yes' : 'No'}
                                        </span>
                                    </p>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-muted mb-1">Active</label>
                                    <p>
                                        <span className={`badge ${tourpackages.is_active ? 'bg-success' : 'bg-danger'}`}>
                                            {tourpackages.is_active ? 'Active' : 'Inactive'}
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

export default ViewTourpackagesModal