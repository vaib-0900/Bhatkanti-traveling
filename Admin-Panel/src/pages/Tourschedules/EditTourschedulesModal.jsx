import React, { useEffect, useState } from 'react'
import AuthUser from '../../Auth/AuthUser'


const EditTourschedulesModal = ({ show, onClose, tourschedule, onTourscheduleUpdated }) => {
    const { http } = AuthUser()

    const emptyForm = {
        package_id: '',
        departure_date: '',
        return_date: '',
        available_seats: '',
        total_seats: '',
        is_cancelled: false,
        price_override: '',
        notes: '',
        isactive: true
    }

    const [form, setForm] = useState(emptyForm)
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)

    // Prefill form whenever the modal opens with a tour schedule selected for editing
    useEffect(() => {
        if (show && tourschedule) {
            setForm({
                package_id: tourschedule.package_id || '',
                departure_date: tourschedule.departure_date || '',
                return_date: tourschedule.return_date || '',
                available_seats: tourschedule.available_seats || '',
                total_seats: tourschedule.total_seats || '',
                is_cancelled: !!tourschedule.is_cancelled,
                price_override: tourschedule.price_override || '',
                notes: tourschedule.notes || '',
                isactive: !!tourschedule.isactive
            })
            setErrors({})
        } else if (!show) {
            setForm(emptyForm)
        }
    }, [show, tourschedule])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const resetAndClose = () => {
        setErrors({})
        onClose()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!tourschedule) return

        setSubmitting(true)
        setErrors({})

        await http.put(`/tourschedule/update/${tourschedule.id}`, form)
            .then(() => {
                setSubmitting(false)
                if (onTourscheduleUpdated) onTourscheduleUpdated()
                onClose()
            })
            .catch((err) => {
                setSubmitting(false)
                console.log(err)
                console.log('Error in updating tourschedule')
                if (err?.response?.data?.errors) {
                    setErrors(err.response.data.errors)
                }
            })
    }

    if (!show || !tourschedule) return null

    return (
        <>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">Edit Tour Schedule</h5>
                            <button type="button" className="btn-close" onClick={resetAndClose}></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="row g-3">

                                    <div className="col-md-6">
                                        <label className="form-label">Package ID</label>
                                        <input
                                            type="text"
                                            name="package_id"
                                            className={`form-control ${errors.package_id ? 'is-invalid' : ''}`}
                                            value={form.package_id}
                                            onChange={handleChange}
                                        />
                                        {errors.package_id && <div className="invalid-feedback">{errors.package_id}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Total Seats</label>
                                        <input
                                            type="number"
                                            name="total_seats"
                                            className={`form-control ${errors.total_seats ? 'is-invalid' : ''}`}
                                            value={form.total_seats}
                                            onChange={handleChange}
                                        />
                                        {errors.total_seats && <div className="invalid-feedback">{errors.total_seats}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Departure Date</label>
                                        <input
                                            type="date"
                                            name="departure_date"
                                            className={`form-control ${errors.departure_date ? 'is-invalid' : ''}`}
                                            value={form.departure_date}
                                            onChange={handleChange}
                                        />
                                        {errors.departure_date && <div className="invalid-feedback">{errors.departure_date}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Return Date</label>
                                        <input
                                            type="date"
                                            name="return_date"
                                            className={`form-control ${errors.return_date ? 'is-invalid' : ''}`}
                                            value={form.return_date}
                                            onChange={handleChange}
                                        />
                                        {errors.return_date && <div className="invalid-feedback">{errors.return_date}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Available Seats</label>
                                        <input
                                            type="number"
                                            name="available_seats"
                                            className={`form-control ${errors.available_seats ? 'is-invalid' : ''}`}
                                            value={form.available_seats}
                                            onChange={handleChange}
                                        />
                                        {errors.available_seats && <div className="invalid-feedback">{errors.available_seats}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Price Override</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="price_override"
                                            className={`form-control ${errors.price_override ? 'is-invalid' : ''}`}
                                            value={form.price_override}
                                            onChange={handleChange}
                                        />
                                        {errors.price_override && <div className="invalid-feedback">{errors.price_override}</div>}
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Notes</label>
                                        <textarea
                                            name="notes"
                                            rows="3"
                                            className={`form-control ${errors.notes ? 'is-invalid' : ''}`}
                                            value={form.notes}
                                            onChange={handleChange}
                                        ></textarea>
                                        {errors.notes && <div className="invalid-feedback">{errors.notes}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-check form-switch mt-2">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="edit_is_cancelled"
                                                name="is_cancelled"
                                                checked={form.is_cancelled}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="edit_is_cancelled">
                                                Cancelled
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-check form-switch mt-2">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="edit_isactive"
                                                name="isactive"
                                                checked={form.isactive}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="edit_isactive">
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
                                    {submitting ? 'Updating...' : 'Update Tour Schedule'}
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

export default EditTourschedulesModal
