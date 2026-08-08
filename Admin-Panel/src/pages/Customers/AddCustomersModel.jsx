import React, { useState } from 'react'
import AuthUser from '../../Auth/AuthUser'


const AddCustomersModal = ({ show, onClose, oncustomersAdded }) => {
    const { http } = AuthUser()

    const initialForm = {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone: '',
        date_of_birth: '',
        nationality: '',
        passport_number: '',
        address: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
        is_active: true,
        preferred_language: '',
        newsletter_subscription: false
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

        await http.post('/customer/store', form)
            .then(() => {
                setSubmitting(false)
                setForm(initialForm)
                if (oncustomersAdded) oncustomersAdded()
                onClose()
            })
            .catch((err) => {
                setSubmitting(false)
                console.log(err)
                console.log('Error in adding customer')
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
                            <h5 className="modal-title fw-bold">Add Customer</h5>
                            <button type="button" className="btn-close" onClick={resetAndClose}></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="row g-3">

                                    <div className="col-md-6">
                                        <label className="form-label">First Name</label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
                                            value={form.first_name}
                                            onChange={handleChange}
                                        />
                                        {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Last Name</label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
                                            value={form.last_name}
                                            onChange={handleChange}
                                        />
                                        {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            value={form.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            value={form.password}
                                            onChange={handleChange}
                                        />
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Phone</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                            value={form.phone}
                                            onChange={handleChange}
                                        />
                                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Date of Birth</label>
                                        <input
                                            type="date"
                                            name="date_of_birth"
                                            className={`form-control ${errors.date_of_birth ? 'is-invalid' : ''}`}
                                            value={form.date_of_birth}
                                            onChange={handleChange}
                                        />
                                        {errors.date_of_birth && <div className="invalid-feedback">{errors.date_of_birth}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Nationality</label>
                                        <input
                                            type="text"
                                            name="nationality"
                                            className={`form-control ${errors.nationality ? 'is-invalid' : ''}`}
                                            value={form.nationality}
                                            onChange={handleChange}
                                        />
                                        {errors.nationality && <div className="invalid-feedback">{errors.nationality}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Passport Number</label>
                                        <input
                                            type="text"
                                            name="passport_number"
                                            className={`form-control ${errors.passport_number ? 'is-invalid' : ''}`}
                                            value={form.passport_number}
                                            onChange={handleChange}
                                        />
                                        {errors.passport_number && <div className="invalid-feedback">{errors.passport_number}</div>}
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Address</label>
                                        <textarea
                                            name="address"
                                            rows="2"
                                            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                            value={form.address}
                                            onChange={handleChange}
                                        ></textarea>
                                        {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Emergency Contact Name</label>
                                        <input
                                            type="text"
                                            name="emergency_contact_name"
                                            className={`form-control ${errors.emergency_contact_name ? 'is-invalid' : ''}`}
                                            value={form.emergency_contact_name}
                                            onChange={handleChange}
                                        />
                                        {errors.emergency_contact_name && <div className="invalid-feedback">{errors.emergency_contact_name}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Emergency Contact Phone</label>
                                        <input
                                            type="text"
                                            name="emergency_contact_phone"
                                            className={`form-control ${errors.emergency_contact_phone ? 'is-invalid' : ''}`}
                                            value={form.emergency_contact_phone}
                                            onChange={handleChange}
                                        />
                                        {errors.emergency_contact_phone && <div className="invalid-feedback">{errors.emergency_contact_phone}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Preferred Language</label>
                                        <input
                                            type="text"
                                            name="preferred_language"
                                            className={`form-control ${errors.preferred_language ? 'is-invalid' : ''}`}
                                            value={form.preferred_language}
                                            onChange={handleChange}
                                        />
                                        {errors.preferred_language && <div className="invalid-feedback">{errors.preferred_language}</div>}
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

                                    <div className="col-md-3">
                                        <div className="form-check form-switch mt-4">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="newsletter_subscription"
                                                name="newsletter_subscription"
                                                checked={form.newsletter_subscription}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="newsletter_subscription">
                                                Newsletter
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
                                    {submitting ? 'Saving...' : 'Save Customer'}
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

export default AddCustomersModal