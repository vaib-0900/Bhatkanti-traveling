import React, { useState } from 'react'
import AuthUser from '../../Auth/AuthUser'


const AddAddonsModal = ({ show, onClose, onaddonsAdded }) => {
    const { http } = AuthUser()

    const initialForm = {
        addon_name: '',
        description: '',
        price: '',
        currency: '',
        is_per_person: true,
        is_active: true
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

        await http.post('/addon/store', form)
            .then(() => {
                setSubmitting(false)
                setForm(initialForm)
                if (onaddonsAdded) onaddonsAdded()
                onClose()
            })
            .catch((err) => {
                setSubmitting(false)
                console.log(err)
                console.log('Error in adding addon')
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
                            <h5 className="modal-title fw-bold">Add Addon</h5>
                            <button type="button" className="btn-close" onClick={resetAndClose}></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="row g-3">

                                    <div className="col-md-8">
                                        <label className="form-label">Addon Name</label>
                                        <input
                                            type="text"
                                            name="addon_name"
                                            className={`form-control ${errors.addon_name ? 'is-invalid' : ''}`}
                                            value={form.addon_name}
                                            onChange={handleChange}
                                        />
                                        {errors.addon_name && <div className="invalid-feedback">{errors.addon_name}</div>}
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
                                        <label className="form-label">Price</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="price"
                                            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                            value={form.price}
                                            onChange={handleChange}
                                        />
                                        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Currency</label>
                                        <input
                                            type="text"
                                            name="currency"
                                            className={`form-control ${errors.currency ? 'is-invalid' : ''}`}
                                            value={form.currency}
                                            onChange={handleChange}
                                        />
                                        {errors.currency && <div className="invalid-feedback">{errors.currency}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-check form-switch mt-2">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="is_per_person"
                                                name="is_per_person"
                                                checked={form.is_per_person}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="is_per_person">
                                                Per Person Pricing
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-check form-switch mt-2">
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
                                    {submitting ? 'Saving...' : 'Save Addon'}
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

export default AddAddonsModal