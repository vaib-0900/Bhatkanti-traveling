import React, { useEffect, useState } from "react";
import AuthUser from "../../Auth/AuthUser";

const EditUserModal = ({
  show,
  onClose,
  user,
  onUserUpdated,
}) => {

  const { http } = AuthUser();

  // =========================
  // FORM DATA
  // =========================
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    full_name: "",
    role: "",
    is_active: true,
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  // =========================
  // LOAD USER DATA
  // =========================
  useEffect(() => {
    if (user) {

      console.log("EDIT USER:", user);

      setFormData({
        username: user.username || "",
        email: user.email || "",
        full_name: user.full_name || "",
        role: user.role || "",

        // IMPORTANT
        is_active:
          user.is_active === true ||
          user.is_active === "true" ||
          user.is_active === 1 ||
          user.is_active === "1",
      });

      setPreviewImage(
        user.profile_image
          ? `http://localhost:3000/media/${user.profile_image}`
          : null
      );

      setProfileImage(null);
      setErrors({});
    }
  }, [user]);


  // =========================
  // CLOSE MODAL
  // =========================
  if (!show) {
    return null;
  }


  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    // Remove error
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };


  // =========================
  // IMAGE CHANGE
  // =========================
  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      setProfileImage(file);

      setPreviewImage(
        URL.createObjectURL(file)
      );
    }
  };


  // =========================
  // EMAIL VALIDATION
  // =========================
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };


  // =========================
  // VALIDATION
  // =========================
  const validate = () => {

    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {

      newErrors.email = "Email is required";

    } else if (!isValidEmail(formData.email.trim())) {

      newErrors.email =
        "Enter a valid email address";
    }

    if (!formData.full_name.trim()) {
      newErrors.full_name =
        "Full name is required";
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  // =========================
  // GET USER ID
  // =========================
  const getUserId = (u) => {

    return (
      u?._id ??
      u?.id ??
      u?.user_id ??
      u?.userId ??
      null
    );
  };


  // =========================
  // UPDATE USER
  // =========================
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate() || !user) {
      return;
    }

    const userId = getUserId(user);

    console.log("USER ID:", userId);

    if (!userId) {

      setErrors({
        general:
          "Could not determine user id.",
      });

      return;
    }

    setIsSubmitting(true);

    try {

      const payload = new FormData();

      // User ID
      payload.append("_id", userId);

      // User details
      payload.append(
        "username",
        formData.username.trim()
      );

      payload.append(
        "email",
        formData.email.trim()
      );

      payload.append(
        "full_name",
        formData.full_name.trim()
      );

      payload.append(
        "role",
        formData.role
      );

      // IMPORTANT
      // Active = "true"
      // Inactive = "false"
      payload.append(
        "is_active",
        formData.is_active
          ? "true"
          : "false"
      );


      // Image
      if (profileImage) {

        payload.append(
          "image",
          profileImage
        );
      }


      // Debug
      for (let pair of payload.entries()) {
        console.log(
          pair[0],
          pair[1]
        );
      }


      // API
      const response = await http.put(
        "/user/update",
        payload,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      console.log(
        "UPDATE RESPONSE:",
        response.data
      );


      // Refresh users
      if (onUserUpdated) {
        onUserUpdated();
      }

      // Close modal
      onClose();

    } catch (err) {

      console.log(
        "UPDATE ERROR:",
        err
      );

      if (
        err?.response?.data?.errors
      ) {

        setErrors(
          err.response.data.errors
        );

      } else {

        setErrors({
          general:
            err?.response?.data?.message ||
            "Something went wrong while updating the user.",
        });
      }

    } finally {

      setIsSubmitting(false);
    }
  };


  // =========================
  // UI
  // =========================
  return (

    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{
        backgroundColor:
          "rgba(0,0,0,0.5)",
      }}
    >

      <div className="modal-dialog modal-dialog-centered">

        <div className="modal-content">

          <form onSubmit={handleSubmit}>

            {/* HEADER */}
            <div className="modal-header">

              <h5 className="modal-title">
                Edit User
              </h5>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                disabled={isSubmitting}
              />

            </div>


            {/* BODY */}
            <div className="modal-body">

              {/* GENERAL ERROR */}
              {errors.general && (

                <div className="alert alert-danger py-2">

                  {errors.general}

                </div>

              )}


              {/* PROFILE IMAGE */}
              <div className="text-center mb-3">

                <img
                  src={
                    previewImage ||
                    "https://via.placeholder.com/90?text=No+Image"
                  }
                  alt="profile"
                  width="90"
                  height="90"
                  style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />

                <div className="mt-2">

                  <input
                    type="file"
                    accept="image/*"
                    className="form-control form-control-sm"
                    onChange={handleImageChange}
                  />

                </div>

              </div>


              {/* USERNAME */}
              <div className="mb-3">

                <label className="form-label">
                  Username
                </label>

                <input
                  type="text"
                  name="username"
                  className={`form-control ${
                    errors.username
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formData.username}
                  onChange={handleChange}
                />

                {errors.username && (

                  <div className="invalid-feedback">
                    {errors.username}
                  </div>

                )}

              </div>


              {/* EMAIL */}
              <div className="mb-3">

                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  className={`form-control ${
                    errors.email
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                />

                {errors.email && (

                  <div className="invalid-feedback">
                    {errors.email}
                  </div>

                )}

              </div>


              {/* FULL NAME */}
              <div className="mb-3">

                <label className="form-label">
                  Full Name
                </label>

                <input
                  type="text"
                  name="full_name"
                  className={`form-control ${
                    errors.full_name
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formData.full_name}
                  onChange={handleChange}
                />

                {errors.full_name && (

                  <div className="invalid-feedback">
                    {errors.full_name}
                  </div>

                )}

              </div>


              {/* ROLE */}
              <div className="mb-3">

                <label className="form-label">
                  Role
                </label>

                <select
                  name="role"
                  className={`form-select ${
                    errors.role
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formData.role}
                  onChange={handleChange}
                >

                  <option value="">
                    Select role
                  </option>

                  <option value="admin">
                    Admin
                  </option>

                  <option value="manager">
                    Manager
                  </option>

                  <option value="agent">
                    Agent
                  </option>

                </select>

                {errors.role && (

                  <div className="invalid-feedback">
                    {errors.role}
                  </div>

                )}

              </div>


              {/* ACTIVE / INACTIVE */}
              <div className="mb-3">

                <div className="form-check form-switch">

                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="is_active"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                  />

                  <label
                    className="form-check-label"
                    htmlFor="is_active"
                  >

                    {formData.is_active
                      ? "Active"
                      : "Inactive"}

                  </label>

                </div>

              </div>

            </div>


            {/* FOOTER */}
            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >

                {isSubmitting
                  ? "Saving..."
                  : "Save Changes"}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default EditUserModal;