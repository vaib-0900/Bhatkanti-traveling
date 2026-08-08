import React, { useEffect, useState } from 'react'
import AuthUser from '../../Auth/AuthUser'

const EditUserModal = ({ show, onClose, user, onUserUpdated }) => {
    const { http } = AuthUser()

    const emptyForm = {
        username: '',
        email: '',
        full_name: '',
        role: '',
        profile_image: '',
        isactive: true
    }

    const [form, setForm] = useState(emptyForm)
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)

    // Prefill form whenever a new user is selected for editing
    useEffect(() => {
        if (user) {
            setForm({
                username: user.username || '',
                email: user.email || '',
                full_name: user.full_name || '',
                role: user.role || '',
                profile_image: user.profile_image || '',
                isactive: !!user.isactive
            })
            setErrors({})
        }
    }, [user])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleClose = () => {
        setErrors({})
        onClose()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) return

        setSubmitting(true)
        setErrors({})

        await http.put(`/user/update/${user.id}`, form)
            .then(() => {
                setSubmitting(false)
                if (onUserUpdated) onUserUpdated()
                onClose()
            })
            .catch((err) => {
                setSubmitting(false)
                console.log(err)
                console.log('Error in updating user')
                if (err?.response?.data?.errors) {
                    setErrors(err.response.data.errors)
                }
            })
    }

    if (!show || !user) return null

    return (
        <>
            {/* Backdrop */}
            <div className="modal-backdrop fade show"></div>

            {/* Modal */}
            <div
                className="modal fade show"
                style={{ display: 'block' }}
                tabIndex="-1"
                role="dialog"
                onClick={handleClose}
            >
                <div
                    className="modal-dialog modal-dialog-centered modal-lg"
                    role="document"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                <i className="fas fa-user-edit me-2"></i>
                                Edit User
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleClose}
                            ></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="row g-3">

                                    <div className="col-md-6">
                                        <label className="form-label">Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                            value={form.username}
                                            onChange={handleChange}
                                        />
                                        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
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
                                        <label className="form-label">Full Name</label>
                                        <input
                                            type="text"
                                            name="full_name"
                                            className={`form-control ${errors.full_name ? 'is-invalid' : ''}`}
                                            value={form.full_name}
                                            onChange={handleChange}
                                        />
                                        {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Role</label>
                                        <select
                                            name="role"
                                            className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                                            value={form.role}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select role</option>
                                            <option value="admin">Admin</option>
                                            <option value="manager">Manager</option>
                                            <option value="user">User</option>
                                        </select>
                                        {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                                    </div>

                                    <div className="col-md-8">
                                        <label className="form-label">Profile Image URL</label>
                                        <input
                                            type="text"
                                            name="profile_image"
                                            className={`form-control ${errors.profile_image ? 'is-invalid' : ''}`}
                                            value={form.profile_image}
                                            onChange={handleChange}
                                        />
                                        {errors.profile_image && <div className="invalid-feedback">{errors.profile_image}</div>}
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label d-block">Status</label>
                                        <div className="form-check form-switch mt-2">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="isactive"
                                                name="isactive"
                                                checked={form.isactive}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="isactive">
                                                {form.isactive ? 'Active' : 'Inactive'}
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-attractive"
                                    disabled={submitting}
                                >
                                    {submitting ? 'Updating...' : 'Update User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditUserModal
