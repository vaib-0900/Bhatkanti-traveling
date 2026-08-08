import React from 'react'

const ViewTourschedulesModal = ({ show, onClose, tourschedules }) => {

  if (!show || !tourschedules) return null

  const user = tourschedules

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
                <i className="fas fa-route me-2"></i>
                Tour Schedule Details
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">
              <div className="d-flex flex-column align-items-center mb-4">
                <div
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    border: '2px solid #eee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#f8f9fa',
                  }}
                >
                  <i className="fas fa-plane-departure fa-lg text-secondary"></i>
                </div>
                <h5 className="mt-3 mb-0">Package #{user.package_id}</h5>
                <span className={`badge mt-1 ${user.isactive ? 'bg-success' : 'bg-secondary'}`}>
                  {user.isactive ? 'Active' : 'Inactive'}
                </span>
                {user.is_cancelled ? (
                  <span className="badge bg-danger mt-1">Cancelled</span>
                ) : null}
              </div>

              <table className="table table-borderless mb-0">
                <tbody>
                  <tr>
                    <th style={{ width: '40%' }}>Package ID</th>
                    <td>{user.package_id}</td>
                  </tr>
                  <tr>
                    <th>Departure Date</th>
                    <td>{user.departure_date}</td>
                  </tr>
                  <tr>
                    <th>Return Date</th>
                    <td>{user.return_date}</td>
                  </tr>
                  <tr>
                    <th>Available Seats</th>
                    <td>{user.available_seats}</td>
                  </tr>
                  <tr>
                    <th>Total Seats</th>
                    <td>{user.total_seats}</td>
                  </tr>
                  <tr>
                    <th>Price Override</th>
                    <td>{user.price_override || 'Default'}</td>
                  </tr>
                  <tr>
                    <th>Cancelled</th>
                    <td>{user.is_cancelled ? 'Yes' : 'No'}</td>
                  </tr>
                  <tr>
                    <th>Notes</th>
                    <td>{user.notes || '-'}</td>
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

export default ViewTourschedulesModal
