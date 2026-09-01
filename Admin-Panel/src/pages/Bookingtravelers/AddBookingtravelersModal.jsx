import React, { useState } from "react";
import AuthUser from "../../Auth/AuthUser";

const AddBookingtravelersModal = ({
  show,
  onClose,
  onbookingtravelersAdded,
}) => {
  const { http } = AuthUser();

  const initialForm = {
    booking_id: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    passport_number: "",
    passport_expiry: "",
    gender: "male",
    nationality: "",
    is_primary: false,
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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

    if (!form.booking_id) {
      newErrors.booking_id = "Booking ID is required";
    }

    if (!form.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }

    if (!form.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }

    if (!form.date_of_birth) {
      newErrors.date_of_birth = "Date of birth is required";
    }

    if (!form.passport_number.trim()) {
      newErrors.passport_number = "Passport number is required";
    }

    if (!form.passport_expiry) {
      newErrors.passport_expiry = "Passport expiry is required";
    }

    if (!form.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!form.nationality.trim()) {
      newErrors.nationality = "Nationality is required";
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
        booking_id: Number(form.booking_id),
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        date_of_birth: form.date_of_birth,
        passport_number: form.passport_number.trim(),
        passport_expiry: form.passport_expiry,
        gender: form.gender,
        nationality: form.nationality.trim(),
        is_primary: form.is_primary,
      };

      console.log("BOOKING TRAVELER PAYLOAD:", payload);

      const response = await http.post(
        "/bookingtravelers/store",
        payload
      );

      console.log(
        "BOOKING TRAVELER SUCCESS:",
        response.data
      );

      resetForm();

      if (onbookingtravelersAdded) {
        onbookingtravelersAdded();
      }

      onClose();
    } catch (error) {
      console.log("BOOKING TRAVELER ERROR:", error);
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
            "Something went wrong while adding traveler",
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
                Add Booking Traveler
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
                  <div className="col-md-4">
                    <label className="form-label">
                      Booking ID
                    </label>

                    <input
                      type="text"
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

                  {/* First Name */}
                  <div className="col-md-4">
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
                      placeholder="Enter first name"
                      value={form.first_name}
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
                      className={`form-control ${
                        errors.last_name
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter last name"
                      value={form.last_name}
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
                      className={`form-control ${
                        errors.date_of_birth
                          ? "is-invalid"
                          : ""
                      }`}
                      value={form.date_of_birth}
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
                      className={`form-select ${
                        errors.gender
                          ? "is-invalid"
                          : ""
                      }`}
                      value={form.gender}
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
                      className={`form-control ${
                        errors.passport_number
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter passport number"
                      value={form.passport_number}
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
                      className={`form-control ${
                        errors.passport_expiry
                          ? "is-invalid"
                          : ""
                      }`}
                      value={form.passport_expiry}
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
                      className={`form-control ${
                        errors.nationality
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter nationality"
                      value={form.nationality}
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
                    <div className="form-check form-switch mt-4">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="is_primary"
                        name="is_primary"
                        checked={form.is_primary}
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
                  className="btn btn-light"
                  onClick={resetAndClose}
                  disabled={submitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting
                    ? "Saving..."
                    : "Save Traveler"}
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

export default AddBookingtravelersModal;