  import React from 'react'

  const ViewUserModal = ({ show, onClose, user }) => {

    if (!show || !user) return null

    return (
      <>
        {/* Backdrop */}
        <div className="modal-backdrop fade show"></div>

        {/* Modal */}
        <div
          className="modal fade show"
          style={{ display: 'block' }}
          tabIndex="-1"
          role="dialog"
          onClick={onClose}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="fas fa-user me-2"></i>
                  User Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onClose}
                ></button>
              </div>

              <div className="modal-body">
                <div className="d-flex flex-column align-items-center mb-4">
                  <img
                        src={`http://localhost:3000/media/${user.profile_image}`}
                        alt={user.username}
                        width="50"
                        height="50"
                        style={{
                          objectFit: "cover",
                          borderRadius: "50%"
                        }}
                      />
                  <h5 className="mt-3 mb-0">{user.full_name}</h5>
                  <span className="badge bg-success mt-1">
                    {user.isactive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <table className="table table-borderless mb-0">
                  <tbody>
                    <tr>
                      <th style={{ width: '40%' }}>Username</th>
                      <td>{user.username}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{user.email}</td>
                    </tr>
                    <tr>
                      <th>Full Name</th>
                      <td>{user.full_name}</td>
                    </tr>
                    <tr>
                      <th>Role</th>
                      <td className="text-capitalize">{user.role}</td>
                    </tr>
                    <tr>
                      <th>Last Login</th>
                      <td>{user.last_login || 'Never'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  export default ViewUserModal
