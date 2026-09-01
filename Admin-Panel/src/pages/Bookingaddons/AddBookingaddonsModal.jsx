import React, { useState } from "react";
import AuthUser from "../../Auth/AuthUser";

const AddBookingaddonsModal = ({
    show,
    onClose,
    onbookingaddonsAdded,
}) => {
    const { http } = AuthUser();

    const initialForm = {
        booking_addon_id: "",
        booking_id: "",
        addon_id: "",
        quantity: "",
        price_at_time: "",
    };

    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Remove field error
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    // Reset form
    const resetForm = () => {
        setForm(initialForm);
        setErrors({});
    };

    // Close modal
    const resetAndClose = () => {
        resetForm();
        onClose();
    };

    // Validation
    const validate = () => {
        const newErrors = {};
        if (!form.booking_addon_id) {
            newErrors.booking_addon_id = "Booking Addon ID is required";
        }

        if (!form.booking_id) {
            newErrors.booking_id = "Booking ID is required";
        }

        if (!form.addon_id) {
            newErrors.addon_id = "Addon ID is required";
        }

        if (!form.quantity) {
            newErrors.quantity = "Quantity is required";
        } else if (Number(form.quantity) <= 0) {
            newErrors.quantity = "Quantity must be greater than 0";
        }

        if (!form.price_at_time) {
            newErrors.price_at_time = "Price at time is required";
        } else if (Number(form.price_at_time) < 0) {
            newErrors.price_at_time = "Price cannot be negative";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setSubmitting(true);
        setErrors({});

        try {
            // Convert numeric values correctly
            const payload = {
                booking_addon_id: Number(form.booking_addon_id),
                booking_id: Number(form.booking_id),
                addon_id: Number(form.addon_id),
                quantity: Number(form.quantity),
                price_at_time: Number(form.price_at_time),
            };

            console.log("BOOKING ADDON PAYLOAD:", payload);

            const response = await http.post(
                "/bookingaddons/store",
                payload
            );

            console.log(
                "BOOKING ADDON SUCCESS:",
                response.data
            );

            resetForm();

            if (onbookingaddonsAdded) {
                onbookingaddonsAdded();
            }

            onClose();
        } catch (error) {
            console.log("BOOKING ADDON ERROR:", error);

            console.log(
                "STATUS:",
                error.response?.status
            );

            console.log(
                "DATA:",
                error.response?.data
            );

            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({
                    general:
                        error.response?.data?.message ||
                        "Something went wrong while adding booking addon",
                });
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (!show) {
        return null;
    }

    return (
        <>
            <div
                className="modal fade show d-block"
                tabIndex="-1"
                role="dialog"
                style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    zIndex: 1055,
                }}
            >
                <div
                    className="modal-dialog modal-lg modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">

                        {/* Header */}
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">
                                Add Booking Addon
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={resetAndClose}
                                disabled={submitting}
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
                                           booking_addon_id
                                        </label>

                                        <input
                                            type="number"
                                            name="booking_addon_id"
                                            className={`form-control ${
                                                errors.booking_addon_id
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            placeholder="Enter booking addon id"
                                            value={form.booking_addon_id}
                                            onChange={handleChange}
                                        />

                                        {errors.booking_id && (
                                            <div className="invalid-feedback">
                                                {errors.booking_addon_id}
                                            </div>
                                        )}
                                    </div>


                                    {/* Booking ID */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Booking ID
                                        </label>

                                        <input
                                            type="number"
                                            name="booking_id"
                                            className={`form-control ${
                                                errors.booking_id
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            placeholder="Enter booking ID"
                                            value={form.booking_id}
                                            onChange={handleChange}
                                        />

                                        {errors.booking_id && (
                                            <div className="invalid-feedback">
                                                {errors.booking_id}
                                            </div>
                                        )}
                                    </div>

                                    {/* Addon ID */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Addon ID
                                        </label>

                                        <input
                                            type="number"
                                            name="addon_id"
                                            className={`form-control ${
                                                errors.addon_id
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            placeholder="Enter addon ID"
                                            value={form.addon_id}
                                            onChange={handleChange}
                                        />

                                        {errors.addon_id && (
                                            <div className="invalid-feedback">
                                                {errors.addon_id}
                                            </div>
                                        )}
                                    </div>

                                    {/* Quantity */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Quantity
                                        </label>

                                        <input
                                            type="number"
                                            min="1"
                                            name="quantity"
                                            className={`form-control ${
                                                errors.quantity
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            placeholder="Enter quantity"
                                            value={form.quantity}
                                            onChange={handleChange}
                                        />

                                        {errors.quantity && (
                                            <div className="invalid-feedback">
                                                {errors.quantity}
                                            </div>
                                        )}
                                    </div>

                                    {/* Price */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Price at Time
                                        </label>

                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            name="price_at_time"
                                            className={`form-control ${
                                                errors.price_at_time
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            placeholder="Enter price"
                                            value={form.price_at_time}
                                            onChange={handleChange}
                                        />

                                        {errors.price_at_time && (
                                            <div className="invalid-feedback">
                                                {errors.price_at_time}
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
                                    disabled={submitting}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-attractive"
                                    disabled={submitting}
                                >
                                    {submitting
                                        ? "Saving..."
                                        : "Save Booking Addon"}
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

export default AddBookingaddonsModal;