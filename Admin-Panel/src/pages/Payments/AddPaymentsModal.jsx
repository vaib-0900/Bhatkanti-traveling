import React, { useState } from 'react'
import AuthUser from '../../Auth/AuthUser'


const AddPaymentsModal = ({ show, onClose, onpaymentsAdded }) => {
    const { http } = AuthUser()

    const initialForm = {
        booking_id: '',
        payment_reference: '',
        amount: '',
        currency: '',
        payment_method: '',
        transaction_id: '',
        refund_reason: '',
        notes: '',
        processed_by: ''
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

        await http.post('/payment/store', form)
            .then(() => {
                setSubmitting(false)
                setForm(initialForm)
                if (onpaymentsAdded) onpaymentsAdded()
                onClose()
            })
            .catch((err) => {
                setSubmitting(false)
                console.log(err)
                console.log('Error in adding payment')
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
                            <h5 className="modal-title fw-bold">Add Payment</h5>
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
                                        <label className="form-label">Payment Reference</label>
                                        <input
                                            type="text"
                                            name="payment_reference"
                                            className={`form-control ${errors.payment_reference ? 'is-invalid' : ''}`}
                                            value={form.payment_reference}
                                            onChange={handleChange}
                                        />
                                        {errors.payment_reference && <div className="invalid-feedback">{errors.payment_reference}</div>}
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label">Amount</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="amount"
                                            className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                                            value={form.amount}
                                            onChange={handleChange}
                                        />
                                        {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
                                    </div>

                                    <div className="col-md-4">
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

                                    <div className="col-md-4">
                                        <label className="form-label">Payment Method</label>
                                        <input
                                            type="text"
                                            name="payment_method"
                                            className={`form-control ${errors.payment_method ? 'is-invalid' : ''}`}
                                            value={form.payment_method}
                                            onChange={handleChange}
                                        />
                                        {errors.payment_method && <div className="invalid-feedback">{errors.payment_method}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Transaction ID</label>
                                        <input
                                            type="text"
                                            name="transaction_id"
                                            className={`form-control ${errors.transaction_id ? 'is-invalid' : ''}`}
                                            value={form.transaction_id}
                                            onChange={handleChange}
                                        />
                                        {errors.transaction_id && <div className="invalid-feedback">{errors.transaction_id}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Processed By</label>
                                        <input
                                            type="number"
                                            name="processed_by"
                                            className={`form-control ${errors.processed_by ? 'is-invalid' : ''}`}
                                            value={form.processed_by}
                                            onChange={handleChange}
                                        />
                                        {errors.processed_by && <div className="invalid-feedback">{errors.processed_by}</div>}
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Refund Reason</label>
                                        <textarea
                                            name="refund_reason"
                                            rows="2"
                                            className={`form-control ${errors.refund_reason ? 'is-invalid' : ''}`}
                                            value={form.refund_reason}
                                            onChange={handleChange}
                                        ></textarea>
                                        {errors.refund_reason && <div className="invalid-feedback">{errors.refund_reason}</div>}
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
                                    {submitting ? 'Saving...' : 'Save Payment'}
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

export default AddPaymentsModal