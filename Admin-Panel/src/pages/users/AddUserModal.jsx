import React, { useRef, useState } from 'react'
import AuthUser from '../../Auth/AuthUser'


const AddUserModal = ({ show, onClose, onUserAdded }) => {
  const { http } = AuthUser()
  const fileInputRef = useRef(null)

  const initialFormData = {
    username: '',
    email: '',
    full_name: '',
    role: '',
    password: '',
    profile_image: null,
  }

  const [formData, setFormData] = useState(initialFormData)
  const [previewImage, setPreviewImage] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({ ...prev, profile_image: file }))
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setPreviewImage(null)
    setErrors({})
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    const payload = new FormData()
    payload.append('username', formData.username)
    payload.append('email', formData.email)
    payload.append('full_name', formData.full_name)
    payload.append('role', formData.role)
    payload.append('password', formData.password)
    if (formData.profile_image) {
      payload.append('profile_image', formData.profile_image)
    }

    await http
      .post('/user/store', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        setLoading(false)
        resetForm()
        if (onUserAdded) onUserAdded(res.data)
        onClose()
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
        console.log('Error adding user')
        if (err?.response?.data?.errors) {
          setErrors(err.response.data.errors)
        }
      })
  }

  if (!show) return null

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
          className="modal-dialog modal-dialog-centered"
          role="document"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="fas fa-user-plus me-2"></i>
                  Add User
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    className={`form-control ${errors.full_name ? 'is-invalid' : ''}`}
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                  {errors.full_name && (
                    <div className="invalid-feedback">{errors.full_name}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
                    name="role"
                    className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select role</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="user">User</option>
                  </select>
                  {errors.role && (
                    <div className="invalid-feedback">{errors.role}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Profile Image</label>
                  <input
                    type="file"
                    name="profile_image"
                    accept="image/*"
                    ref={fileInputRef}
                    className={`form-control ${errors.profile_image ? 'is-invalid' : ''}`}
                    onChange={handleImageChange}
                  />
                  {errors.profile_image && (
                    <div className="invalid-feedback">{errors.profile_image}</div>
                  )}
                  {previewImage && (
                    <div className="mt-2">
                      <img
                        src={previewImage}
                        alt="Preview"
                        style={{
                          width: '70px',
                          height: '70px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          border: '1px solid #ddd',
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-attractive"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddUserModal