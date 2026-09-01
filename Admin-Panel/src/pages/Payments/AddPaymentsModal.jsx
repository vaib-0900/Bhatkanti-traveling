import React, { useState } from "react";
import AuthUser from "../../Auth/AuthUser";

const AddPaymentsModal = ({ show, onClose, onpaymentsAdded }) => {
  const { http } = AuthUser();

  const initialForm = {
    booking_id: "",
    payment_reference: "",
    amount: "",
    currency: "",
    payment_method: "",
    transaction_id: "",
    refund_reason: "",
    notes: "",
    processed_by: "",
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

    if (!form.booking_id) {
      newErrors.booking_id = "Booking ID is required";
    }

    if (!form.payment_reference.trim()) {
      newErrors.payment_reference = "Payment reference is required";
    }

    if (!form.amount) {
      newErrors.amount = "Amount is required";
    } else if (Number(form.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!form.currency.trim()) {
      newErrors.currency = "Currency is required";
    }

    if (!form.payment_method.trim()) {
      newErrors.payment_method = "Payment method is required";
    }

    if (!form.transaction_id.trim()) {
      newErrors.transaction_id = "Transaction ID is required";
    }

    if (!form.processed_by) {
      newErrors.processed_by = "Processed by is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit payment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        booking_id: Number(form.booking_id),
        payment_reference: form.payment_reference,
        amount: Number(form.amount),
        currency: form.currency,
        payment_method: form.payment_method,
        transaction_id: form.transaction_id,
        refund_reason: form.refund_reason,
        notes: form.notes,
        processed_by: Number(form.processed_by),
      };

      const res = await http.post("/payments/store", payload);

      console.log("PAYMENT SUCCESS:", res.data);

      setForm(initialForm);
      setErrors({});

      if (onpaymentsAdded) {
        onpaymentsAdded();
      }

      onClose();

    } catch (error) {
      console.log("PAYMENT ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({
          general:
            error.response?.data?.message ||
            "Something went wrong while adding payment",
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
                Add Payment
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
                      Booking ID
                    </label>

                    <input
                      type="number"
                      name="booking_id"
                      className={`form-control ${
                        errors.booking_id ? "is-invalid" : ""
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

                  {/* Payment Reference */}
                  <div className="col-md-6">
                    <label className="form-label">
                      Payment Reference
                    </label>

                    <input
                      type="text"
                      name="payment_reference"
                      className={`form-control ${
                        errors.payment_reference ? "is-invalid" : ""
                      }`}
                      placeholder="Enter payment reference"
                      value={form.payment_reference}
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
                      className={`form-control ${
                        errors.amount ? "is-invalid" : ""
                      }`}
                      placeholder="Enter amount"
                      value={form.amount}
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
                      className={`form-control ${
                        errors.currency ? "is-invalid" : ""
                      }`}
                      placeholder="e.g. USD"
                      value={form.currency}
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
                      className={`form-select ${
                        errors.payment_method ? "is-invalid" : ""
                      }`}
                      value={form.payment_method}
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
                      className={`form-control ${
                        errors.transaction_id ? "is-invalid" : ""
                      }`}
                      placeholder="Enter transaction ID"
                      value={form.transaction_id}
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
                      className={`form-control ${
                        errors.processed_by ? "is-invalid" : ""
                      }`}
                      placeholder="Enter staff/user ID"
                      value={form.processed_by}
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
                      className={`form-control ${
                        errors.refund_reason ? "is-invalid" : ""
                      }`}
                      placeholder="Enter refund reason (if applicable)"
                      value={form.refund_reason}
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
                      className={`form-control ${
                        errors.notes ? "is-invalid" : ""
                      }`}
                      placeholder="Enter notes"
                      value={form.notes}
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
                  disabled={submitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-attractive"
                  disabled={submitting}
                >
                  {submitting ? "Saving..." : "Save Payment"}
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

export default AddPaymentsModal;