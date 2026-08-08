import React, { useEffect, useState } from 'react'
import AuthUser from '../../Auth/AuthUser'


const EditBookingsModal = ({ show, onClose, booking, onBookingUpdated }) => {
    const { http } = AuthUser()

    const initialForm = {
        booking_reference: '',
        customer_id: '',
        schedule_id: '',
        number_of_travelers: '',
        number_of_adults: '',
        number_of_children: '',
        total_price: '',
        discount_applied: '',
        booking_status: 'pending',
        payment_status: 'pending',
        special_requests: '',
        cancellation_reason: ''
    }

    const [form, setForm] = useState(initialForm)
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (booking) {
            setForm({
                ...initialForm,
                ...booking
            })
        }
    }, [booking])

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
        setSubmitting(true)
        setErrors({})

        await http.put(`/booking/update/${booking.id}`, form)
            .then(() => {
                setSubmitting(false)
                if (onBookingUpdated) onBookingUpdated()
                onClose()
            })
            .catch((err) => {
                setSubmitting(false)
                console.log(err)
                console.log('Error in updating booking')
                if (err?.response?.data?.errors) {
                    setErrors(err.response.data.errors)
                }
            })
    }

    if (!show || !booking) return null

    return (
        <>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">Edit Booking</h5>
                            <button type="button" className="btn-close" onClick={resetAndClose}></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="row g-3">

                                    <div className="col-md-6">
                                        <label className="form-label">Booking Reference</label>
                                        <input
                                            type="text"
                                            name="booking_reference"
                                            className={`form-control ${errors.booking_reference ? 'is-invalid' : ''}`}
                                            value={form.booking_reference}
                                            onChange={handleChange}
                                        />
                                        {errors.booking_reference && <div className="invalid-feedback">{errors.booking_reference}</div>}
                                    </div>

                                    <div className="col-md-3">
                                        <label className="form-label">Customer ID</label>
                                        <input
                                            type="number"
                                            name="customer_id"
                                            className={`form-control ${errors.customer_id ? 'is-invalid' : ''}`}
                                            value={form.customer_id}
                                            onChange={handleChange}
                                        />
                                        {errors.customer_id && <div className="invalid-feedback">{errors.customer_id}</div>}
                                    </div>

                                    <div className="col-md-3">
                                        <label className="form-label">Schedule ID</label>
                                        <input
                                            type="number"
                                            name="schedule_id"
                                            className={`form-control ${errors.schedule_id ? 'is-invalid' : ''}`}
                                            value={form.schedule_id}
                                            onChange={handleChange}
                                        />
                                        {errors.schedule_id && <div className="invalid-feedback">{errors.schedule_id}</div>}
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label">Number of Travelers</label>
                                        <input
                                            type="number"
                                            name="number_of_travelers"
                                            className={`form-control ${errors.number_of_travelers ? 'is-invalid' : ''}`}
                                            value={form.number_of_travelers}
                                            onChange={handleChange}
                                        />
                                        {errors.number_of_travelers && <div className="invalid-feedback">{errors.number_of_travelers}</div>}
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label">Number of Adults</label>
                                        <input
                                            type="number"
                                            name="number_of_adults"
                                            className={`form-control ${errors.number_of_adults ? 'is-invalid' : ''}`}
                                            value={form.number_of_adults}
                                            onChange={handleChange}
                                        />
                                        {errors.number_of_adults && <div className="invalid-feedback">{errors.number_of_adults}</div>}
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label">Number of Children</label>
                                        <input
                                            type="number"
                                            name="number_of_children"
                                            className={`form-control ${errors.number_of_children ? 'is-invalid' : ''}`}
                                            value={form.number_of_children}
                                            onChange={handleChange}
                                        />
                                        {errors.number_of_children && <div className="invalid-feedback">{errors.number_of_children}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Total Price</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="total_price"
                                            className={`form-control ${errors.total_price ? 'is-invalid' : ''}`}
                                            value={form.total_price}
                                            onChange={handleChange}
                                        />
                                        {errors.total_price && <div className="invalid-feedback">{errors.total_price}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Discount Applied</label>
                                        <input
                                            type="text"
                                            name="discount_applied"
                                            className={`form-control ${errors.discount_applied ? 'is-invalid' : ''}`}
                                            value={form.discount_applied}
                                            onChange={handleChange}
                                        />
                                        {errors.discount_applied && <div className="invalid-feedback">{errors.discount_applied}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Booking Status</label>
                                        <select
                                            name="booking_status"
                                            className={`form-select ${errors.booking_status ? 'is-invalid' : ''}`}
                                            value={form.booking_status}
                                            onChange={handleChange}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="cancelled">Cancelled</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                        {errors.booking_status && <div className="invalid-feedback">{errors.booking_status}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Payment Status</label>
                                        <select
                                            name="payment_status"
                                            className={`form-select ${errors.payment_status ? 'is-invalid' : ''}`}
                                            value={form.payment_status}
                                            onChange={handleChange}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="paid">Paid</option>
                                            <option value="refunded">Refunded</option>
                                            <option value="failed">Failed</option>
                                        </select>
                                        {errors.payment_status && <div className="invalid-feedback">{errors.payment_status}</div>}
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Special Requests</label>
                                        <textarea
                                            name="special_requests"
                                            rows="3"
                                            className={`form-control ${errors.special_requests ? 'is-invalid' : ''}`}
                                            value={form.special_requests}
                                            onChange={handleChange}
                                        ></textarea>
                                        {errors.special_requests && <div className="invalid-feedback">{errors.special_requests}</div>}
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Cancellation Reason</label>
                                        <textarea
                                            name="cancellation_reason"
                                            rows="2"
                                            className={`form-control ${errors.cancellation_reason ? 'is-invalid' : ''}`}
                                            value={form.cancellation_reason}
                                            onChange={handleChange}
                                        ></textarea>
                                        {errors.cancellation_reason && <div className="invalid-feedback">{errors.cancellation_reason}</div>}
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
                                    {submitting ? 'Updating...' : 'Update Booking'}
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

export default EditBookingsModal