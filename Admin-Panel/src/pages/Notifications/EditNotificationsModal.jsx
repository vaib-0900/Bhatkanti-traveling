import React, { useEffect, useState } from "react";
import AuthUser from "../../Auth/AuthUser";

const EditNotificationsModal = ({
    show,
    onClose,
    notification,
    onNotificationUpdated,
}) => {
    const { http } = AuthUser();

    const [formData, setFormData] = useState({
        recipient_type: "customer",
        recipient_id_type: "booking_confirmation",
        subject: "",
        message: "",
        is_read: false,
        sent_via: "email",
        status: "pending",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // ==============================
    // Load notification data
    // ==============================
    useEffect(() => {
        if (notification) {
            setFormData({
                recipient_type:
                    notification.recipient_type || "customer",
                recipient_id_type:
                    notification.recipient_id_type ||
                    "booking_confirmation",
                subject: notification.subject || "",
                message: notification.message || "",
                is_read: notification.is_read || false,
                sent_via: notification.sent_via || "email",
                status: notification.status || "pending",
            });

            setErrors({});
        }
    }, [notification]);

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

        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
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

        if (!notification) {
            return;
        }

        if (!validate()) {
            return;
        }

        // Mongo ID
        const notificationId = notification._id || notification.id;

        if (!notificationId) {
            console.log("Notification ID not found:", notification);

            setErrors({
                general: "Notification ID not found.",
            });

            return;
        }

        setLoading(true);

        try {
            const payload = {
                _id: notificationId,
                recipient_type: formData.recipient_type,
                recipient_id_type: formData.recipient_id_type,
                subject: formData.subject,
                message: formData.message,
                is_read: formData.is_read,
                sent_via: formData.sent_via,
                status: formData.status,
            };

            console.log("UPDATE PAYLOAD:", payload);

            const response = await http.put(
                "/notifications/update",
                payload
            );

            console.log("NOTIFICATION UPDATED:", response.data);

            alert("Notification updated successfully!");

            if (onNotificationUpdated) {
                onNotificationUpdated();
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
                        "Unable to update notification.",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    if (!show || !notification) {
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
                                Edit Notification
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

                                    {/* Recipient Type */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Recipient Type
                                        </label>

                                        <select
                                            name="recipient_type"
                                            className={`form-select ${
                                                errors.recipient_type
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={formData.recipient_type}
                                            onChange={handleChange}
                                        >
                                            <option value="customer">
                                                Customer
                                            </option>

                                            <option value="admin">
                                                Admin
                                            </option>

                                            <option value="all">
                                                All
                                            </option>
                                        </select>

                                        {errors.recipient_type && (
                                            <div className="invalid-feedback">
                                                {errors.recipient_type}
                                            </div>
                                        )}
                                    </div>

                                    {/* Recipient ID Type */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Notification Type
                                        </label>

                                        <select
                                            name="recipient_id_type"
                                            className={`form-select ${
                                                errors.recipient_id_type
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={
                                                formData.recipient_id_type
                                            }
                                            onChange={handleChange}
                                        >
                                            <option value="booking_confirmation">
                                                Booking Confirmation
                                            </option>

                                            <option value="payment_received">
                                                Payment Received
                                            </option>

                                            <option value="reminder">
                                                Reminder
                                            </option>

                                            <option value="cancellation">
                                                Cancellation
                                            </option>

                                            <option value="promotion">
                                                Promotion
                                            </option>
                                        </select>

                                        {errors.recipient_id_type && (
                                            <div className="invalid-feedback">
                                                {errors.recipient_id_type}
                                            </div>
                                        )}
                                    </div>

                                    {/* Subject */}
                                    <div className="col-12">
                                        <label className="form-label">
                                            Subject
                                        </label>

                                        <input
                                            type="text"
                                            name="subject"
                                            className={`form-control ${
                                                errors.subject
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />

                                        {errors.subject && (
                                            <div className="invalid-feedback">
                                                {errors.subject}
                                            </div>
                                        )}
                                    </div>

                                    {/* Message */}
                                    <div className="col-12">
                                        <label className="form-label">
                                            Message
                                        </label>

                                        <textarea
                                            name="message"
                                            rows="4"
                                            className={`form-control ${
                                                errors.message
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={formData.message}
                                            onChange={handleChange}
                                        ></textarea>

                                        {errors.message && (
                                            <div className="invalid-feedback">
                                                {errors.message}
                                            </div>
                                        )}
                                    </div>

                                    {/* Sent Via */}
                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Sent Via
                                        </label>

                                        <select
                                            name="sent_via"
                                            className={`form-select ${
                                                errors.sent_via
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={formData.sent_via}
                                            onChange={handleChange}
                                        >
                                            <option value="email">
                                                Email
                                            </option>

                                            <option value="sms">
                                                SMS
                                            </option>

                                            <option value="inapp">
                                                In App
                                            </option>
                                        </select>

                                        {errors.sent_via && (
                                            <div className="invalid-feedback">
                                                {errors.sent_via}
                                            </div>
                                        )}
                                    </div>

                                    {/* Status */}
                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Status
                                        </label>

                                        <select
                                            name="status"
                                            className={`form-select ${
                                                errors.status
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={formData.status}
                                            onChange={handleChange}
                                        >
                                            <option value="pending">
                                                Pending
                                            </option>

                                            <option value="sent">
                                                Sent
                                            </option>

                                            <option value="failed">
                                                Failed
                                            </option>
                                        </select>

                                        {errors.status && (
                                            <div className="invalid-feedback">
                                                {errors.status}
                                            </div>
                                        )}
                                    </div>

                                    {/* Read */}
                                    <div className="col-md-4">
                                        <div className="form-check form-switch mt-4">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="edit_is_read"
                                                name="is_read"
                                                checked={formData.is_read}
                                                onChange={handleChange}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="edit_is_read"
                                            >
                                                Read
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
                                        : "Update Notification"}
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

export default EditNotificationsModal;