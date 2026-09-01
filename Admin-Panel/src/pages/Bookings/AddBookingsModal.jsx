import React, { useState } from "react";
import AuthUser from "../../Auth/AuthUser";

const AddBookingsModal = ({ show, onClose, onbookingsAdded }) => {
  const { http } = AuthUser();

  const initialForm = {
    booking_reference: "",
    customer_id: "",
    schedule_id: "",
    number_of_travelers: "",
    number_of_adults: "",
    number_of_children: "",
    total_price: "",
    discount_applied: "",
    booking_status: "pending",
    payment_status: "pending",
    special_requests: "",
    cancellation_reason: "",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
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

    if (!form.booking_reference.trim()) {
      newErrors.booking_reference = "Booking reference is required";
    }

    if (!form.customer_id) {
      newErrors.customer_id = "Customer ID is required";
    }

    if (!form.schedule_id) {
      newErrors.schedule_id = "Schedule ID is required";
    }

    if (!form.number_of_travelers) {
      newErrors.number_of_travelers =
        "Number of travelers is required";
    }

    if (!form.number_of_adults) {
      newErrors.number_of_adults =
        "Number of adults is required";
    }

    if (form.number_of_children === "") {
      newErrors.number_of_children =
        "Number of children is required";
    }

    if (!form.total_price) {
      newErrors.total_price = "Total price is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit booking
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      const res = await http.post("/bookings/store", form);

      console.log("BOOKING SUCCESS:", res.data);

      setForm(initialForm);
      setErrors({});

      if (onbookingsAdded) {
        onbookingsAdded();
      }

      onClose();

    } catch (error) {
      console.log("BOOKING ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({
          general:
            error.response?.data?.message ||
            "Something went wrong while adding booking",
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
                Add Booking
              </h5>

              <button
                type="button"
                className="btn-close"
                onClick={resetAndClose}
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
                      className={`form-control ${
                        errors.booking_reference
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter booking reference"
                      value={form.booking_reference}
                      onChange={handleChange}
                    />

                    {errors.booking_reference && (
                      <div className="invalid-feedback">
                        {errors.booking_reference}
                      </div>
                    )}
                  </div>

                  {/* Customer ID */}
                  <div className="col-md-3">
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
                      placeholder="Customer ID"
                      value={form.customer_id}
                      onChange={handleChange}
                    />

                    {errors.customer_id && (
                      <div className="invalid-feedback">
                        {errors.customer_id}
                      </div>
                    )}
                  </div>

                  {/* Schedule ID */}
                  <div className="col-md-3">
                    <label className="form-label">
                      Schedule ID
                    </label>

                    <input
                      type="number"
                      name="schedule_id"
                      className={`form-control ${
                        errors.schedule_id
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Schedule ID"
                      value={form.schedule_id}
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
                      Number of Travelers
                    </label>

                    <input
                      type="number"
                      min="1"
                      name="number_of_travelers"
                      className={`form-control ${
                        errors.number_of_travelers
                          ? "is-invalid"
                          : ""
                      }`}
                      value={form.number_of_travelers}
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
                      Number of Adults
                    </label>

                    <input
                      type="number"
                      min="1"
                      name="number_of_adults"
                      className={`form-control ${
                        errors.number_of_adults
                          ? "is-invalid"
                          : ""
                      }`}
                      value={form.number_of_adults}
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
                      Number of Children
                    </label>

                    <input
                      type="number"
                      min="0"
                      name="number_of_children"
                      className={`form-control ${
                        errors.number_of_children
                          ? "is-invalid"
                          : ""
                      }`}
                      value={form.number_of_children}
                      onChange={handleChange}
                    />

                    {errors.number_of_children && (
                      <div className="invalid-feedback">
                        {errors.number_of_children}
                      </div>
                    )}
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
                      className={`form-control ${
                        errors.total_price
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter total price"
                      value={form.total_price}
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
                      Discount Applied
                    </label>

                    <input
                      type="text"
                      name="discount_applied"
                      className={`form-control ${
                        errors.discount_applied
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter discount"
                      value={form.discount_applied}
                      onChange={handleChange}
                    />

                    {errors.discount_applied && (
                      <div className="invalid-feedback">
                        {errors.discount_applied}
                      </div>
                    )}
                  </div>

                  {/* Booking Status */}
                  <div className="col-md-6">
                    <label className="form-label">
                      Booking Status
                    </label>

                    <select
                      name="booking_status"
                      className="form-select"
                      value={form.booking_status}
                      onChange={handleChange}
                    >
                      <option value="pending">
                        Pending
                      </option>

                      <option value="confirmed">
                        Confirmed
                      </option>

                      <option value="cancelled">
                        Cancelled
                      </option>

                      <option value="completed">
                        Completed
                      </option>
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
                      value={form.payment_status}
                      onChange={handleChange}
                    >
                      <option value="pending">
                        Pending
                      </option>

                      <option value="paid">
                        Paid
                      </option>

                      <option value="refunded">
                        Refunded
                      </option>

                      <option value="failed">
                        Failed
                      </option>
                    </select>
                  </div>

                  {/* Special Requests */}
                  <div className="col-12">
                    <label className="form-label">
                      Special Requests
                    </label>

                    <textarea
                      name="special_requests"
                      rows="3"
                      className="form-control"
                      placeholder="Enter special requests"
                      value={form.special_requests}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  {/* Cancellation Reason */}
                  <div className="col-12">
                    <label className="form-label">
                      Cancellation Reason
                    </label>

                    <textarea
                      name="cancellation_reason"
                      rows="2"
                      className="form-control"
                      placeholder="Enter cancellation reason"
                      value={form.cancellation_reason}
                      onChange={handleChange}
                    ></textarea>
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
                    : "Save Booking"}
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

export default AddBookingsModal;