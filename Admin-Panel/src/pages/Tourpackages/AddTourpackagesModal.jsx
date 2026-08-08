import React, { useState } from 'react'
import AuthUser from '../../Auth/AuthUser'


const AddTourpackagesModal = ({ show, onClose, ontourpackagesAdded }) => {
    const { http } = AuthUser()

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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const resetAndClose = () => {
        setForm(initialForm)
        setErrors({})
        onClose()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setErrors({})

        await http.post('/tourpackage/store', form)
            .then(() => {
                setSubmitting(false)
                setForm(initialForm)
                if (ontourpackagesAdded) ontourpackagesAdded()
                onClose()
            })
            .catch((err) => {
                setSubmitting(false)
                console.log(err)
                console.log('Error in adding tourpackage')
                if (err?.response?.data?.errors) {
                    setErrors(err.response.data.errors)
                }
            })
    }

    if (!show) return null

    return (
        <>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">Add Tour Package</h5>
                            <button type="button" className="btn-close" onClick={resetAndClose}></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
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
                                        <input
                                            type="text"
                                            name="category"
                                            className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                                            value={form.category}
                                            onChange={handleChange}
                                        />
                                        {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Duration (Days)</label>
                                        <input
                                            type="number"
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
                                            type="text"
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
                                                id="is_featured"
                                                name="is_featured"
                                                checked={form.is_featured}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="is_featured">
                                                Featured
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="form-check form-switch mt-4">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="is_active"
                                                name="is_active"
                                                checked={form.is_active}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="is_active">
                                                Active
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-light" onClick={resetAndClose}>
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-attractive"
                                    disabled={submitting}
                                >
                                    {submitting ? 'Saving...' : 'Save Tour Package'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    )
}

export default AddTourpackagesModal
