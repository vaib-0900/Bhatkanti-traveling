import React, { useState } from "react";
import AuthUser from "../../Auth/AuthUser";

const AddCustomersModal = ({ show, onClose, oncustomersAdded }) => {
  const { http } = AuthUser();

  const initialForm = {
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
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Remove error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
      general: "",
    }));
  };

  // Close modal and reset form
  const resetAndClose = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitting(false);
    onClose();
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!form.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }

    if (!form.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!form.date_of_birth) {
      newErrors.date_of_birth = "Date of birth is required";
    }

    if (!form.nationality.trim()) {
      newErrors.nationality = "Nationality is required";
    }

    if (!form.passport_number.trim()) {
      newErrors.passport_number = "Passport number is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit customer
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      const res = await http.post("/customers/store", form);

      console.log("CUSTOMER SUCCESS:", res.data);

      setForm(initialForm);
      setErrors({});

      if (oncustomersAdded) {
        oncustomersAdded();
      }

      onClose();

    } catch (error) {
      console.log("CUSTOMER ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({
          general:
            error.response?.data?.message ||
            "Something went wrong while adding customer",
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
                Add Customer
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

                  {/* First Name */}
                  <div className="col-md-6">
                    <label className="form-label">
                      First Name
                    </label>

                    <input
                      type="text"
                      name="first_name"
                      className={`form-control ${
                        errors.first_name ? "is-invalid" : ""
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
                  <div className="col-md-6">
                    <label className="form-label">
                      Last Name
                    </label>

                    <input
                      type="text"
                      name="last_name"
                      className={`form-control ${
                        errors.last_name ? "is-invalid" : ""
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

                  {/* Email */}
                  <div className="col-md-6">
                    <label className="form-label">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      placeholder="Enter email"
                      value={form.email}
                      onChange={handleChange}
                    />

                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email}
                      </div>
                    )}
                  </div>

                  {/* Password */}
                  <div className="col-md-6">
                    <label className="form-label">
                      Password
                    </label>

                    <input
                      type="password"
                      name="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      placeholder="Enter password"
                      value={form.password}
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
                        errors.phone ? "is-invalid" : ""
                      }`}
                      placeholder="Enter phone number"
                      value={form.phone}
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
                        errors.date_of_birth ? "is-invalid" : ""
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

                  {/* Nationality */}
                  <div className="col-md-6">
                    <label className="form-label">
                      Nationality
                    </label>

                    <input
                      type="text"
                      name="nationality"
                      className={`form-control ${
                        errors.nationality ? "is-invalid" : ""
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

                  {/* Passport Number */}
                  <div className="col-md-6">
                    <label className="form-label">
                      Passport Number
                    </label>

                    <input
                      type="text"
                      name="passport_number"
                      className={`form-control ${
                        errors.passport_number ? "is-invalid" : ""
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

                  {/* Address */}
                  <div className="col-12">
                    <label className="form-label">
                      Address
                    </label>

                    <textarea
                      name="address"
                      rows="2"
                      className={`form-control ${
                        errors.address ? "is-invalid" : ""
                      }`}
                      placeholder="Enter address"
                      value={form.address}
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
                        errors.emergency_contact_name ? "is-invalid" : ""
                      }`}
                      placeholder="Enter emergency contact name"
                      value={form.emergency_contact_name}
                      onChange={handleChange}
                    />

                    {errors.emergency_contact_name && (
                      <div className="invalid-feedback">
                        {errors.emergency_contact_name}
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
                        errors.emergency_contact_phone ? "is-invalid" : ""
                      }`}
                      placeholder="Enter emergency contact phone"
                      value={form.emergency_contact_phone}
                      onChange={handleChange}
                    />

                    {errors.emergency_contact_phone && (
                      <div className="invalid-feedback">
                        {errors.emergency_contact_phone}
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
                        errors.preferred_language ? "is-invalid" : ""
                      }`}
                      placeholder="Enter preferred language"
                      value={form.preferred_language}
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
                        id="is_active"
                        name="is_active"
                        checked={form.is_active}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="is_active"
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
                        id="newsletter_subscription"
                        name="newsletter_subscription"
                        checked={form.newsletter_subscription}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="newsletter_subscription"
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
                  disabled={submitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-attractive"
                  disabled={submitting}
                >
                  {submitting ? "Saving..." : "Save Customer"}
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

export default AddCustomersModal;