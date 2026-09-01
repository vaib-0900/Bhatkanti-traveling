import React, { useState } from "react";
import AuthUser from "../../Auth/AuthUser";


const AddUserModel = ({
  showModal,
  setShowModal,
  closeAddModal,
  isRefresh,
  setIsRefresh,
}) => {
  const [userData, setuserData] = useState({
    username: "",
    email: "",
    full_name: "",
    role: "",
    password: "",
    profile_image: null,
  });
  const { https } = AuthUser ();

  const handleSaveUser = () => {
    const formData = new FormData();

    formData.append("username", userData.username);
    formData.append("email", userData.email);
    formData.append("full_name", userData.full_name);
    formData.append("role", userData.role);
    formData.append("password", userData.password);

    if (userData.profile_image) {
      formData.append("image", userData.profile_image);
    }

    https
      .post("/user/store", formData)
      .then((res) => {
        console.log("SUCCESS:", res.data);

        setIsRefresh((prev) => prev + 1);
        setShowModal(false);

        setuserData({
          username: "",
          email: "",
          full_name: "",
          role: "",
          password: "",
          profile_image: null,
        });
      })
      .catch((err) => {
        console.log("STATUS:", err.response?.status);
        console.log("DATA:", err.response?.data);
        console.log("ERROR:", err);
      });
  };
  return (
    <>
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{
            background: "rgba(15,23,42,0.35)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            zIndex: 1055,
          }}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg">
              {/* Header */}
              <div
                className="modal-header border-0 px-4 py-3"
                style={{ background: "#4F46E5" }}
              >
                <div className="d-flex justify-content-between align-items-center w-100">
                  <div>
                    <h4 className="fw-bold mb-1 text-white">Add New User</h4>
                    <small className="text-white-50">
                      Create a new user account
                    </small>
                  </div>

                  <button
                    className="btn btn-light rounded-circle"
                    onClick={() => setShowModal(false)}
                    style={{ width: 40, height: 40 }}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="modal-body px-4">
                <form>
                  {/* Profile Image */}
                  <div className="text-center mb-4">
                    <label
                      htmlFor="profileImage"
                      className="border border-2 border-dashed rounded-4 p-4 d-flex flex-column align-items-center justify-content-center"
                      style={{
                        width: "180px",
                        height: "220px",
                        margin: "0 auto",
                        cursor: "pointer",
                        background: "#F8FAFC",
                        transition: "0.3s",
                      }}
                    >
                      {userData.profile_image ? (
                        <img
                          src={URL.createObjectURL(userData.profile_image)}
                          alt="Profile"
                          className="rounded-4"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <>
                          <i
                            className="bi bi-cloud-arrow-up"
                            style={{
                              fontSize: "45px",
                              color: "#2563EB",
                            }}
                          ></i>

                          <h6 className="mt-3 mb-1 fw-bold">Upload Photo</h6>

                          <small className="text-muted">JPG, PNG or JPEG</small>
                        </>
                      )}
                    </label>

                    <input
                      type="file"
                      id="profileImage"
                      className="d-none"
                      accept="image/*"
                      onChange={(e) =>
                        setuserData({
                          ...userData,
                          profile_image: e.target.files[0],
                        })
                      }
                    />
                  </div>

                  {/* User Information */}
                  <h5 className="fw-bold mb-3">User Information</h5>

                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label">Full Name</label>

                      <input
                        type="text"
                        className="form-control"
                        name="full_name"
                        placeholder="Enter Full Name"
                        value={userData.full_name}
                        onChange={(e) =>
                          setuserData({
                            ...userData,
                            full_name: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Username</label>

                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        placeholder="Enter Username"
                        value={userData.username}
                        onChange={(e) =>
                          setuserData({
                            ...userData,
                            username: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Email</label>

                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Enter Email"
                        value={userData.email}
                        onChange={(e) =>
                          setuserData({
                            ...userData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Password</label>

                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Enter Password"
                        value={userData.password}
                        onChange={(e) =>
                          setuserData({
                            ...userData,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Role</label>

                      <select
                        className="form-select"
                        name="role"
                        value={userData.role}
                        onChange={(e) =>
                          setuserData({
                            ...userData,
                            role: e.target.value,
                          })
                        }
                      >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="agent">Agent</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>

              {/* Footer */}
              <div className="modal-footer border-0">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary px-4"
                  onClick={handleSaveUser}
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddUserModel;