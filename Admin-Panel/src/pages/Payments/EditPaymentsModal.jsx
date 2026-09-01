import React, { useEffect, useState } from "react";
import AuthUser from "../../Auth/AuthUser";

const EditPaymentsModal = ({
    show,
    onClose,
    payment,
    onPaymentUpdated,
}) => {
    const { http } = AuthUser();

    const [formData, setFormData] = useState({
        booking_id: "",
        payment_reference: "",
        amount: "",
        currency: "",
        payment_method: "",
        transaction_id: "",
        refund_reason: "",
        notes: "",
        processed_by: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // ==============================
    // Load payment data
    // ==============================
    useEffect(() => {
        if (payment) {
            setFormData({
                booking_id: payment.booking_id || "",
                payment_reference: payment.payment_reference || "",
                amount: payment.amount || "",
                currency: payment.currency || "",
                payment_method: payment.payment_method || "",
                transaction_id: payment.transaction_id || "",
                refund_reason: payment.refund_reason || "",
                notes: payment.notes || "",
                processed_by: payment.processed_by || "",
            });

            setErrors({});
        }
    }, [payment]);

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

        if (!formData.booking_id) {
            newErrors.booking_id = "Booking ID is required";
        }

        if (!formData.payment_reference.trim()) {
            newErrors.payment_reference =
                "Payment reference is required";
        }

        if (!formData.amount) {
            newErrors.amount = "Amount is required";
        } else if (Number(formData.amount) <= 0) {
            newErrors.amount = "Amount must be greater than 0";
        }

        if (!formData.currency.trim()) {
            newErrors.currency = "Currency is required";
        }

        if (!formData.payment_method) {
            newErrors.payment_method = "Payment method is required";
        }

        if (!formData.transaction_id.trim()) {
            newErrors.transaction_id = "Transaction ID is required";
        }

        if (!formData.processed_by) {
            newErrors.processed_by = "Processed by is required";
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

        if (!payment) {
            return;
        }

        if (!validate()) {
            return;
        }

        // Mongo ID
        const paymentId = payment._id || payment.id;

        if (!paymentId) {
            console.log("Payment ID not found:", payment);

            setErrors({
                general: "Payment ID not found.",
            });

            return;
        }

        setLoading(true);

        try {
            const payload = {
                _id: paymentId,
                booking_id: Number(formData.booking_id),
                payment_reference: formData.payment_reference,
                amount: Number(formData.amount),
                currency: formData.currency,
                payment_method: formData.payment_method,
                transaction_id: formData.transaction_id,
                refund_reason: formData.refund_reason,
                notes: formData.notes,
                processed_by: Number(formData.processed_by),
            };

            console.log("UPDATE PAYLOAD:", payload);

            const response = await http.put(
                "/payments/update",
                payload
            );

            console.log("PAYMENT UPDATED:", response.data);

            alert("Payment updated successfully!");

            if (onPaymentUpdated) {
                onPaymentUpdated();
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
                        "Unable to update payment.",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    if (!show || !payment) {
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
                                Edit Payment
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

                                    {/* Booking ID */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Booking ID
                                        </label>

                                        <input
                                            type="number"
                                            name="booking_id"
                                            className={`form-control ${errors.booking_id
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                            value={formData.booking_id}
                                            onChange={handleChange}
                                        />

                                        {errors.booking_id && (
                                            <div className="invalid-feedback">
                                                {errors.booking_id}
                                            </div>
                                        )}
                                    </div>

                                    {/* Payment Reference */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Payment Reference
                                        </label>

                                        <input
                                            type="text"
                                            name="payment_reference"
                                            className={`form-control ${errors.payment_reference
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                            value={
                                                formData.payment_reference
                                            }
                                            onChange={handleChange}
                                        />

                                        {errors.payment_reference && (
                                            <div className="invalid-feedback">
                                                {errors.payment_reference}
                                            </div>
                                        )}
                                    </div>

                                    {/* Amount */}
                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Amount
                                        </label>

                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            name="amount"
                                            className={`form-control ${errors.amount
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                            value={formData.amount}
                                            onChange={handleChange}
                                        />

                                        {errors.amount && (
                                            <div className="invalid-feedback">
                                                {errors.amount}
                                            </div>
                                        )}
                                    </div>

                                    {/* Currency */}
                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Currency
                                        </label>

                                        <input
                                            type="text"
                                            name="currency"
                                            className={`form-control ${errors.currency
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                            value={formData.currency}
                                            onChange={handleChange}
                                        />

                                        {errors.currency && (
                                            <div className="invalid-feedback">
                                                {errors.currency}
                                            </div>
                                        )}
                                    </div>

                                    {/* Payment Method */}
                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Payment Method
                                        </label>

                                        <select
                                            name="payment_method"
                                            className={`form-select ${errors.payment_method ? "is-invalid" : ""
                                                }`}
                                            value={errors.payment_method}
                                            onChange={handleChange}
                                        >
                                            <option value="">
                                                Select method
                                            </option>

                                            <option value="pending">
                                                pending
                                            </option>

                                            <option value="pleted">
                                                pleted
                                            </option>

                                            <option value="failed">
                                                failed
                                            </option>

                                            <option value="refunded">
                                                refunded
                                            </option>

                                        </select>

                                        {errors.payment_method && (
                                            <div className="invalid-feedback">
                                                {errors.payment_method}
                                            </div>
                                        )}
                                    </div>

                                    {/* Transaction ID */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Transaction ID
                                        </label>

                                        <input
                                            type="text"
                                            name="transaction_id"
                                            className={`form-control ${errors.transaction_id
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                            value={
                                                formData.transaction_id
                                            }
                                            onChange={handleChange}
                                        />

                                        {errors.transaction_id && (
                                            <div className="invalid-feedback">
                                                {errors.transaction_id}
                                            </div>
                                        )}
                                    </div>

                                    {/* Processed By */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Processed By
                                        </label>

                                        <input
                                            type="number"
                                            name="processed_by"
                                            className={`form-control ${errors.processed_by
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                            value={formData.processed_by}
                                            onChange={handleChange}
                                        />

                                        {errors.processed_by && (
                                            <div className="invalid-feedback">
                                                {errors.processed_by}
                                            </div>
                                        )}
                                    </div>

                                    {/* Refund Reason */}
                                    <div className="col-12">
                                        <label className="form-label">
                                            Refund Reason
                                        </label>

                                        <textarea
                                            name="refund_reason"
                                            rows="2"
                                            className={`form-control ${errors.refund_reason
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                            value={formData.refund_reason}
                                            onChange={handleChange}
                                        ></textarea>

                                        {errors.refund_reason && (
                                            <div className="invalid-feedback">
                                                {errors.refund_reason}
                                            </div>
                                        )}
                                    </div>

                                    {/* Notes */}
                                    <div className="col-12">
                                        <label className="form-label">
                                            Notes
                                        </label>

                                        <textarea
                                            name="notes"
                                            rows="3"
                                            className={`form-control ${errors.notes
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                            value={formData.notes}
                                            onChange={handleChange}
                                        ></textarea>

                                        {errors.notes && (
                                            <div className="invalid-feedback">
                                                {errors.notes}
                                            </div>
                                        )}
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
                                        : "Update Payment"}
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

export default EditPaymentsModal;