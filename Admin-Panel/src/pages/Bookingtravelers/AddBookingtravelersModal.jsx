import React, { useState } from 'react'
import AuthUser from '../../Auth/AuthUser'


const AddBookingtravelersModal = ({ show, onClose, onbookingtravelersAdded }) => {
    const { http } = AuthUser()

    const initialForm = {
        booking_id: '',
        first_name: '',
        last_name: '',
        date_of_birth: '',
        passport_number: '',
        passport_expiry: '',
        gender: 'male',
        nationality: '',
        is_primary: false
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

        await http.post('/bookingtraveler/store', form)
            .then(() => {
                setSubmitting(false)
                setForm(initialForm)
                if (onbookingtravelersAdded) onbookingtravelersAdded()
                onClose()
            })
            .catch((err) => {
                setSubmitting(false)
                console.log(err)
                console.log('Error in adding booking traveler')
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
                            <h5 className="modal-title fw-bold">Add Booking Traveler</h5>
                            <button type="button" className="btn-close" onClick={resetAndClose}></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="row g-3">

                                    <div className="col-md-4">
                                        <label className="form-label">Booking ID</label>
                                        <input
                                            type="number"
                                            name="booking_id"
                                            className={`form-control ${errors.booking_id ? 'is-invalid' : ''}`}
                                            value={form.booking_id}
                                            onChange={handleChange}
                                        />
                                        {errors.booking_id && <div className="invalid-feedback">{errors.booking_id}</div>}
                                    </div>

                                    <div className="col-md-4">
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

                                    <div className="col-md-4">
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
                                        <label className="form-label">Gender</label>
                                        <select
                                            name="gender"
                                            className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                                            value={form.gender}
                                            onChange={handleChange}
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                        {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
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

                                    <div className="col-md-6">
                                        <label className="form-label">Passport Expiry</label>
                                        <input
                                            type="date"
                                            name="passport_expiry"
                                            className={`form-control ${errors.passport_expiry ? 'is-invalid' : ''}`}
                                            value={form.passport_expiry}
                                            onChange={handleChange}
                                        />
                                        {errors.passport_expiry && <div className="invalid-feedback">{errors.passport_expiry}</div>}
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
                                        <div className="form-check form-switch mt-4">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="is_primary"
                                                name="is_primary"
                                                checked={form.is_primary}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="is_primary">
                                                Primary Traveler
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
                                    {submitting ? 'Saving...' : 'Save Traveler'}
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

export default AddBookingtravelersModal