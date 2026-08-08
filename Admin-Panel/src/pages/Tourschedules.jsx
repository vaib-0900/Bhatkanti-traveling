import React, { useEffect, useState } from 'react'
import AuthUser from '../Auth/AuthUser'
import AddTourschedulesModal from './Tourschedules/AddTourschedulesModel'
import ViewTourschedulesModal from './Tourschedules/ViewTourschedulesModel'
import EditTourschedulesModal from './Tourschedules/EditTourschedulesModal'




const Tourschedules = () => {
    const [Tourschedules, settourschedules] = useState([])
    const { http } = AuthUser()
    const gettourschedules = async () => {
        await http.get("/tourschedule/list")
            .then((res) => {
                settourschedules(res.data)
            }).catch((err) => {
                console.log(err)
                console.log("Error in tourschedules")
            })
    }
    useEffect(() => {
        gettourschedules()
    }, [])

    const [AddTourschedules, setAddtourschedules] = useState(false)
    const Addmodel = () => {
        setAddtourschedules(true)
    }

    const [ViewTourschedules, setViewtourschedules] = useState(false)
    const [selectedtourschedules, setSelectedtourschedules] = useState(null)
    const Viewmodel = (data) => {
        setSelectedtourschedules(data)
        setViewtourschedules(true)
    }

    const [EditTourschedules, setEdittourschedules] = useState(false)
    const [selectedEditTourschedule, setSelectedEditTourschedule] = useState(null)
    const Editmodel = (data) => {
        setSelectedEditTourschedule(data)
        setEdittourschedules(true)
    }


    return (
        <>
            {/* Breadcrumb */}
            <div className="page-header">
                <h3 className="fw-bold">Tourschedules</h3>
                <ul className="breadcrumbs">

                </ul>
            </div>

            {/* Title */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <button className="btn btn-attractive" onClick={Addmodel}>
                    <i className="fas fa-user-plus me-2"></i>
                    Add Tourschedules
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
                                    placeholder="Search Tourschedules..."
                                />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                        <thead className="table-light">
                            <tr>
                                <th>package_id</th>
                                <th>departure_date</th>
                                <th>return_date</th>
                                <th>available_seats</th>
                                <th>total_seats</th>
                                <th>is_cancelled</th>
                                <th>price_override</th>
                                <th>notes</th>
                                <th>Status</th>
                                <th width="150">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Tourschedules.length > 0 && Tourschedules.map((data, key) => (
                                <tr key={key}>
                                    <td>{data.package_id}</td>
                                    <td>{data.departure_date}</td>
                                    <td>{data.return_date}</td>
                                    <td>{data.available_seats}</td>
                                    <td>{data.total_seats}</td>
                                    <td>{data.is_cancelled}</td>
                                    <td>{data.price_override}</td>
                                    <td>{data.notes}</td>

                                    <td>
                                        <span className="badge bg-success">
                                            {data.isactive ? "Active" : "Inactive"}
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
            {/* Add Tourschedule Modal */}
            <AddTourschedulesModal
                show={AddTourschedules}
                onClose={() => setAddtourschedules(false)}
                ontourschedulesAdded={() => gettourschedules()}
            />

            {/* View Tourschedule Modal */}
            <ViewTourschedulesModal
                show={ViewTourschedules}
                onClose={() => setViewtourschedules(false)}
                tourschedules={selectedtourschedules}
            />

            {/* Edit Tourschedule Modal */}
            <EditTourschedulesModal
                show={EditTourschedules}
                onClose={() => setEdittourschedules(false)}
                tourschedule={selectedEditTourschedule}
                onTourscheduleUpdated={() => gettourschedules()}
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

export default Tourschedules
