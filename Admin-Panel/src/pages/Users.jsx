import React, { useEffect, useState } from "react";
import AuthUser from "../Auth/AuthUser";
import AddUserModal from "./users/AddUserModal";
import ViewUserModal from "./users/ViewUserModal";
import EditUserModal from "./users/EditUserModel";

const Users = () => {

  // =========================
  // USERS
  // =========================
  const [Users, setUsers] = useState([]);

  const [isRefresh, setIsRefresh] = useState(0);

  const { http } = AuthUser();


  // =========================
  // GET USERS
  // =========================
  const getusers = async () => {
    try {

      const res = await http.get("/user/list");

      console.log("USER LIST:", res.data);

      setUsers(res.data);

    } catch (err) {

      console.log("LIST ERROR:", err);

    }
  };


  // =========================
  // LOAD USERS
  // =========================
  useEffect(() => {

    getusers();

  }, [isRefresh]);


  // =========================
  // ADD USER MODAL
  // =========================
  const [showModal, setShowModal] = useState(false);


  // =========================
  // VIEW USER MODAL
  // =========================
  const [Viewuser, setViewuser] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);


  const Viewmodel = (data) => {

    setSelectedUser(data);

    setViewuser(true);
  };


  // =========================
  // EDIT USER MODAL
  // =========================
  const [Edituser, setEdituser] = useState(false);

  const [selectedEditUser, setSelectedEditUser] =
    useState(null);


  const Editmodel = (data) => {

    console.log("EDIT USER DATA:", data);

    setSelectedEditUser(data);

    setEdituser(true);
  };


  // =========================
  // DELETE USER
  // =========================
  const handleDelete = async (id) => {

    if (
      !window.confirm(
        "Are you sure you want to delete this user?"
      )
    ) {
      return;
    }

    try {

      const res = await http.delete(
        `/user/delete/${id}`
      );

      console.log(
        "DELETE SUCCESS:",
        res.data
      );

      // Refresh user list
      getusers();

    } catch (error) {

      console.log(
        "DELETE ERROR:",
        error
      );
    }
  };


  // =========================
  // REFRESH AFTER UPDATE
  // =========================
  const handleUserUpdated = () => {

    setEdituser(false);

    getusers();
  };


  return (
    <>

      {/* =========================
          BREADCRUMB
      ========================= */}
      <div className="page-header">

        <h3 className="fw-bold">
          Users
        </h3>

        <ul className="breadcrumbs"></ul>

      </div>


      {/* =========================
          TITLE + ADD BUTTON
      ========================= */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <button
          type="button"
          className="btn btn-attractive"
          onClick={() => setShowModal(true)}
        >

          <i className="fas fa-user-plus me-2"></i>

          Add Users

        </button>

      </div>


      {/* =========================
          TABLE CARD
      ========================= */}
      <div className="card shadow-sm">

        {/* CARD HEADER */}
        <div className="card-header bg-white">

          <div className="row g-3">

            <div className="col-md-4">

              <div className="input-group">

                <span className="input-group-text bg-white">

                  <i className="fa fa-search"></i>

                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search users..."
                />

              </div>

            </div>

          </div>

        </div>


        {/* =========================
            TABLE
        ========================= */}
        <div className="table-responsive">

          <table className="table table-hover align-middle mb-0">

            <thead className="table-light">

              <tr>

                <th>Username</th>

                <th>Email</th>

                <th>Full Name</th>

                <th>Role</th>

                <th>Profile Image</th>

                <th>Last Login</th>

                <th>Status</th>

                <th width="150">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {Users.length > 0 ? (

                Users.map((data) => (

                  <tr key={data._id}>

                    {/* USERNAME */}
                    <td>
                      {data.username}
                    </td>


                    {/* EMAIL */}
                    <td>
                      {data.email}
                    </td>


                    {/* FULL NAME */}
                    <td>
                      {data.full_name}
                    </td>


                    {/* ROLE */}
                    <td>

                      <span className="text-capitalize">
                        {data.role}
                      </span>

                    </td>


                    {/* PROFILE IMAGE */}
                    <td>

                      {data.profile_image ? (

                        <img
                          src={`http://localhost:3000/media/${data.profile_image}`}
                          alt={data.username}
                          width="50"
                          height="50"
                          style={{
                            objectFit: "cover",
                            borderRadius: "50%",
                          }}
                        />

                      ) : (

                        <span className="text-muted">
                          No Image
                        </span>

                      )}

                    </td>


                    {/* LAST LOGIN */}
                    <td>

                      {data.last_login
                        ? data.last_login
                        : "Never"}

                    </td>


                    {/* =========================
                        ACTIVE / INACTIVE
                    ========================= */}
                    <td>

                      {data.is_active ? (

                        <span className="badge bg-success">
                          Active
                        </span>

                      ) : (

                        <span className="badge bg-danger">
                          Inactive
                        </span>

                      )}

                    </td>


                    {/* =========================
                        ACTIONS
                    ========================= */}
                    <td
                      style={{
                        whiteSpace: "nowrap",
                      }}
                    >

                      {/* VIEW */}
                      <button
                        type="button"
                        className="btn btn-sm me-2"
                        onClick={() =>
                          Viewmodel(data)
                        }
                        style={{
                          background:
                            "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                          border: "none",
                          color: "white",
                          padding: "6px 14px",
                          borderRadius: "20px",
                          transition:
                            "all 0.3s ease",
                          boxShadow:
                            "0 4px 15px rgba(79, 172, 254, 0.3)",
                        }}
                        onMouseEnter={(e) => {

                          e.currentTarget.style.transform =
                            "translateY(-2px)";

                          e.currentTarget.style.boxShadow =
                            "0 6px 25px rgba(79, 172, 254, 0.5)";
                        }}
                        onMouseLeave={(e) => {

                          e.currentTarget.style.transform =
                            "translateY(0)";

                          e.currentTarget.style.boxShadow =
                            "0 4px 15px rgba(79, 172, 254, 0.3)";
                        }}
                      >

                        <i className="fa fa-eye me-1"></i>

                        View

                      </button>


                      {/* EDIT */}
                      <button
                        type="button"
                        className="btn btn-sm me-2"
                        onClick={() =>
                          Editmodel(data)
                        }
                        style={{
                          background:
                            "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
                          border: "none",
                          color: "white",
                          padding: "6px 14px",
                          borderRadius: "20px",
                          transition:
                            "all 0.3s ease",
                          boxShadow:
                            "0 4px 15px rgba(247, 151, 30, 0.3)",
                        }}
                        onMouseEnter={(e) => {

                          e.currentTarget.style.transform =
                            "translateY(-2px)";

                          e.currentTarget.style.boxShadow =
                            "0 6px 25px rgba(247, 151, 30, 0.5)";
                        }}
                        onMouseLeave={(e) => {

                          e.currentTarget.style.transform =
                            "translateY(0)";

                          e.currentTarget.style.boxShadow =
                            "0 4px 15px rgba(247, 151, 30, 0.3)";
                        }}
                      >

                        <i className="fa fa-edit me-1"></i>

                        Edit

                      </button>


                      {/* DELETE */}
                      <button
                        type="button"
                        className="btn btn-sm"
                        onClick={() =>
                          handleDelete(data._id)
                        }
                        style={{
                          background:
                            "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                          border: "none",
                          color: "white",
                          padding: "6px 14px",
                          borderRadius: "20px",
                          transition:
                            "all 0.3s ease",
                          boxShadow:
                            "0 4px 15px rgba(245, 87, 108, 0.3)",
                        }}
                        onMouseEnter={(e) => {

                          e.currentTarget.style.transform =
                            "translateY(-2px)";

                          e.currentTarget.style.boxShadow =
                            "0 6px 25px rgba(245, 87, 108, 0.5)";
                        }}
                        onMouseLeave={(e) => {

                          e.currentTarget.style.transform =
                            "translateY(0)";

                          e.currentTarget.style.boxShadow =
                            "0 4px 15px rgba(245, 87, 108, 0.3)";
                        }}
                      >

                        <i className="fa fa-trash me-1"></i>

                        Delete

                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="8"
                    className="text-center py-4"
                  >

                    No users found

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* =========================
          ADD USER MODAL
      ========================= */}
      <AddUserModal
        showModal={showModal}
        setShowModal={setShowModal}
        closeAddModal={() =>
          setShowModal(false)
        }
        isRefresh={isRefresh}
        setIsRefresh={setIsRefresh}
      />


      {/* =========================
          VIEW USER MODAL
      ========================= */}
      <ViewUserModal
        show={Viewuser}
        onClose={() =>
          setViewuser(false)
        }
        user={selectedUser}
      />


      {/* =========================
          EDIT USER MODAL
      ========================= */}
      <EditUserModal
        show={Edituser}
        onClose={() =>
          setEdituser(false)
        }
        user={selectedEditUser}
        onUserUpdated={handleUserUpdated}
      />


      {/* =========================
          BUTTON CSS
      ========================= */}
      <style>{`

        .btn-attractive {

          background:
            linear-gradient(
              135deg,
              #667eea 0%,
              #764ba2 100%
            );

          border: none;

          border-radius: 50px;

          padding: 12px 30px;

          color: white;

          font-weight: 600;

          box-shadow:
            0 4px 15px
            rgba(102, 126, 234, 0.4);

          transition:
            all 0.3s ease;

          position: relative;

          overflow: hidden;
        }


        .btn-attractive:hover {

          transform:
            translateY(-3px);

          box-shadow:
            0 8px 25px
            rgba(102, 126, 234, 0.6);

          color: white;
        }


        .btn-attractive:active {

          transform:
            scale(0.95);
        }


        .btn-attractive::before {

          content: '';

          position: absolute;

          top: -50%;

          left: -50%;

          width: 200%;

          height: 200%;

          background:
            linear-gradient(
              45deg,
              transparent 0%,
              rgba(255,255,255,0.1) 50%,
              transparent 100%
            );

          transform:
            rotate(45deg)
            translateX(-100%);

          transition:
            all 0.6s ease;
        }


        .btn-attractive:hover::before {

          transform:
            rotate(45deg)
            translateX(100%);
        }

      `}</style>

    </>
  );
};

export default Users;