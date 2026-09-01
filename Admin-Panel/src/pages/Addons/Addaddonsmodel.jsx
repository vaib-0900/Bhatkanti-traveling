import React, { useState } from "react";
import AuthUser from "../../Auth/AuthUser";

const AddAddonsModal = ({ show, onClose, onaddonsAdded }) => {
  const { http } = AuthUser();

  const initialForm = {
    addon_name: "",
    description: "",
    price: "",
    currency: "",
    is_per_person: true,
    is_active: true,
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

    if (!form.addon_name.trim()) {
      newErrors.addon_name = "Addon name is required";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!form.price) {
      newErrors.price = "Price is required";
    }

    if (!form.currency.trim()) {
      newErrors.currency = "Currency is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit addon
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      const res = await http.post("/addons/store", form);

      console.log("ADDON SUCCESS:", res.data);

      setForm(initialForm);
      setErrors({});

      if (onaddonsAdded) {
        onaddonsAdded();
      }

      onClose();

    } catch (error) {
      console.log("ADDON ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({
          general:
            error.response?.data?.message ||
            "Something went wrong while adding addon",
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
                Add Addon
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

                  {/* Addon Name */}
                  <div className="col-md-8">
                    <label className="form-label">
                      Addon Name
                    </label>

                    <input
                      type="text"
                      name="addon_name"
                      className={`form-control ${
                        errors.addon_name
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter addon name"
                      value={form.addon_name}
                      onChange={handleChange}
                    />

                    {errors.addon_name && (
                      <div className="invalid-feedback">
                        {errors.addon_name}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="col-12">
                    <label className="form-label">
                      Description
                    </label>

                    <textarea
                      name="description"
                      rows="3"
                      className={`form-control ${
                        errors.description
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter description"
                      value={form.description}
                      onChange={handleChange}
                    ></textarea>

                    {errors.description && (
                      <div className="invalid-feedback">
                        {errors.description}
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="col-md-6">
                    <label className="form-label">
                      Price
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      name="price"
                      className={`form-control ${
                        errors.price
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter price"
                      value={form.price}
                      onChange={handleChange}
                    />

                    {errors.price && (
                      <div className="invalid-feedback">
                        {errors.price}
                      </div>
                    )}
                  </div>

                  {/* Currency */}
                  <div className="col-md-6">
                    <label className="form-label">
                      Currency
                    </label>

                    <input
                      type="text"
                      name="currency"
                      className={`form-control ${
                        errors.currency
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter currency"
                      value={form.currency}
                      onChange={handleChange}
                    />

                    {errors.currency && (
                      <div className="invalid-feedback">
                        {errors.currency}
                      </div>
                    )}
                  </div>

                  {/* Per Person Pricing */}
                  <div className="col-md-6">
                    <div className="form-check form-switch mt-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="is_per_person"
                        name="is_per_person"
                        checked={form.is_per_person}
                        onChange={handleChange}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="is_per_person"
                      >
                        Per Person Pricing
                      </label>
                    </div>
                  </div>

                  {/* Active */}
                  <div className="col-md-6">
                    <div className="form-check form-switch mt-2">
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
                    : "Save Addon"}
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

export default AddAddonsModal;