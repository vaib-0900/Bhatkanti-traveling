import React, { useEffect, useState } from 'react'
import AuthUser from '../../Auth/AuthUser'

const EditUserModal = ({ show, onClose, user, onUserUpdated  }) => {
    const { http } = AuthUser();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        full_name: '',
        role: '',
        isactive: true,
    });

    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fill the form whenever a different user is passed in
    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
                full_name: user.full_name || '',
                role: user.role || '',
                isactive: !!user.isactive,
            });
            setPreviewImage(
                user.profile_image ? `http://localhost:3000/media/${user.profile_image}` : null
            );
            setProfileImage(null);
            setErrors({});
        }
    }, [user]);

    if (!show) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.username.trim()) newErrors.username = 'Username is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.full_name.trim()) newErrors.full_name = 'Full name is required';
        if (!formData.role.trim()) newErrors.role = 'Role is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate() || !user) return;

        // TODO: once you confirm the real key from /user/list, drop this
        // fallback and just use user.<the_real_key> directly.
        const userId = user.id ?? user.user_id ?? user._id ?? user.userId;

        if (!userId) {
            console.log('No id field found on user object:', user);
            setErrors({ general: 'Could not determine user id — check console for the user object shape.' });
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = new FormData();

            payload.append('_id', userId);
            payload.append('username', formData.username);
            payload.append('email', formData.email);
            payload.append('full_name', formData.full_name);
            payload.append('role', formData.role);
            payload.append('isactive', formData.isactive);

            if (profileImage) {
                payload.append('image', profileImage);
            }

            await http.put('/user/update', payload);

            if (onUserUpdated) onUserUpdated();
            onClose();
        } catch (err) {
            console.log('UPDATE ERROR:', err);
            if (err?.response?.data?.errors) {
                setErrors(err.response.data.errors);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title">Edit User</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            ></button>
                        </div>

                        <div className="modal-body">

                            {/* Profile Image */}
                            <div className="text-center mb-3">
                                <img
                                    src={previewImage || 'https://via.placeholder.com/90?text=No+Image'}
                                    alt="profile"
                                    width="90"
                                    height="90"
                                    style={{ objectFit: 'cover', borderRadius: '50%' }}
                                />
                                <div className="mt-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="form-control form-control-sm"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    name="full_name"
                                    className={`form-control ${errors.full_name ? 'is-invalid' : ''}`}
                                    value={formData.full_name}
                                    onChange={handleChange}
                                />
                                {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Role</label>
                                <select
                                    name="role"
                                    className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="">Select role</option>
                                    <option value="admin">Admin</option>
                                    <option value="manager">Manager</option>
                                    <option value="agent">Agent</option>
                                </select>
                                {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                            </div>

                            <div className="form-check form-switch">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="isactive"
                                    name="isactive"
                                    checked={formData.isactive}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="isactive">
                                    Active
                                </label>
                            </div>

                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-attractive" disabled={isSubmitting}>
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;