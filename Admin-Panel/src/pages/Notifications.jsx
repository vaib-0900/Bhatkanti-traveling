import React, { useEffect, useState } from 'react'
import AuthUser from '../Auth/AuthUser'
import AddNotificationsModal from './Notifications/AddNotificationsModal'
import ViewNotificationsModal from './Notifications/ViewNotificationsModal'
import EditNotificationsModal from './Notifications/EditNotificationsModal'





const Notifications = () => {
    const [Notifications, setnotifications] = useState([])
    const { http } = AuthUser()
    const getnotifications = async () => {
        await http.get("/notifications/list")
            .then((res) => {
                setnotifications(res.data)
            }).catch((err) => {
                console.log(err)
                console.log("Error in notifications")
            })
    }
    useEffect(() => {
        getnotifications()
    }, [])

    const [AddNotifications, setAddnotifications] = useState(false)
    const Addmodel = () => {
        setAddnotifications(true)
    }

    const [ViewNotifications, setViewnotifications] = useState(false)
    const [selectednotifications, setSelectednotifications] = useState(null)
    const Viewmodel = (data) => {
        setSelectednotifications(data)
        setViewnotifications(true)
    }

    const [EditNotifications, setEditnotifications] = useState(false)
    const [selectedEditNotification, setSelectedEditNotification] = useState(null)
    const Editmodel = (data) => {
        setSelectedEditNotification(data)
        setEditnotifications(true)
    }


    return (
        <>
            {/* Breadcrumb */}
            <div className="page-header">
                <h3 className="fw-bold">Notifications</h3>
                <ul className="breadcrumbs">

                </ul>
            </div>

            {/* Title */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <button className="btn btn-attractive" onClick={Addmodel}>
                    <i className="fas fa-user-plus me-2"></i>
                    Add Notifications
                </button>

            </div>

            {/* Table */}
            <div className="card shadow-sm">

                <div className="card-header bg-white">

                    <div className="row g-3">

                        <div className="col-md-4">
                            <div className="input-group">
                                <span className="input-group-text bg-white">
                                    <i className="fa fa-search"></i>
                                </span>

                                <input
                                    className="form-control"
                                    placeholder="Search Notifications..."
                                />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                        <thead className="table-light">
                            <tr>
                                <th>recipient_type</th>
                                <th>recipient_id_type</th>
                                <th>subject</th>
                                <th>message</th>
                                <th>sent_via</th>
                                <th>Read</th>
                                <th>status</th>
                                <th width="150">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Notifications.length > 0 && Notifications.map((data, key) => (
                                <tr key={key}>
                                    <td>
                                        <span className="badge bg-secondary text-capitalize">
                                            {data.recipient_type}
                                        </span>
                                    </td>
                                    <td>{data.recipient_id_type}</td>
                                    <td>{data.subject}</td>
                                    <td style={{ maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {data.message}
                                    </td>
                                    <td className="text-capitalize">{data.sent_via}</td>
                                    <td>
                                        <span className={`badge ${data.is_read ? 'bg-success' : 'bg-secondary'}`}>
                                            {data.is_read ? "Read" : "Unread"}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge text-capitalize ${data.status === 'sent' ? 'bg-success' : data.status === 'pending' ? 'bg-warning text-dark' : data.status === 'failed' ? 'bg-danger' : 'bg-secondary'}`}>
                                            {data.status}
                                        </span>
                                    </td>
                                    <td style={{ whiteSpace: 'nowrap' }}>
                                        {/* View Button */}
                                        <button
                                            className="btn btn-sm me-2"
                                            onClick={() => Viewmodel(data)}
                                            style={{
                                                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                                border: 'none',
                                                color: 'white',
                                                padding: '6px 14px',
                                                borderRadius: '20px',
                                                transition: 'all 0.3s ease',
                                                boxShadow: '0 4px 15px rgba(79, 172, 254, 0.3)'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.transform = 'translateY(-2px)';
                                                e.target.style.boxShadow = '0 6px 25px rgba(79, 172, 254, 0.5)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.transform = 'translateY(0)';
                                                e.target.style.boxShadow = '0 4px 15px rgba(79, 172, 254, 0.3)';
                                            }}
                                        >
                                            <i className="fa fa-eye me-1"></i> View
                                        </button>

                                        {/* Edit Button */}
                                        <button
                                            className="btn btn-sm me-2"
                                            onClick={() => Editmodel(data)}
                                            style={{
                                                background: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
                                                border: 'none',
                                                color: 'white',
                                                padding: '6px 14px',
                                                borderRadius: '20px',
                                                transition: 'all 0.3s ease',
                                                boxShadow: '0 4px 15px rgba(247, 151, 30, 0.3)'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.transform = 'translateY(-2px)';
                                                e.target.style.boxShadow = '0 6px 25px rgba(247, 151, 30, 0.5)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.transform = 'translateY(0)';
                                                e.target.style.boxShadow = '0 4px 15px rgba(247, 151, 30, 0.3)';
                                            }}
                                        >
                                            <i className="fa fa-edit me-1"></i> Edit
                                        </button>

                                        {/* Delete Button */}
                                        <button
                                            className="btn btn-sm"
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to delete this item?')) {
                                                    console.log('Deleted:', data);
                                                }
                                            }}
                                            style={{
                                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                                border: 'none',
                                                color: 'white',
                                                padding: '6px 14px',
                                                borderRadius: '20px',
                                                transition: 'all 0.3s ease',
                                                boxShadow: '0 4px 15px rgba(245, 87, 108, 0.3)'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.transform = 'translateY(-2px)';
                                                e.target.style.boxShadow = '0 6px 25px rgba(245, 87, 108, 0.5)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.transform = 'translateY(0)';
                                                e.target.style.boxShadow = '0 4px 15px rgba(245, 87, 108, 0.3)';
                                            }}
                                        >
                                            <i className="fa fa-trash me-1"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Add Notification Modal */}
            <AddNotificationsModal
                show={AddNotifications}
                onClose={() => setAddnotifications(false)}
                onnotificationsAdded={() => getnotifications()}
            />

            {/* View Notification Modal */}
            <ViewNotificationsModal
                show={ViewNotifications}
                onClose={() => setViewnotifications(false)}
                notifications={selectednotifications}
            />

            {/* Edit Notification Modal */}
            <EditNotificationsModal
                show={EditNotifications}
                onClose={() => setEditnotifications(false)}
                notification={selectedEditNotification}
                onNotificationUpdated={() => getnotifications()}
            />


            <style jsx>{`
.btn-attractive {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 50px;
  padding: 12px 30px;
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-attractive:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  color: white;
}

.btn-attractive:active {
  transform: scale(0.95);
}

/* Shine effect on hover */
.btn-attractive::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(255,255,255,0.1) 50%,
    transparent 100%
  );
  transform: rotate(45deg) translateX(-100%);
  transition: all 0.6s ease;
}

.btn-attractive:hover::before {
  transform: rotate(45deg) translateX(100%);
}
    `}</style>
        </>
    )
}

export default Notifications