    import React, { useEffect, useState } from "react";
    import AuthUser from "../../Auth/AuthUser";



    const EditBookingModal = ({
        show,
        onClose,
        booking,
        onBookingUpdated,
    }) => {
        const { http } = AuthUser();

        const [formData, setFormData] = useState({
            booking_reference: "",
            customer_id: "",
            schedule_id: "",
            number_of_travelers: "",
            number_of_adults: "",
            number_of_children: "0",
            total_price: "",
            discount_applied: "",
            booking_status: "pending",
            payment_status: "pending",
            special_requests: "",
            cancellation_reason: "",
        });

        const [errors, setErrors] = useState({});
        const [loading, setLoading] = useState(false);

        // ==============================
        // Load booking data
        // ==============================
        useEffect(() => {
            if (booking) {
                setFormData({
                    booking_reference: booking.booking_reference || "",
                    customer_id: booking.customer_id || "",
                    schedule_id: booking.schedule_id || "",
                    number_of_travelers: booking.number_of_travelers || "",
                    number_of_adults: booking.number_of_adults || "",
                    number_of_children: booking.number_of_children || "0",
                    total_price: booking.total_price || "",
                    discount_applied: booking.discount_applied || "",
                    booking_status: booking.booking_status || "pending",
                    payment_status: booking.payment_status || "pending",
                    special_requests: booking.special_requests || "",
                    cancellation_reason: booking.cancellation_reason || "",
                });

                setErrors({});
            }
        }, [booking]);

        // ==============================
        // Handle input
        // ==============================
        const handleChange = (e) => {
            const { name, value } = e.target;

            setFormData((prev) => ({
                ...prev,
                [name]: value,
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

            if (!formData.booking_reference.trim()) {
                newErrors.booking_reference =
                    "Booking reference is required";
            }

            if (!formData.customer_id) {
                newErrors.customer_id = "Customer ID is required";
            }

            if (!formData.schedule_id) {
                newErrors.schedule_id = "Schedule ID is required";
            }

            if (!formData.number_of_travelers) {
                newErrors.number_of_travelers =
                    "Number of travelers is required";
            }

            if (!formData.number_of_adults) {
                newErrors.number_of_adults =
                    "Number of adults is required";
            }

            if (!formData.total_price) {
                newErrors.total_price = "Total price is required";
            }

            setErrors(newErrors);

            return Object.keys(newErrors).length === 0;
        };

        // ==============================
        // Submit
        // ==============================
        const handleSubmit = async (e) => {
            e.preventDefault();

            if (!booking) {
                return;
            }

            if (!validate()) {
                return;
            }

            // MongoDB ID
            const bookingId =
                booking._id ||
                booking.id ||
                booking.booking_id;

            if (!bookingId) {
                console.log("Booking ID not found:", booking);

                setErrors({
                    general: "Booking ID not found.",
                });

                return;
            }

            setLoading(true);

            try {
                const payload = {
                    _id: bookingId,

                    booking_reference:
                        formData.booking_reference,

                    customer_id:
                        Number(formData.customer_id),

                    schedule_id:
                        Number(formData.schedule_id),

                    number_of_travelers:
                        Number(formData.number_of_travelers),

                    number_of_adults:
                        Number(formData.number_of_adults),

                    number_of_children:
                        Number(formData.number_of_children || 0),

                    total_price:
                        Number(formData.total_price),

                    discount_applied:
                        formData.discount_applied,

                    booking_status:
                        formData.booking_status,

                    payment_status:
                        formData.payment_status,

                    special_requests:
                        formData.special_requests,

                    cancellation_reason:
                        formData.cancellation_reason,
                };

                console.log("UPDATE PAYLOAD:", payload);

                const response = await http.put(
                    "/bookings/update",
                    payload
                );

                console.log(
                    "BOOKING UPDATED:",
                    response.data
                );

                alert("Booking updated successfully!");

                if (onBookingUpdated) {
                    onBookingUpdated();
                }

                onClose();
            } catch (error) {
                console.log(
                    "UPDATE ERROR:",
                    error
                );

                console.log(
                    "STATUS:",
                    error.response?.status
                );

                console.log(
                    "DATA:",
                    error.response?.data
                );

                setErrors({
                    general:
                        error.response?.data?.message ||
                        "Unable to update booking.",
                });
            } finally {
                setLoading(false);
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
                                    Edit Booking
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={onClose}
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

                                        {/* Booking Reference */}
                                        <div className="col-md-6">
                                            <label className="form-label">
                                                Booking Reference
                                            </label>

                                            <input
                                                type="text"
                                                name="booking_reference"
                                                className={`form-control ${errors.booking_reference
                                                        ? "is-invalid"
                                                        : ""
                                                    }`}
                                                value={
                                                    formData.booking_reference
                                                }
                                                onChange={handleChange}
                                            />

                                            {errors.booking_reference && (
                                                <div className="invalid-feedback">
                                                    {errors.booking_reference}
                                                </div>
                                            )}
                                        </div>

                                        {/* Customer */}
                                        <div className="col-md-3">
                                            <label className="form-label">
                                                Customer ID
                                            </label>

                                            <input
                                                type="number"
                                                name="customer_id"
                                                className={`form-control ${errors.customer_id
                                                        ? "is-invalid"
                                                        : ""
                                                    }`}
                                                value={formData.customer_id}
                                                onChange={handleChange}
                                            />

                                            {errors.customer_id && (
                                                <div className="invalid-feedback">
                                                    {errors.customer_id}
                                                </div>
                                            )}
                                        </div>

                                        {/* Schedule */}
                                        <div className="col-md-3">
                                            <label className="form-label">
                                                Schedule ID
                                            </label>

                                            <input
                                                type="number"
                                                name="schedule_id"
                                                className={`form-control ${errors.schedule_id
                                                        ? "is-invalid"
                                                        : ""
                                                    }`}
                                                value={formData.schedule_id}
                                                onChange={handleChange}
                                            />

                                            {errors.schedule_id && (
                                                <div className="invalid-feedback">
                                                    {errors.schedule_id}
                                                </div>
                                            )}
                                        </div>

                                        {/* Travelers */}
                                        <div className="col-md-4">
                                            <label className="form-label">
                                                Travelers
                                            </label>

                                            <input
                                                type="number"
                                                min="1"
                                                name="number_of_travelers"
                                                className={`form-control ${errors.number_of_travelers
                                                        ? "is-invalid"
                                                        : ""
                                                    }`}
                                                value={
                                                    formData.number_of_travelers
                                                }
                                                onChange={handleChange}
                                            />

                                            {errors.number_of_travelers && (
                                                <div className="invalid-feedback">
                                                    {errors.number_of_travelers}
                                                </div>
                                            )}
                                        </div>

                                        {/* Adults */}
                                        <div className="col-md-4">
                                            <label className="form-label">
                                                Adults
                                            </label>

                                            <input
                                                type="number"
                                                min="1"
                                                name="number_of_adults"
                                                className={`form-control ${errors.number_of_adults
                                                        ? "is-invalid"
                                                        : ""
                                                    }`}
                                                value={
                                                    formData.number_of_adults
                                                }
                                                onChange={handleChange}
                                            />

                                            {errors.number_of_adults && (
                                                <div className="invalid-feedback">
                                                    {errors.number_of_adults}
                                                </div>
                                            )}
                                        </div>

                                        {/* Children */}
                                        <div className="col-md-4">
                                            <label className="form-label">
                                                Children
                                            </label>

                                            <input
                                                type="number"
                                                min="0"
                                                name="number_of_children"
                                                className="form-control"
                                                value={
                                                    formData.number_of_children
                                                }
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* Total Price */}
                                        <div className="col-md-6">
                                            <label className="form-label">
                                                Total Price
                                            </label>

                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                name="total_price"
                                                className={`form-control ${errors.total_price
                                                        ? "is-invalid"
                                                        : ""
                                                    }`}
                                                value={formData.total_price}
                                                onChange={handleChange}
                                            />

                                            {errors.total_price && (
                                                <div className="invalid-feedback">
                                                    {errors.total_price}
                                                </div>
                                            )}
                                        </div>

                                        {/* Discount */}
                                        <div className="col-md-6">
                                            <label className="form-label">
                                                Discount
                                            </label>

                                            <input
                                                type="text"
                                                name="discount_applied"
                                                className="form-control"
                                                value={
                                                    formData.discount_applied
                                                }
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* Booking Status */}
                                        <div className="col-md-6">
                                            <label className="form-label">
                                                Booking Status
                                            </label>

                                            <select
                                                name="booking_status"
                                                className="form-select"
                                                value={formData.booking_status}
                                                onChange={handleChange}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="cancelled">Cancelled</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </div>

                                        {/* Payment Status */}
                                        <div className="col-md-6">
                                            <label className="form-label">
                                                Payment Status
                                            </label>

                                            <select
                                                name="payment_status"
                                                className="form-select"
                                                value={formData.payment_status}
                                                onChange={handleChange}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="paid">Paid</option>
                                                <option value="refunded">Refunded</option>
                                                <option value="partial">Partial</option>
                                            </select>
                                        </div>

                                        {/* Special Requests */}
                                        <div className="col-12">
                                            <label className="form-label">
                                                Special Requests
                                            </label>

                                            <textarea
                                                name="special_requests"
                                                className="form-control"
                                                rows="3"
                                                value={
                                                    formData.special_requests
                                                }
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* Cancellation Reason */}
                                        <div className="col-12">
                                            <label className="form-label">
                                                Cancellation Reason
                                            </label>

                                            <textarea
                                                name="cancellation_reason"
                                                className="form-control"
                                                rows="2"
                                                value={
                                                    formData.cancellation_reason
                                                }
                                                onChange={handleChange}
                                            />
                                        </div>

                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="modal-footer">

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={onClose}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Updating..."
                                            : "Update Booking"}
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

    export default EditBookingModal;