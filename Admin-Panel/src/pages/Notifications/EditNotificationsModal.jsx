import React, { useEffect, useState } from 'react'
import AuthUser from '../../Auth/AuthUser'


const EditNotificationsModal = ({ show, onClose, notification, onNotificationUpdated }) => {
    const { http } = AuthUser()

    const initialForm = {
        recipient_type: 'customer',
        recipient_id_type: '',
        subject: '',
        message: '',
        is_read: false,
        sent_via: 'email',
        status: 'pending'
    }

    const [form, setForm] = useState(initialForm)
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (notification) {
            setForm({
                ...initialForm,
                ...notification
            })
        }
    }, [notification])

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

        await http.put(`/notification/update/${notification.id}`, form)
            .then(() => {
                setSubmitting(false)
                if (onNotificationUpdated) onNotificationUpdated()
                onClose()
            })
            .catch((err) => {
                setSubmitting(false)
                console.log(err)
                console.log('Error in updating notification')
                if (err?.response?.data?.errors) {
                    setErrors(err.response.data.errors)
                }
            })
    }

    if (!show || !notification) return null

    return (
        <>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">Edit Notification</h5>
                            <button type="button" className="btn-close" onClick={resetAndClose}></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="row g-3">

                                    <div className="col-md-6">
                                        <label className="form-label">Recipient Type</label>
                                        <select
                                            name="recipient_type"
                                            className={`form-select ${errors.recipient_type ? 'is-invalid' : ''}`}
                                            value={form.recipient_type}
                                            onChange={handleChange}
                                        >
                                            <option value="customer">Customer</option>
                                            <option value="admin">Admin</option>
                                            <option value="staff">Staff</option>
                                        </select>
                                        {errors.recipient_type && <div className="invalid-feedback">{errors.recipient_type}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Recipient ID Type</label>
                                        <input
                                            type="text"
                                            name="recipient_id_type"
                                            className={`form-control ${errors.recipient_id_type ? 'is-invalid' : ''}`}
                                            value={form.recipient_id_type}
                                            onChange={handleChange}
                                        />
                                        {errors.recipient_id_type && <div className="invalid-feedback">{errors.recipient_id_type}</div>}
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                                            value={form.subject}
                                            onChange={handleChange}
                                        />
                                        {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Message</label>
                                        <textarea
                                            name="message"
                                            rows="4"
                                            className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                                            value={form.message}
                                            onChange={handleChange}
                                        ></textarea>
                                        {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label">Sent Via</label>
                                        <select
                                            name="sent_via"
                                            className={`form-select ${errors.sent_via ? 'is-invalid' : ''}`}
                                            value={form.sent_via}
                                            onChange={handleChange}
                                        >
                                            <option value="email">Email</option>
                                            <option value="sms">SMS</option>
                                            <option value="push">Push</option>
                                            <option value="in_app">In App</option>
                                        </select>
                                        {errors.sent_via && <div className="invalid-feedback">{errors.sent_via}</div>}
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label">Status</label>
                                        <select
                                            name="status"
                                            className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                                            value={form.status}
                                            onChange={handleChange}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="sent">Sent</option>
                                            <option value="failed">Failed</option>
                                        </select>
                                        {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-check form-switch mt-4">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="edit_is_read"
                                                name="is_read"
                                                checked={form.is_read}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="edit_is_read">
                                                Read
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
                                    {submitting ? 'Updating...' : 'Update Notification'}
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

export default EditNotificationsModal