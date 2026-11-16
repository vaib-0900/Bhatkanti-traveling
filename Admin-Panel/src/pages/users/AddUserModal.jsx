
import React, { useEffect, useState } from "react";
import AuthUser from "../../Auth/AuthUser";

const initialForm = {
    username: "",
    email: "",
    full_name: "",
    role: "",
    password: "",
    profile_image: null,
};

const AddUserModel = ({
    showModal,
    setShowModal,
    closeAddModal,
    isRefresh,
    setIsRefresh,
}) => {
    const { https } = AuthUser();

    const [userData, setUserData] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState("");

    useEffect(() => {
        if (!showModal) {
            setUserData(initialForm);
            setErrors({});
            setImagePreview("");
        }
    }, [showModal]);

    useEffect(() => {
        if (!userData.profile_image) {
            setImagePreview("");
            return;
        }

        const previewUrl = URL.createObjectURL(userData.profile_image);
        setImagePreview(previewUrl);

        return () => URL.revokeObjectURL(previewUrl);
    }, [userData.profile_image]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
            submit: "",
        }));
    };

    const handleClose = () => {
        if (loading) return;

        setUserData(initialForm);
        setErrors({});
        setImagePreview("");

        if (closeAddModal) {
            closeAddModal();
        } else {
            setShowModal(false);
        }
    };

    const handleSaveUser = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!userData.full_name.trim()) {
            newErrors.full_name = "Full name is required";
        }

        if (!userData.username.trim()) {
            newErrors.username = "Username is required";
        }

        if (!userData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email.trim())) {
            newErrors.email = "Enter a valid email address";
        }

        if (!userData.password) {
            newErrors.password = "Password is required";
        } else if (userData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!userData.role) {
            newErrors.role = "Please select a role";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true);
            setErrors({});

            const formData = new FormData();

            formData.append("username", userData.username.trim());
            formData.append("email", userData.email.trim());
            formData.append("full_name", userData.full_name.trim());
            formData.append("role", userData.role);
            formData.append("password", userData.password);

            if (userData.profile_image) {
                formData.append("image", userData.profile_image);
            }

            const response = await https.post("/user/store", formData);

            console.log("USER CREATED SUCCESSFULLY:", response.data);

            setUserData(initialForm);
            setErrors({});
            setImagePreview("");
            setShowModal(false);

            if (typeof setIsRefresh === "function") {
                setIsRefresh((prev) => prev + 1);
            }

            if (typeof closeAddModal === "function") {
                closeAddModal();
            }
        } catch (error) {
            console.error(
                "ADD USER ERROR:",
                error.response?.status,
                error.response?.data || error.message
            );

            const message =
                error.response?.data?.message ||
                "Unable to create user. Please try again.";

            if (message.toLowerCase().includes("username")) {
                setErrors({ username: message });
            } else if (message.toLowerCase().includes("email")) {
                setErrors({ email: message });
            } else {
                setErrors({ submit: message });
            }
        } finally {
            setLoading(false);
        }
    };

    if (!showModal) return null;

    return (
        <div
            className="modal fade show d-block"
            role="dialog"
            aria-modal="true"
            aria-labelledby="addUserTitle"
            style={{
                background: "rgba(15, 23, 42, 0.45)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                zIndex: 1055,
                overflowY: "auto",
            }}
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content border-0 rounded-4 shadow-lg">
                    {/* Header */}
                    <div
                        className="modal-header border-0 px-4 py-3 text-white"
                        style={{
                            background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                            borderTopLeftRadius: "1rem",
                            borderTopRightRadius: "1rem",
                        }}
                    >
                        <div>
                            <h4 id="addUserTitle" className="fw-bold mb-1">
                                Add New User
                            </h4>
                            <small className="text-white-50">
                                Create a new user account
                            </small>
                        </div>

                        <button
                            type="button"
                            className="btn btn-light rounded-circle"
                            onClick={handleClose}
                            disabled={loading}
                            aria-label="Close"
                            style={{ width: 40, height: 40 }}
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSaveUser}>
                        <div className="modal-body px-4 py-4">
                            {errors.submit && (
                                <div className="alert alert-danger">
                                    {errors.submit}
                                </div>
                            )}

                            {/* Profile Image */}
                            <div className="text-center mb-4">
                                <label
                                    htmlFor="profileImage"
                                    className="border border-2 border-dashed rounded-4 p-3 d-flex flex-column align-items-center justify-content-center mx-auto"
                                    style={{
                                        width: 160,
                                        height: 160,
                                        cursor: "pointer",
                                        background: "#F8FAFC",
                                        overflow: "hidden",
                                    }}
                                >
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Profile preview"
                                            className="w-100 h-100 rounded-3"
                                            style={{ objectFit: "cover" }}
                                        />
                                    ) : (
                                        <>
                                            <i
                                                className="bi bi-cloud-arrow-up"
                                                style={{
                                                    fontSize: 42,
                                                    color: "#4F46E5",
                                                }}
                                            ></i>
                                            <span className="fw-semibold mt-2">
                                                Upload Photo
                                            </span>
                                            <small className="text-muted">
                                                JPG, PNG, JPEG
                                            </small>
                                        </>
                                    )}
                                </label>

                                <input
                                    type="file"
                                    id="profileImage"
                                    className="d-none"
                                    accept="image/png,image/jpeg,image/jpg,image/webp"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0] || null;

                                        if (file && file.size > 5 * 1024 * 1024) {
                                            setErrors((prev) => ({
                                                ...prev,
                                                profile_image: "Image must be smaller than 5 MB",
                                            }));
                                            e.target.value = "";
                                            return;
                                        }

                                        setErrors((prev) => ({
                                            ...prev,
                                            profile_image: "",
                                        }));

                                        setUserData((prev) => ({
                                            ...prev,
                                            profile_image: file,
                                        }));
                                    }}
                                />

                                {errors.profile_image && (
                                    <div className="text-danger small mt-2">
                                        {errors.profile_image}
                                    </div>
                                )}
                            </div>

                            {/* User Information */}
                            <h5 className="fw-bold mb-3">
                                <i className="bi bi-person-lines-fill me-2 text-primary"></i>
                                User Information
                            </h5>

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        className={`form-control ${
                                            errors.full_name ? "is-invalid" : ""
                                        }`}
                                        placeholder="Enter full name"
                                        value={userData.full_name}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    {errors.full_name && (
                                        <div className="invalid-feedback">
                                            {errors.full_name}
                                        </div>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">
                                        Username *
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        className={`form-control ${
                                            errors.username ? "is-invalid" : ""
                                        }`}
                                        placeholder="Enter username"
                                        value={userData.username}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    {errors.username && (
                                        <div className="invalid-feedback">
                                            {errors.username}
                                        </div>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className={`form-control ${
                                            errors.email ? "is-invalid" : ""
                                        }`}
                                        placeholder="Enter email"
                                        value={userData.email}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    {errors.email && (
                                        <div className="invalid-feedback">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">
                                        Password *
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        autoComplete="new-password"
                                        className={`form-control ${
                                            errors.password ? "is-invalid" : ""
                                        }`}
                                        placeholder="Enter password"
                                        value={userData.password}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">
                                            {errors.password}
                                        </div>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">
                                        Role *
                                    </label>
                                    <select
                                        name="role"
                                        className={`form-select ${
                                            errors.role ? "is-invalid" : ""
                                        }`}
                                        value={userData.role}
                                        onChange={handleChange}
                                        disabled={loading}
                                    >
                                        <option value="">Select Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="manager">Manager</option>
                                        <option value="agent">Agent</option>
                                    </select>
                                    {errors.role && (
                                        <div className="invalid-feedback">
                                            {errors.role}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <small className="text-muted d-block mt-3">
                                Fields marked with * are required.
                            </small>
                        </div>

                        {/* Footer */}
                        <div className="modal-footer border-0 px-4 pb-4">
                            <button
                                type="button"
                                className="btn btn-outline-secondary px-4"
                                onClick={handleClose}
                                disabled={loading}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary px-4"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-person-plus me-2"></i>
                                        Add User
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUserModel;
