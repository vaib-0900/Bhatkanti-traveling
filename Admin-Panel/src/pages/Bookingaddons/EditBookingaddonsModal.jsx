import React, { useEffect, useState } from 'react'
import AuthUser from '../../Auth/AuthUser'

const EditBookingaddonsModal = ({ show, onClose, bookingaddon, onBookingaddonUpdated }) => {
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

    // Load only the relevant fields (not the whole object) into the form
    useEffect(() => {
        if (bookingaddon) {
            setForm({
                booking_id: bookingaddon.booking_id ?? '',
                addon_id: bookingaddon.addon_id ?? '',
                quantity: bookingaddon.quantity ?? '',
                price_at_time: bookingaddon.price_at_time ?? ''
            })
            setErrors({})
        }
    }, [bookingaddon])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        // clear that field's error as user types
        setErrors((prev) => ({
            ...prev,
            [name]: ''
        }))
    }

    const resetForm = () => {
        setForm(initialForm)
        setErrors({})
    }

    const resetAndClose = () => {
        resetForm()
        onClose()
    }

    // Basic client-side validation before hitting the API
    const validate = () => {
        const newErrors = {}

        if (!form.booking_id) newErrors.booking_id = 'Booking ID is required'
        if (!form.addon_id) newErrors.addon_id = 'Addon ID is required'

        if (!form.quantity) {
            newErrors.quantity = 'Quantity is required'
        } else if (Number(form.quantity) <= 0) {
            newErrors.quantity = 'Quantity must be greater than 0'
        }

        if (form.price_at_time === '' || form.price_at_time === null) {
            newErrors.price_at_time = 'Price at time is required'
        } else if (Number(form.price_at_time) < 0) {
            newErrors.price_at_time = 'Price cannot be negative'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!bookingaddon?.booking_addon_id) {
            setErrors({ general: 'Booking addon ID is missing' })
            return
        }

        if (!validate()) return

        setSubmitting(true)
        setErrors({})

        const payload = {
            booking_id: Number(form.booking_id),
            addon_id: Number(form.addon_id),
            quantity: Number(form.quantity),
            price_at_time: Number(form.price_at_time)
        }

        try {
            // Route must match the backend exactly (singular "bookingaddon")
            await http.put(`/bookingaddons/update/${bookingaddon.booking_addon_id}`, payload)

            if (onBookingaddonUpdated) onBookingaddonUpdated()

            resetForm()
            onClose()
        } catch (err) {
            console.log('Error in updating booking addon:', err)
            console.log('STATUS:', err?.response?.status)
            console.log('DATA:', err?.response?.data)

            if (err?.response?.data?.errors) {
                setErrors(err.response.data.errors)
            } else {
                setErrors({
                    general: err?.response?.data?.message || 'Something went wrong while updating booking addon'
                })
            }
        } finally {
            setSubmitting(false)
        }
    }

    if (!show || !bookingaddon) return null

    return (
        <>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">Edit Booking Addon</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={resetAndClose}
                                disabled={submitting}
                            ></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">

                                {errors.general && (
                                    <div className="alert alert-danger">{errors.general}</div>
                                )}

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
                                            min="1"
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
                                            min="0"
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
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={resetAndClose}
                                    disabled={submitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-attractive"
                                    disabled={submitting}
                                >
                                    {submitting ? 'Updating...' : 'Update Booking Addon'}
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

export default EditBookingaddonsModal