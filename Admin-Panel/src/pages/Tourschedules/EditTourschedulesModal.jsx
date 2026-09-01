import React, { useEffect, useState } from "react";
import AuthUser from "../../Auth/AuthUser";

const EditTourschedulesModal = ({
  show,
  onClose,
  tourschedule,
  onTourscheduleUpdated,
}) => {
  const { http } = AuthUser();

  const emptyForm = {
    package_id: "",
    departure_date: "",
    return_date: "",
    available_seats: "",
    total_seats: "",
    is_cancelled: false,
    price_override: "",
    notes: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Convert any ISO/date-ish value into the yyyy-MM-dd shape
  // <input type="date"> requires
  const toDateInputValue = (value) => {
    if (!value) return "";

    const d = new Date(value);
    if (isNaN(d.getTime())) return "";

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Prefill form whenever the modal opens with a tour schedule selected for editing
  useEffect(() => {
    if (show && tourschedule) {
      setForm({
        package_id: tourschedule.package_id || "",
        departure_date: toDateInputValue(tourschedule.departure_date),
        return_date: toDateInputValue(tourschedule.return_date),
        available_seats: tourschedule.available_seats || "",
        total_seats: tourschedule.total_seats || "",
        is_cancelled: !!tourschedule.is_cancelled,
        price_override: tourschedule.price_override || "",
        notes: tourschedule.notes || "",
      });
      setErrors({});
    } else if (!show) {
      setForm(emptyForm);
    }
  }, [show, tourschedule]);

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
    }));
  };

  // Close modal and reset errors
  const resetAndClose = () => {
    setErrors({});
    setSubmitting(false);
    onClose();
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!form.package_id.toString().trim()) {
      newErrors.package_id = "Package ID is required";
    }

    if (!form.departure_date) {
      newErrors.departure_date = "Departure date is required";
    }

    if (!form.return_date) {
      newErrors.return_date = "Return date is required";
    }

    if (
      form.departure_date &&
      form.return_date &&
      form.return_date < form.departure_date
    ) {
      newErrors.return_date = "Return date cannot be before departure date";
    }

    if (!form.total_seats) {
      newErrors.total_seats = "Total seats is required";
    }

    if (!form.available_seats) {
      newErrors.available_seats = "Available seats is required";
    }

    if (
      form.total_seats &&
      form.available_seats &&
      Number(form.available_seats) > Number(form.total_seats)
    ) {
      newErrors.available_seats = "Available seats cannot exceed total seats";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit updated tour schedule
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Backend reads the id from req.body._id (see `updated` controller),
    // so the Mongo _id has to travel in the payload, not the URL.
    const tourscheduleId = tourschedule?._id;

    if (!tourschedule || !tourscheduleId) {
      setErrors({
        general: "No tour schedule selected to update.",
      });
      return;
    }

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        _id: tourscheduleId,
        ...form,
      };

      const res = await http.put("/tourschedule/update", payload);

      console.log("TOURSCHEDULE UPDATE SUCCESS:", res.data);

      setErrors({});

      if (onTourscheduleUpdated) {
        onTourscheduleUpdated();
      }

      onClose();
    } catch (error) {
      console.log("TOURSCHEDULE UPDATE ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({
          general:
            error.response?.data?.message ||
            "Something went wrong while updating tour schedule",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!show || !tourschedule) {
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
              <h5 className="modal-title fw-bold">Edit Tour Schedule</h5>

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
                  <div className="alert alert-danger">{errors.general}</div>
                )}

                <div className="row g-3">
                  {/* Package ID */}
                  <div className="col-md-6">
                    <label className="form-label">Package ID</label>

                    <input
                      type="text"
                      name="package_id"
                      className={`form-control ${
                        errors.package_id ? "is-invalid" : ""
                      }`}
                      placeholder="Enter package ID"
                      value={form.package_id}
                      onChange={handleChange}
                    />

                    {errors.package_id && (
                      <div className="invalid-feedback">
                        {errors.package_id}
                      </div>
                    )}
                  </div>

                  {/* Total Seats */}
                  <div className="col-md-6">
                    <label className="form-label">Total Seats</label>

                    <input
                      type="number"
                      min="0"
                      name="total_seats"
                      className={`form-control ${
                        errors.total_seats ? "is-invalid" : ""
                      }`}
                      placeholder="Enter total seats"
                      value={form.total_seats}
                      onChange={handleChange}
                    />

                    {errors.total_seats && (
                      <div className="invalid-feedback">
                        {errors.total_seats}
                      </div>
                    )}
                  </div>

                  {/* Departure Date */}
                  <div className="col-md-6">
                    <label className="form-label">Departure Date</label>

                    <input
                      type="date"
                      name="departure_date"
                      className={`form-control ${
                        errors.departure_date ? "is-invalid" : ""
                      }`}
                      value={form.departure_date}
                      onChange={handleChange}
                    />

                    {errors.departure_date && (
                      <div className="invalid-feedback">
                        {errors.departure_date}
                      </div>
                    )}
                  </div>

                  {/* Return Date */}
                  <div className="col-md-6">
                    <label className="form-label">Return Date</label>

                    <input
                      type="date"
                      name="return_date"
                      className={`form-control ${
                        errors.return_date ? "is-invalid" : ""
                      }`}
                      value={form.return_date}
                      onChange={handleChange}
                    />

                    {errors.return_date && (
                      <div className="invalid-feedback">
                        {errors.return_date}
                      </div>
                    )}
                  </div>

                  {/* Available Seats */}
                  <div className="col-md-6">
                    <label className="form-label">Available Seats</label>

                    <input
                      type="number"
                      min="0"
                      name="available_seats"
                      className={`form-control ${
                        errors.available_seats ? "is-invalid" : ""
                      }`}
                      placeholder="Enter available seats"
                      value={form.available_seats}
                      onChange={handleChange}
                    />

                    {errors.available_seats && (
                      <div className="invalid-feedback">
                        {errors.available_seats}
                      </div>
                    )}
                  </div>

                  {/* Price Override */}
                  <div className="col-md-6">
                    <label className="form-label">Price Override</label>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      name="price_override"
                      className={`form-control ${
                        errors.price_override ? "is-invalid" : ""
                      }`}
                      placeholder="Enter price override"
                      value={form.price_override}
                      onChange={handleChange}
                    />

                    {errors.price_override && (
                      <div className="invalid-feedback">
                        {errors.price_override}
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  <div className="col-12">
                    <label className="form-label">Notes</label>

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
                      <div className="invalid-feedback">{errors.notes}</div>
                    )}
                  </div>

                  {/* Cancelled */}
                  <div className="col-md-6">
                    <div className="form-check form-switch mt-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="edit_is_cancelled"
                        name="is_cancelled"
                        checked={form.is_cancelled}
                        onChange={handleChange}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="edit_is_cancelled"
                      >
                        Cancelled
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
                  {submitting ? "Updating..." : "Update Tour Schedule"}
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

export default EditTourschedulesModal;