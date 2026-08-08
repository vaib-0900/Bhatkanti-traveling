import React, { useState } from 'react'
import AuthUser from '../../Auth/AuthUser'


const AddBookingaddonsModal = ({ show, onClose, onbookingaddonsAdded }) => {
    const { http } = AuthUser()

    const initialForm = {
        booking_id: '',
        addon_id: '',
        quantity: '',
        price_at_time: ''
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

        await http.post('/bookingaddon/store', form)
            .then(() => {
                setSubmitting(false)
                setForm(initialForm)
                if (onbookingaddonsAdded) onbookingaddonsAdded()
                onClose()
            })
            .catch((err) => {
                setSubmitting(false)
                console.log(err)
                console.log('Error in adding booking addon')
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
                            <h5 className="modal-title fw-bold">Add Booking Addon</h5>
                            <button type="button" className="btn-close" onClick={resetAndClose}></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="row g-3">

                                    <div className="col-md-6">
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

                                    <div className="col-md-6">
                                        <label className="form-label">Addon ID</label>
                                        <input
                                            type="number"
                                            name="addon_id"
                                            className={`form-control ${errors.addon_id ? 'is-invalid' : ''}`}
                                            value={form.addon_id}
                                            onChange={handleChange}
                                        />
                                        {errors.addon_id && <div className="invalid-feedback">{errors.addon_id}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Quantity</label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                                            value={form.quantity}
                                            onChange={handleChange}
                                        />
                                        {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Price at Time</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="price_at_time"
                                            className={`form-control ${errors.price_at_time ? 'is-invalid' : ''}`}
                                            value={form.price_at_time}
                                            onChange={handleChange}
                                        />
                                        {errors.price_at_time && <div className="invalid-feedback">{errors.price_at_time}</div>}
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
                                    {submitting ? 'Saving...' : 'Save Booking Addon'}
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

export default AddBookingaddonsModal