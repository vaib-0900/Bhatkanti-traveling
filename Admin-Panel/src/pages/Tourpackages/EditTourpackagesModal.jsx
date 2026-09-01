import React, { useEffect, useState } from 'react'
import AuthUser from '../../Auth/AuthUser'

const EditTourpackagesModal = ({ show, onClose, tourpackage, onTourpackageUpdated }) => {
    const { http } = AuthUser() // Changed from 'https' to 'http' to match first code

    const initialForm = {
        package_name: '',
        slug: '',
        description: '',
        destination: '',
        duration_days: '',
        duration_nights: '',
        base_price: '',
        discount_price: '',
        max_group_size: '',
        min_group_size: '',
        inclusions: '',
        exclusions: '',
        itinerary: '',
        gallery_images: '',
        featured_image: '',
        is_featured: false,
        is_active: true,
        status: 'draft',
        category: ''
    }

    const [form, setForm] = useState(initialForm)
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)

    // Prefill form whenever modal opens with tour package selected for editing
    useEffect(() => {
        if (show && tourpackage) {
            setForm({
                package_name: tourpackage.package_name || '',
                slug: tourpackage.slug || '',
                description: tourpackage.description || '',
                destination: tourpackage.destination || '',
                duration_days: tourpackage.duration_days || '',
                duration_nights: tourpackage.duration_nights || '',
                base_price: tourpackage.base_price || '',
                discount_price: tourpackage.discount_price || '',
                max_group_size: tourpackage.max_group_size || '',
                min_group_size: tourpackage.min_group_size || '',
                inclusions: tourpackage.inclusions || '',
                exclusions: tourpackage.exclusions || '',
                itinerary: tourpackage.itinerary || '',
                gallery_images: tourpackage.gallery_images || '',
                featured_image: tourpackage.featured_image || '',
                is_featured: !!tourpackage.is_featured,
                is_active: tourpackage.is_active !== undefined ? !!tourpackage.is_active : true,
                status: tourpackage.status || 'draft',
                category: tourpackage.category || ''
            })
            setErrors({})
        } else if (!show) {
            setForm(initialForm)
        }
    }, [show, tourpackage])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        // Clear error for this field
        setErrors((prev) => ({
            ...prev,
            [name]: ''
        }))
    }

    const resetAndClose = () => {
        setErrors({})
        setSubmitting(false)
        onClose()
    }

    // Validation function
    const validate = () => {
        const newErrors = {}

        if (!form.package_name.trim()) {
            newErrors.package_name = 'Package name is required'
        }

        if (!form.slug.trim()) {
            newErrors.slug = 'Slug is required'
        }

        if (!form.destination.trim()) {
            newErrors.destination = 'Destination is required'
        }

        if (!form.duration_days || Number(form.duration_days) <= 0) {
            newErrors.duration_days = 'Duration days must be greater than 0'
        }

        if (!form.duration_nights || Number(form.duration_nights) < 0) {
            newErrors.duration_nights = 'Duration nights must be 0 or greater'
        }

        if (!form.base_price || Number(form.base_price) < 0) {
            newErrors.base_price = 'Base price is required and must be greater than 0'
        }

        if (form.discount_price && Number(form.discount_price) > Number(form.base_price)) {
            newErrors.discount_price = 'Discount price cannot exceed base price'
        }

        if (!form.max_group_size || Number(form.max_group_size) <= 0) {
            newErrors.max_group_size = 'Max group size is required and must be greater than 0'
        }

        if (!form.min_group_size || Number(form.min_group_size) < 0) {
            newErrors.min_group_size = 'Min group size is required'
        }

        if (form.min_group_size && form.max_group_size && 
            Number(form.min_group_size) > Number(form.max_group_size)) {
            newErrors.min_group_size = 'Min group size cannot exceed max group size'
        }

        if (!form.category) {
            newErrors.category = 'Category is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Backend reads the id from req.body._id (see `updated` controller),
        // so the Mongo _id has to travel in the payload, not the URL.
        const tourpackageId = tourpackage?._id

        if (!tourpackage || !tourpackageId) {
            setErrors({
                general: 'No tour package selected to update.'
            })
            return
        }

        if (!validate()) {
            return
        }

        setSubmitting(true)

        try {
            const payload = {
                _id: tourpackageId,
                package_name: form.package_name,
                slug: form.slug,
                description: form.description,
                destination: form.destination,
                duration_days: Number(form.duration_days) || 0,
                duration_nights: Number(form.duration_nights) || 0,
                base_price: Number(form.base_price) || 0,
                discount_price: Number(form.discount_price) || 0,
                max_group_size: Number(form.max_group_size) || 0,
                min_group_size: Number(form.min_group_size) || 0,
                inclusions: form.inclusions || '',
                exclusions: form.exclusions || '',
                itinerary: form.itinerary || '',
                gallery_images: form.gallery_images || '',
                featured_image: form.featured_image || '',
                is_featured: Boolean(form.is_featured),
                is_active: Boolean(form.is_active),
                status: form.status || 'draft',
                category: form.category || ''
            }

            console.log("Sending update data:", payload);

            const res = await http.put("/tourpackages/update", payload)

            console.log("TOURPACKAGE UPDATE SUCCESS:", res.data)

            setErrors({})

            if (onTourpackageUpdated) {
                onTourpackageUpdated()
            }

            onClose()
        } catch (error) {
            console.log("TOURPACKAGE UPDATE ERROR:", error)
            console.log("STATUS:", error.response?.status)
            console.log("DATA:", error.response?.data)

            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors)
            } else {
                setErrors({
                    general: error.response?.data?.message || 
                            'Something went wrong while updating tour package'
                })
            }
        } finally {
            setSubmitting(false)
        }
    }

    if (!show || !tourpackage) {
        return null
    }

    return (
        <>
            <div
                className="modal fade show d-block"
                tabIndex="-1"
                role="dialog"
                style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                }}
            >
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content border-0 rounded-4 shadow-lg">

                        {/* Header */}
                        <div className="modal-header border-0 px-4 py-3" style={{ background: '#4F46E5' }}>
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <div>
                                    <h4 className="fw-bold mb-1 text-white">Edit Tour Package</h4>
                                    <small className="text-white-50">Update tour package details</small>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-light rounded-circle"
                                    onClick={resetAndClose}
                                    style={{ width: 40, height: 40 }}
                                >
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body px-4">

                                {errors.general && (
                                    <div className="alert alert-danger">{errors.general}</div>
                                )}

                                <div className="row g-3">

                                    <div className="col-md-6">
                                        <label className="form-label">Package Name</label>
                                        <input
                                            type="text"
                                            name="package_name"
                                            className={`form-control ${errors.package_name ? 'is-invalid' : ''}`}
                                            value={form.package_name}
                                            onChange={handleChange}
                                        />
                                        {errors.package_name && <div className="invalid-feedback">{errors.package_name}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Slug</label>
                                        <input
                                            type="text"
                                            name="slug"
                                            className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
                                            value={form.slug}
                                            onChange={handleChange}
                                        />
                                        {errors.slug && <div className="invalid-feedback">{errors.slug}</div>}
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            name="description"
                                            rows="3"
                                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                            value={form.description}
                                            onChange={handleChange}
                                        ></textarea>
                                        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Destination</label>
                                        <input
                                            type="text"
                                            name="destination"
                                            className={`form-control ${errors.destination ? 'is-invalid' : ''}`}
                                            value={form.destination}
                                            onChange={handleChange}
                                        />
                                        {errors.destination && <div className="invalid-feedback">{errors.destination}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Category</label>
                                        <select
                                            name="category"
                                            className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                                            value={form.category}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Category</option>
                                            <option value="adventure">Adventure</option>
                                            <option value="beach">Beach</option>
                                            <option value="hill-station">Hill Station</option>
                                            <option value="heritage">Heritage</option>
                                            <option value="wildlife">Wildlife</option>
                                            <option value="fort">Fort</option>
                                            <option value="religious">Religious</option>
                                            <option value="honeymoon">Honeymoon</option>
                                        </select>
                                        {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Duration (Days)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            name="duration_days"
                                            className={`form-control ${errors.duration_days ? 'is-invalid' : ''}`}
                                            value={form.duration_days}
                                            onChange={handleChange}
                                        />
                                        {errors.duration_days && <div className="invalid-feedback">{errors.duration_days}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Duration (Nights)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            name="duration_nights"
                                            className={`form-control ${errors.duration_nights ? 'is-invalid' : ''}`}
                                            value={form.duration_nights}
                                            onChange={handleChange}
                                        />
                                        {errors.duration_nights && <div className="invalid-feedback">{errors.duration_nights}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Base Price</label>
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            name="base_price"
                                            className={`form-control ${errors.base_price ? 'is-invalid' : ''}`}
                                            value={form.base_price}
                                            onChange={handleChange}
                                        />
                                        {errors.base_price && <div className="invalid-feedback">{errors.base_price}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Discount Price</label>
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            name="discount_price"
                                            className={`form-control ${errors.discount_price ? 'is-invalid' : ''}`}
                                            value={form.discount_price}
                                            onChange={handleChange}
                                        />
                                        {errors.discount_price && <div className="invalid-feedback">{errors.discount_price}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Min Group Size</label>
                                        <input
                                            type="number"
                                            min="0"
                                            name="min_group_size"
                                            className={`form-control ${errors.min_group_size ? 'is-invalid' : ''}`}
                                            value={form.min_group_size}
                                            onChange={handleChange}
                                        />
                                        {errors.min_group_size && <div className="invalid-feedback">{errors.min_group_size}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Max Group Size</label>
                                        <input
                                            type="number"
                                            min="0"
                                            name="max_group_size"
                                            className={`form-control ${errors.max_group_size ? 'is-invalid' : ''}`}
                                            value={form.max_group_size}
                                            onChange={handleChange}
                                        />
                                        {errors.max_group_size && <div className="invalid-feedback">{errors.max_group_size}</div>}
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Inclusions</label>
                                        <textarea
                                            name="inclusions"
                                            rows="2"
                                            className={`form-control ${errors.inclusions ? 'is-invalid' : ''}`}
                                            value={form.inclusions}
                                            onChange={handleChange}
                                        ></textarea>
                                        {errors.inclusions && <div className="invalid-feedback">{errors.inclusions}</div>}
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Exclusions</label>
                                        <textarea
                                            name="exclusions"
                                            rows="2"
                                            className={`form-control ${errors.exclusions ? 'is-invalid' : ''}`}
                                            value={form.exclusions}
                                            onChange={handleChange}
                                        ></textarea>
                                        {errors.exclusions && <div className="invalid-feedback">{errors.exclusions}</div>}
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Itinerary</label>
                                        <textarea
                                            name="itinerary"
                                            rows="3"
                                            className={`form-control ${errors.itinerary ? 'is-invalid' : ''}`}
                                            value={form.itinerary}
                                            onChange={handleChange}
                                        ></textarea>
                                        {errors.itinerary && <div className="invalid-feedback">{errors.itinerary}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Featured Image (URL)</label>
                                        <input
                                            type="text"
                                            name="featured_image"
                                            className={`form-control ${errors.featured_image ? 'is-invalid' : ''}`}
                                            value={form.featured_image}
                                            onChange={handleChange}
                                        />
                                        {errors.featured_image && <div className="invalid-feedback">{errors.featured_image}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Gallery Images</label>
                                        <input
                                            type="text"
                                            name="gallery_images"
                                            className={`form-control ${errors.gallery_images ? 'is-invalid' : ''}`}
                                            placeholder="comma separated URLs"
                                            value={form.gallery_images}
                                            onChange={handleChange}
                                        />
                                        {errors.gallery_images && <div className="invalid-feedback">{errors.gallery_images}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Status</label>
                                        <select
                                            name="status"
                                            className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                                            value={form.status}
                                            onChange={handleChange}
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                            <option value="archived">Archived</option>
                                        </select>
                                        {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                                    </div>

                                    <div className="col-md-3">
                                        <div className="form-check form-switch mt-4">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="edit_is_featured"
                                                name="is_featured"
                                                checked={form.is_featured}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="edit_is_featured">
                                                Featured
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="form-check form-switch mt-4">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="edit_is_active"
                                                name="is_active"
                                                checked={form.is_active}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="edit_is_active">
                                                Active
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="modal-footer border-0">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={resetAndClose}
                                    disabled={submitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary px-4"
                                    disabled={submitting}
                                >
                                    {submitting ? 'Updating...' : 'Update Tour Package'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditTourpackagesModal