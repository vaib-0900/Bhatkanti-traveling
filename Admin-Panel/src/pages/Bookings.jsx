import React, { useEffect, useState } from 'react'
import AuthUser from '../Auth/AuthUser'
import AddBookingsModal from './Bookings/AddBookingsModal'
import ViewBookingsModal from './Bookings/ViewBookingsModal'
import EditBookingsModal from './Bookings/EditBookingsModal'





const Bookings = () => {
    const [Bookings, setbookings] = useState([])
    const { http } = AuthUser()
    const getbookings = async () => {
        await http.get("/bookings/list")
            .then((res) => {
                setbookings(res.data)
            }).catch((err) => {
                console.log(err)
                console.log("Error in bookings")
            })
    }
    useEffect(() => {
        getbookings()
    }, [])

    const [AddBookings, setAddbookings] = useState(false)
    const Addmodel = () => {
        setAddbookings(true)
    }

    const [ViewBookings, setViewbookings] = useState(false)
    const [selectedbookings, setSelectedbookings] = useState(null)
    const Viewmodel = (data) => {
        setSelectedbookings(data)
        setViewbookings(true)
    }

    const [EditBookings, setEditBooking] = useState(false)
    const [selectedBooking, setSelectedBooking] = useState(null)
    const Editmodel = (data) => {
        setSelectedBooking(data)
        setEditBooking(true)

    }


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const res = await http.delete(`/bookings/delete/${id}`);

      console.log("DELETE SUCCESS:", res.data);

      // table refresh
      getbookings();

    } catch (error) {
      console.log("DELETE ERROR:", error);
    }
  };

    return (
        <>
            {/* Breadcrumb */}
            <div className="page-header">
                <h3 className="fw-bold">Bookings</h3>
                <ul className="breadcrumbs">

                </ul>
            </div>

            {/* Title */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <button className="btn btn-attractive" onClick={Addmodel}>
                    <i className="fas fa-user-plus me-2"></i>
                    Add Bookings
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
                                    placeholder="Search Bookings..."
                                />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                        <thead className="table-light">
                            <tr>
                                <th>booking_reference</th>
                                <th>customer_id</th>
                                <th>schedule_id</th>
                                <th>travelers</th>
                                <th>total_price</th>
                                <th>discount_applied</th>
                                <th>booking_status</th>
                                <th>payment_status</th>
                                <th width="150">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Bookings.length > 0 && Bookings.map((data, key) => (
                                <tr key={key}>
                                    <td>{data.booking_reference}</td>
                                    <td>{data.customer_id}</td>
                                    <td>{data.schedule_id}</td>
                                    <td>
                                        {data.number_of_travelers}
                                        <span className="text-muted"> ({data.number_of_adults}A / {data.number_of_children}C)</span>
                                    </td>
                                    <td>{data.total_price}</td>
                                    <td>{data.discount_applied}</td>
                                    <td>
                                        <span className={`badge text-capitalize ${data.booking_status === 'confirmed' ? 'bg-success' : data.booking_status === 'pending' ? 'bg-warning text-dark' : data.booking_status === 'cancelled' ? 'bg-danger' : 'bg-secondary'}`}>
                                            {data.booking_status}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge text-capitalize ${data.payment_status === 'paid' ? 'bg-success' : data.payment_status === 'pending' ? 'bg-warning text-dark' : data.payment_status === 'refunded' ? 'bg-secondary' : 'bg-danger'}`}>
                                            {data.payment_status}
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
                                            onClick={() => {
                                                setSelectedBooking(data);
                                                setEditBooking(true);
                                            }}
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
                                            onClick={() => handleDelete(data._id)}
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                                                border: "none",
                                                color: "white",
                                                padding: "6px 14px",
                                                borderRadius: "20px",
                                                transition: "all 0.3s ease",
                                                boxShadow:
                                                    "0 4px 15px rgba(245, 87, 108, 0.3)",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = "translateY(-2px)";
                                                e.currentTarget.style.boxShadow =
                                                    "0 6px 25px rgba(245, 87, 108, 0.5)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "translateY(0)";
                                                e.currentTarget.style.boxShadow =
                                                    "0 4px 15px rgba(245, 87, 108, 0.3)";
                                            }}
                                        >
                                            <i className="fa fa-trash me-1"></i>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Add Booking Modal */}
            <AddBookingsModal
                show={AddBookings}
                onClose={() => setAddbookings(false)}
                onbookingsAdded={() => getbookings()}
            />

            {/* View Booking Modal */}
            <ViewBookingsModal
                show={ViewBookings}
                onClose={() => setViewbookings(false)}
                bookings={selectedbookings}
            />

            {/* Edit Booking Modal */}
            <EditBookingsModal
                show={EditBookings}
                onClose={() => setEditBooking(false)}
                booking={selectedBooking}
                onBookingUpdated={getbookings}
            />


            <style>{`
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

export default Bookings
