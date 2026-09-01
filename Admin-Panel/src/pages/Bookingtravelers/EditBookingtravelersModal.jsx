import React, { useEffect, useState } from "react";
import AuthUser from "../../Auth/AuthUser";

const EditBookingtravelersModal = ({
    show,
    onClose,
    bookingtraveler,
    onBookingTravelerUpdated,
}) => {
    const { http } = AuthUser();

    const [formData, setFormData] = useState({
        booking_id: "",
        first_name: "",
        last_name: "",
        date_of_birth: "",
        passport_number: "",
        passport_expiry: "",
        gender: "male",
        nationality: "",
        is_primary: false,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // =================================
    // Load booking traveler data
    // =================================
    useEffect(() => {
        if (bookingtraveler) {
            setFormData({
                booking_id: bookingtraveler.booking_id || "",
                first_name: bookingtraveler.first_name || "",
                last_name: bookingtraveler.last_name || "",
                date_of_birth: bookingtraveler.date_of_birth
                    ? bookingtraveler.date_of_birth.substring(0, 10)
                    : "",
                passport_number: bookingtraveler.passport_number || "",
                passport_expiry: bookingtraveler.passport_expiry
                    ? bookingtraveler.passport_expiry.substring(0, 10)
                    : "",
                gender: bookingtraveler.gender || "male",
                nationality: bookingtraveler.nationality || "",
                is_primary:
                    bookingtraveler.is_primary === true ||
                    bookingtraveler.is_primary === 1 ||
                    bookingtraveler.is_primary === "1",
            });

            setErrors({});
        }
    }, [bookingtraveler]);

    // =================================
    // Handle input change
    // =================================
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

    // =================================
    // Validation
    // =================================
    const validate = () => {
        const newErrors = {};

        if (!formData.booking_id) {
            newErrors.booking_id = "Booking ID is required";
        }

        if (!formData.first_name.trim()) {
            newErrors.first_name = "First name is required";
        }

        if (!formData.last_name.trim()) {
            newErrors.last_name = "Last name is required";
        }

        if (!formData.date_of_birth) {
            newErrors.date_of_birth = "Date of birth is required";
        }

        if (!formData.passport_number.trim()) {
            newErrors.passport_number = "Passport number is required";
        }

        if (!formData.passport_expiry) {
            newErrors.passport_expiry = "Passport expiry is required";
        }

        if (!formData.gender) {
            newErrors.gender = "Gender is required";
        }

        if (!formData.nationality.trim()) {
            newErrors.nationality = "Nationality is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // =================================
    // Submit
    // =================================
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!bookingtraveler) {
            return;
        }

        if (!validate()) {
            return;
        }

        // MongoDB Traveler ID
        const travelerId =
            bookingtraveler._id ||
            bookingtraveler.id ||
            bookingtraveler.booking_traveler_id ||
            bookingtraveler.traveler_id;

        if (!travelerId) {
            console.log(
                "Booking Traveler ID not found:",
                bookingtraveler
            );

            setErrors({
                general: "Booking Traveler ID not found.",
            });

            return;
        }

        setLoading(true);

        try {
        const payload = {
    _id: travelerId,

    booking_id: formData.booking_id,

    first_name: formData.first_name.trim(),

    last_name: formData.last_name.trim(),

    date_of_birth: formData.date_of_birth,

    passport_number:
        formData.passport_number.trim(),

    passport_expiry:
        formData.passport_expiry,

    gender: formData.gender,

    nationality:
        formData.nationality.trim(),

    is_primary: formData.is_primary,
};

console.log(
    "UPDATE TRAVELER ID:",
    travelerId
);

console.log(
    "UPDATE TRAVELER PAYLOAD:",
    JSON.stringify(payload, null, 2)
);

            console.log(
                "UPDATE TRAVELER ID:",
                travelerId
            );

            console.log(
                "UPDATE TRAVELER PAYLOAD:",
                payload
            );

            const response = await http.put(
                "/bookingtravelers/update",
                payload
            );
            http.put("/bookingtravelers/update", payload)

            console.log(
                "BOOKING TRAVELER UPDATED:",
                response.data
            );

            alert(
                "Booking traveler updated successfully!"
            );

            if (onBookingTravelerUpdated) {
                onBookingTravelerUpdated();
            }

            onClose();

        } catch (error) {
            console.log(
                "Error in updating booking traveler:",
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
                    "Unable to update booking traveler.",
            });
        } finally {
            setLoading(false);
        }
    };

    // =================================
    // Close modal if show false
    // =================================
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
                                Edit Booking Traveler
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

                                    {/* Booking ID */}
                                    <div className="col-md-4">
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
                                            value={
                                                formData.booking_id
                                            }
                                            onChange={handleChange}
                                        />

                                        {errors.booking_id && (
                                            <div className="invalid-feedback">
                                                {errors.booking_id}
                                            </div>
                                        )}
                                    </div>

                                    {/* First Name */}
                                    <div className="col-md-4">
                                        <label className="form-label">
                                            First Name
                                        </label>

                                        <input
                                            type="text"
                                            name="first_name"
                                            className={`form-control ${errors.first_name
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                            value={
                                                formData.first_name
                                            }
                                            onChange={handleChange}
                                        />

                                        {errors.first_name && (
                                            <div className="invalid-feedback">
                                                {errors.first_name}
                                            </div>
                                        )}
                                    </div>

                                    {/* Last Name */}
                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Last Name
                                        </label>

                                        <input
                                            type="text"
                                            name="last_name"
                                            className={`form-control ${errors.last_name
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                            value={
                                                formData.last_name
                                            }
                                            onChange={handleChange}
                                        />

                                        {errors.last_name && (
                                            <div className="invalid-feedback">
                                                {errors.last_name}
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
                                            className={`form-control ${errors.date_of_birth
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                            value={
                                                formData.date_of_birth
                                            }
                                            onChange={handleChange}
                                        />

                                        {errors.date_of_birth && (
                                            <div className="invalid-feedback">
                                                {errors.date_of_birth}
                                            </div>
                                        )}
                                    </div>

                                    {/* Gender */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Gender
                                        </label>

                                        <select
                                            name="gender"
                                            className={`form-select ${errors.gender
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                            value={
                                                formData.gender
                                            }
                                            onChange={handleChange}
                                        >
                                            <option value="male">
                                                Male
                                            </option>

                                            <option value="female">
                                                Female
                                            </option>

                                            <option value="other">
                                                Other
                                            </option>
                                        </select>

                                        {errors.gender && (
                                            <div className="invalid-feedback">
                                                {errors.gender}
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
                                            className={`form-control ${errors.passport_number
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

                                    {/* Passport Expiry */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Passport Expiry
                                        </label>

                                        <input
                                            type="date"
                                            name="passport_expiry"
                                            className={`form-control ${errors.passport_expiry
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                            value={
                                                formData.passport_expiry
                                            }
                                            onChange={handleChange}
                                        />

                                        {errors.passport_expiry && (
                                            <div className="invalid-feedback">
                                                {errors.passport_expiry}
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
                                            className={`form-control ${errors.nationality
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                            value={
                                                formData.nationality
                                            }
                                            onChange={handleChange}
                                        />

                                        {errors.nationality && (
                                            <div className="invalid-feedback">
                                                {errors.nationality}
                                            </div>
                                        )}
                                    </div>

                                    {/* Primary Traveler */}
                                    <div className="col-md-6">
                                        <div className="form-check mt-4">
                                            <input
                                                type="checkbox"
                                                name="is_primary"
                                                className="form-check-input"
                                                id="is_primary"
                                                checked={
                                                    formData.is_primary
                                                }
                                                onChange={handleChange}
                                            />

                                            <label
                                                className="form-check-label"
                                                htmlFor="is_primary"
                                            >
                                                Primary Traveler
                                            </label>
                                        </div>
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
                                        : "Update Traveler"}
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

export default EditBookingtravelersModal;