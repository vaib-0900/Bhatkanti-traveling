import React, { useEffect, useState } from "react";
import AuthUser from "../../Auth/AuthUser";

const EditCustomersModal = ({
    show,
    onClose,
    customer,
    onCustomerUpdated,
}) => {
    const { http } = AuthUser();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        phone: "",
        date_of_birth: "",
        nationality: "",
        passport_number: "",
        address: "",
        emergency_contact_name: "",
        emergency_contact_phone: "",
        is_active: true,
        preferred_language: "",
        newsletter_subscription: false,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // ==============================
    // Load customer data
    // ==============================
    useEffect(() => {
        if (customer) {
            setFormData({
                email: customer.email || "",
                password: "",
                first_name: customer.first_name || "",
                last_name: customer.last_name || "",
                phone: customer.phone || "",
                date_of_birth: customer.date_of_birth || "",
                nationality: customer.nationality || "",
                passport_number: customer.passport_number || "",
                address: customer.address || "",
                emergency_contact_name:
                    customer.emergency_contact_name || "",
                emergency_contact_phone:
                    customer.emergency_contact_phone || "",
                is_active:
                    customer.is_active !== undefined
                        ? customer.is_active
                        : true,
                preferred_language:
                    customer.preferred_language || "",
                newsletter_subscription:
                    customer.newsletter_subscription || false,
            });

            setErrors({});
        }
    }, [customer]);

    // ==============================
    // Handle input
    // ==============================
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
            general: "",
        }));
    };

    // ==============================
    // Validation
    // ==============================
    const validate = () => {
        const newErrors = {};

        if (!formData.first_name.trim()) {
            newErrors.first_name = "First name is required";
        }

        if (!formData.last_name.trim()) {
            newErrors.last_name = "Last name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }

        // Password is optional on edit, only validate if provided
        if (formData.password && formData.password.length < 6) {
            newErrors.password =
                "Password must be at least 6 characters";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone is required";
        }

        if (!formData.date_of_birth) {
            newErrors.date_of_birth = "Date of birth is required";
        }

        if (!formData.nationality.trim()) {
            newErrors.nationality = "Nationality is required";
        }

        if (!formData.passport_number.trim()) {
            newErrors.passport_number = "Passport number is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // ==============================
    // Reset and close
    // ==============================
    const resetAndClose = () => {
        setErrors({});
        onClose();
    };

    // ==============================
    // Submit
    // ==============================
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!customer) {
            return;
        }

        if (!validate()) {
            return;
        }

        // Mongo ID
        const customerId = customer._id || customer.id;

        if (!customerId) {
            console.log("Customer ID not found:", customer);

            setErrors({
                general: "Customer ID not found.",
            });

            return;
        }

        setLoading(true);

        try {
            const payload = {
                _id: customerId,
                email: formData.email,
                first_name: formData.first_name,
                last_name: formData.last_name,
                phone: formData.phone,
                date_of_birth: formData.date_of_birth,
                nationality: formData.nationality,
                passport_number: formData.passport_number,
                address: formData.address,
                emergency_contact_name:
                    formData.emergency_contact_name,
                emergency_contact_phone:
                    formData.emergency_contact_phone,
                is_active: formData.is_active,
                preferred_language: formData.preferred_language,
                newsletter_subscription:
                    formData.newsletter_subscription,
            };

            // Only send password_hash if a new password was entered
            if (formData.password) {
                payload.password_hash = formData.password;
            }

            console.log("UPDATE PAYLOAD:", payload);

            const response = await http.put(
                "/customers/update",
                payload
            );

            console.log("CUSTOMER UPDATED:", response.data);

            alert("Customer updated successfully!");

            if (onCustomerUpdated) {
                onCustomerUpdated();
            }

            onClose();
        } catch (error) {
            console.log("UPDATE ERROR:", error);
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);

            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({
                    general:
                        error.response?.data?.message ||
                        "Unable to update customer.",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    if (!show || !customer) {
        return null;
    }

    return (
        <>
            <div
                className="modal fade show d-block"
                tabIndex="-1"
                style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    zIndex: 1055,
                }}
            >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">

                        {/* Header */}
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">
                                Edit Customer
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={resetAndClose}
                                disabled={loading}
                            ></button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>

                            <div className="modal-body">

                                {/* General Error */}
                                {errors.general && (
                                    <div className="alert alert-danger">
                                        {errors.general}
                                    </div>
                                )}

                                <div className="row g-3">

                                    {/* First Name */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            First Name
                                        </label>

                                        <input
                                            type="text"
                                            name="first_name"
                                            className={`form-control ${
                                                errors.first_name
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={formData.first_name}
                                            onChange={handleChange}
                                        />

                                        {errors.first_name && (
                                            <div className="invalid-feedback">
                                                {errors.first_name}
                                            </div>
                                        )}
                                    </div>

                                    {/* Last Name */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Last Name
                                        </label>

                                        <input
                                            type="text"
                                            name="last_name"
                                            className={`form-control ${
                                                errors.last_name
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={formData.last_name}
                                            onChange={handleChange}
                                        />

                                        {errors.last_name && (
                                            <div className="invalid-feedback">
                                                {errors.last_name}
                                            </div>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            className={`form-control ${
                                                errors.email
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={formData.email}
                                            onChange={handleChange}
                                        />

                                        {errors.email && (
                                            <div className="invalid-feedback">
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>

                                    {/* New Password */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            New Password
                                        </label>

                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Leave blank to keep current password"
                                            className={`form-control ${
                                                errors.password
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={formData.password}
                                            onChange={handleChange}
                                        />

                                        {errors.password && (
                                            <div className="invalid-feedback">
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Phone
                                        </label>

                                        <input
                                            type="text"
                                            name="phone"
                                            className={`form-control ${
                                                errors.phone
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />

                                        {errors.phone && (
                                            <div className="invalid-feedback">
                                                {errors.phone}
                                            </div>
                                        )}
                                    </div>

                                    {/* Date of Birth */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Date of Birth
                                        </label>

                                        <input
                                            type="date"
                                            name="date_of_birth"
                                            className={`form-control ${
                                                errors.date_of_birth
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={
                                                formData.date_of_birth || ""
                                            }
                                            onChange={handleChange}
                                        />

                                        {errors.date_of_birth && (
                                            <div className="invalid-feedback">
                                                {errors.date_of_birth}
                                            </div>
                                        )}
                                    </div>

                                    {/* Nationality */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Nationality
                                        </label>

                                        <input
                                            type="text"
                                            name="nationality"
                                            className={`form-control ${
                                                errors.nationality
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={formData.nationality}
                                            onChange={handleChange}
                                        />

                                        {errors.nationality && (
                                            <div className="invalid-feedback">
                                                {errors.nationality}
                                            </div>
                                        )}
                                    </div>

                                    {/* Passport Number */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Passport Number
                                        </label>

                                        <input
                                            type="text"
                                            name="passport_number"
                                            className={`form-control ${
                                                errors.passport_number
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={
                                                formData.passport_number
                                            }
                                            onChange={handleChange}
                                        />

                                        {errors.passport_number && (
                                            <div className="invalid-feedback">
                                                {errors.passport_number}
                                            </div>
                                        )}
                                    </div>

                                    {/* Address */}
                                    <div className="col-12">
                                        <label className="form-label">
                                            Address
                                        </label>

                                        <textarea
                                            name="address"
                                            rows="2"
                                            className={`form-control ${
                                                errors.address
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={formData.address}
                                            onChange={handleChange}
                                        ></textarea>

                                        {errors.address && (
                                            <div className="invalid-feedback">
                                                {errors.address}
                                            </div>
                                        )}
                                    </div>

                                    {/* Emergency Contact Name */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Emergency Contact Name
                                        </label>

                                        <input
                                            type="text"
                                            name="emergency_contact_name"
                                            className={`form-control ${
                                                errors.emergency_contact_name
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={
                                                formData.emergency_contact_name
                                            }
                                            onChange={handleChange}
                                        />

                                        {errors.emergency_contact_name && (
                                            <div className="invalid-feedback">
                                                {
                                                    errors.emergency_contact_name
                                                }
                                            </div>
                                        )}
                                    </div>

                                    {/* Emergency Contact Phone */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Emergency Contact Phone
                                        </label>

                                        <input
                                            type="text"
                                            name="emergency_contact_phone"
                                            className={`form-control ${
                                                errors.emergency_contact_phone
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={
                                                formData.emergency_contact_phone
                                            }
                                            onChange={handleChange}
                                        />

                                        {errors.emergency_contact_phone && (
                                            <div className="invalid-feedback">
                                                {
                                                    errors.emergency_contact_phone
                                                }
                                            </div>
                                        )}
                                    </div>

                                    {/* Preferred Language */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Preferred Language
                                        </label>

                                        <input
                                            type="text"
                                            name="preferred_language"
                                            className={`form-control ${
                                                errors.preferred_language
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={
                                                formData.preferred_language
                                            }
                                            onChange={handleChange}
                                        />

                                        {errors.preferred_language && (
                                            <div className="invalid-feedback">
                                                {errors.preferred_language}
                                            </div>
                                        )}
                                    </div>

                                    {/* Active */}
                                    <div className="col-md-3">
                                        <div className="form-check form-switch mt-4">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="edit_is_active"
                                                name="is_active"
                                                checked={formData.is_active}
                                                onChange={handleChange}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="edit_is_active"
                                            >
                                                Active
                                            </label>
                                        </div>
                                    </div>

                                    {/* Newsletter */}
                                    <div className="col-md-3">
                                        <div className="form-check form-switch mt-4">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="edit_newsletter_subscription"
                                                name="newsletter_subscription"
                                                checked={
                                                    formData.newsletter_subscription
                                                }
                                                onChange={handleChange}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="edit_newsletter_subscription"
                                            >
                                                Newsletter
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Footer */}
                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={resetAndClose}
                                    disabled={loading}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-attractive"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Updating..."
                                        : "Update Customer"}
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            </div>

            <div className="modal-backdrop fade show"></div>
        </>
    );
};

export default EditCustomersModal;