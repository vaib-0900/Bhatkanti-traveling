import React, { useEffect, useState } from "react";
import AuthUser from "../../Auth/AuthUser";

const EditReviewsModal = ({
    show,
    onClose,
    review,
    onReviewUpdated,
}) => {
    const { http } = AuthUser();

    const [formData, setFormData] = useState({
        booking_id: "",
        customer_id: "",
        package_id: "",
        rating: "",
        title: "",
        comment: "",
        is_approved: false,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // ==============================
    // Load review data
    // ==============================
    useEffect(() => {
        if (review) {
            setFormData({
                booking_id: review.booking_id || "",
                customer_id: review.customer_id || "",
                package_id: review.package_id || "",
                rating: review.rating || "",
                title: review.title || "",
                comment: review.comment || "",
                is_approved: review.is_approved || false,
            });

            setErrors({});
        }
    }, [review]);

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

        if (!formData.customer_id) {
            newErrors.customer_id = "Customer ID is required";
        }

        if (!formData.package_id) {
            newErrors.package_id = "Package ID is required";
        }

        if (formData.rating === "" || formData.rating === null) {
            newErrors.rating = "Rating is required";
        } else if (
            Number(formData.rating) < 0 ||
            Number(formData.rating) > 5
        ) {
            newErrors.rating = "Rating must be between 0 and 5";
        }

        if (!formData.title.trim()) {
            newErrors.title = "Title is required";
        }

        if (!formData.comment.trim()) {
            newErrors.comment = "Comment is required";
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

        if (!review) {
            return;
        }

        if (!validate()) {
            return;
        }

        // Get the _id from the review object
        const reviewId = review._id;

        if (!reviewId) {
            console.log("Review _id not found:", review);

            setErrors({
                general: "Review ID not found.",
            });

            return;
        }

        setLoading(true);

        try {
            // Include _id in the payload as expected by the backend
            const payload = {
                _id: reviewId, // This is the key change
                booking_id: Number(formData.booking_id),
                customer_id: Number(formData.customer_id),
                package_id: Number(formData.package_id),
                rating: Number(formData.rating),
                title: formData.title,
                comment: formData.comment,
                is_approved: formData.is_approved,
            };

            console.log("UPDATE PAYLOAD:", payload);

            // Send to the update endpoint without ID in the path
            const response = await http.put(
                "/reviews/update", // Changed from `/reviews/update/${bookingId}`
                payload
            );

            console.log("REVIEW UPDATED:", response.data);

            alert("Review updated successfully!");

            if (onReviewUpdated) {
                onReviewUpdated();
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
                        "Unable to update review.",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    if (!show || !review) {
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
                                Edit Review
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
                                    <div className="col-md-4">
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
                                            value={formData.booking_id}
                                            onChange={handleChange}
                                        />

                                        {errors.booking_id && (
                                            <div className="invalid-feedback">
                                                {errors.booking_id}
                                            </div>
                                        )}
                                    </div>

                                    {/* Customer ID */}
                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Customer ID
                                        </label>

                                        <input
                                            type="number"
                                            name="customer_id"
                                            className={`form-control ${
                                                errors.customer_id
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

                                    {/* Package ID */}
                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Package ID
                                        </label>

                                        <input
                                            type="number"
                                            name="package_id"
                                            className={`form-control ${
                                                errors.package_id
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={formData.package_id}
                                            onChange={handleChange}
                                        />

                                        {errors.package_id && (
                                            <div className="invalid-feedback">
                                                {errors.package_id}
                                            </div>
                                        )}
                                    </div>

                                    {/* Rating */}
                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Rating
                                        </label>

                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            name="rating"
                                            className={`form-control ${
                                                errors.rating
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={formData.rating}
                                            onChange={handleChange}
                                        />

                                        {errors.rating && (
                                            <div className="invalid-feedback">
                                                {errors.rating}
                                            </div>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <div className="col-md-8">
                                        <label className="form-label">
                                            Title
                                        </label>

                                        <input
                                            type="text"
                                            name="title"
                                            className={`form-control ${
                                                errors.title
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={formData.title}
                                            onChange={handleChange}
                                        />

                                        {errors.title && (
                                            <div className="invalid-feedback">
                                                {errors.title}
                                            </div>
                                        )}
                                    </div>

                                    {/* Comment */}
                                    <div className="col-12">
                                        <label className="form-label">
                                            Comment
                                        </label>

                                        <textarea
                                            name="comment"
                                            rows="4"
                                            className={`form-control ${
                                                errors.comment
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={formData.comment}
                                            onChange={handleChange}
                                        ></textarea>

                                        {errors.comment && (
                                            <div className="invalid-feedback">
                                                {errors.comment}
                                            </div>
                                        )}
                                    </div>

                                    {/* Approved */}
                                    <div className="col-md-6">
                                        <div className="form-check form-switch mt-2">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="edit_is_approved"
                                                name="is_approved"
                                                checked={formData.is_approved}
                                                onChange={handleChange}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="edit_is_approved"
                                            >
                                                Approved
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
                                    {loading ? "Updating..." : "Update Review"}
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

export default EditReviewsModal;