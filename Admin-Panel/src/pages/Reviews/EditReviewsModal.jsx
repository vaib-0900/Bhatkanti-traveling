import React, { useEffect, useState } from 'react'
import AuthUser from '../../Auth/AuthUser'


const EditReviewsModal = ({ show, onClose, review, onReviewUpdated }) => {
    const { http } = AuthUser()

    const initialForm = {
        booking_id: '',
        customer_id: '',
        package_id: '',
        rating: '',
        title: '',
        comment: '',
        is_approved: false
    }

    const [form, setForm] = useState(initialForm)
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (review) {
            setForm({
                ...initialForm,
                ...review
            })
        }
    }, [review])

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

        await http.put(`/review/update/${review.booking_id}`, form)
            .then(() => {
                setSubmitting(false)
                if (onReviewUpdated) onReviewUpdated()
                onClose()
            })
            .catch((err) => {
                setSubmitting(false)
                console.log(err)
                console.log('Error in updating review')
                if (err?.response?.data?.errors) {
                    setErrors(err.response.data.errors)
                }
            })
    }

    if (!show || !review) return null

    return (
        <>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">Edit Review</h5>
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

                                    <div className="col-md-4">
                                        <label className="form-label">Package ID</label>
                                        <input
                                            type="number"
                                            name="package_id"
                                            className={`form-control ${errors.package_id ? 'is-invalid' : ''}`}
                                            value={form.package_id}
                                            onChange={handleChange}
                                        />
                                        {errors.package_id && <div className="invalid-feedback">{errors.package_id}</div>}
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label">Rating</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            name="rating"
                                            className={`form-control ${errors.rating ? 'is-invalid' : ''}`}
                                            value={form.rating}
                                            onChange={handleChange}
                                        />
                                        {errors.rating && <div className="invalid-feedback">{errors.rating}</div>}
                                    </div>

                                    <div className="col-md-8">
                                        <label className="form-label">Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                            value={form.title}
                                            onChange={handleChange}
                                        />
                                        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Comment</label>
                                        <textarea
                                            name="comment"
                                            rows="4"
                                            className={`form-control ${errors.comment ? 'is-invalid' : ''}`}
                                            value={form.comment}
                                            onChange={handleChange}
                                        ></textarea>
                                        {errors.comment && <div className="invalid-feedback">{errors.comment}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-check form-switch mt-2">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="edit_is_approved"
                                                name="is_approved"
                                                checked={form.is_approved}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="edit_is_approved">
                                                Approved
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
                                    {submitting ? 'Updating...' : 'Update Review'}
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

export default EditReviewsModal