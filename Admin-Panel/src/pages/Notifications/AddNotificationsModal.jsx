import React, { useState } from "react";
import AuthUser from "../../Auth/AuthUser";

const AddNotificationsModal = ({
  show,
  onClose,
  onnotificationsAdded,
}) => {
  const { http } = AuthUser();

  const initialForm = {
    recipient_type: "customer",
    recipient_id_type: "booking_confirmation",
    subject: "",
    message: "",
    is_read: false,
    sent_via: "email",
    status: "pending",
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

    if (!form.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit notification
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      const res = await http.post("/notifications/store", form);

      console.log("NOTIFICATION SUCCESS:", res.data);

      setForm(initialForm);
      setErrors({});

      if (onnotificationsAdded) {
        onnotificationsAdded();
      }

      onClose();

    } catch (error) {
      console.log("NOTIFICATION ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({
          general:
            error.response?.data?.message ||
            "Something went wrong while adding notification",
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
                Add Notification
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

                  {/* Recipient Type */}
                  <div className="col-md-6">
                    <label className="form-label">
                      Recipient Type
                    </label>

                    <select
                      name="recipient_type"
                      className={`form-select ${
                        errors.recipient_type ? "is-invalid" : ""
                      }`}
                      value={form.recipient_type}
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
                        errors.recipient_id_type ? "is-invalid" : ""
                      }`}
                      value={form.recipient_id_type}
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
                        errors.subject ? "is-invalid" : ""
                      }`}
                      placeholder="Enter subject"
                      value={form.subject}
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
                        errors.message ? "is-invalid" : ""
                      }`}
                      placeholder="Enter message"
                      value={form.message}
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
                        errors.sent_via ? "is-invalid" : ""
                      }`}
                      value={form.sent_via}
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
                        errors.status ? "is-invalid" : ""
                      }`}
                      value={form.status}
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
                        id="is_read"
                        name="is_read"
                        checked={form.is_read}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="is_read"
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
                  disabled={submitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-attractive"
                  disabled={submitting}
                >
                  {submitting ? "Saving..." : "Save Notification"}
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

export default AddNotificationsModal;