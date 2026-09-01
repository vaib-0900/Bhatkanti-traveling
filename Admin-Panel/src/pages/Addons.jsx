import React, { useEffect, useState } from 'react'
import AuthUser from '../Auth/AuthUser'
import AddAddonsModal from './Addons/Addaddonsmodel'
import ViewAddonsModal from './Addons/ViewAddonsModal'
import EditAddonsModal from './Addons/EditAddonsModal'





const Addons = () => {
    const [Addons, setaddons] = useState([])
    const { http } = AuthUser()
    const getaddons = async () => {
        await http.get("/addons/list")
            .then((res) => {
                setaddons(res.data)
            }).catch((err) => {
                console.log(err)
                console.log("Error in addons")
            })
    }
    useEffect(() => {
        getaddons()
    }, [])

    const [AddAddons, setAddaddons] = useState(false)
    const Addmodel = () => {
        setAddaddons(true)
    }

    const [ViewAddons, setViewaddons] = useState(false)
    const [selectedaddons, setSelectedaddons] = useState(null)
    const Viewmodel = (data) => {
        setSelectedaddons(data)
        setViewaddons(true)
    }

    const [EditAddons, setEditaddons] = useState(false)
    const [selectedEditAddon, setSelectedEditAddon] = useState(null)
    const Editmodel = (data) => {
        setSelectedEditAddon(data)
        setEditaddons(true)
    }

      const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const res = await http.delete(`/addons/delete/${id}`);

      console.log("DELETE SUCCESS:", res.data);

      // table refresh
      getaddons();

    } catch (error) {
      console.log("DELETE ERROR:", error);
    }
  };


    return (
        <>
            {/* Breadcrumb */}
            <div className="page-header">
                <h3 className="fw-bold">Addons</h3>
                <ul className="breadcrumbs">

                </ul>
            </div>

            {/* Title */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <button className="btn btn-attractive" onClick={Addmodel}>
                    <i className="fas fa-user-plus me-2"></i>
                    Add Addons
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
                                    placeholder="Search Addons..."
                                />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                        <thead className="table-light">
                            <tr>
                                <th>addon_name</th>
                                <th>description</th>
                                <th>price</th>
                                <th>currency</th>
                                <th>Pricing</th>
                                <th>Status</th>
                                <th width="150">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Addons.length > 0 && Addons.map((data, key) => (
                                <tr key={key}>
                                    <td>{data.addon_name}</td>
                                    <td style={{ maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {data.description}
                                    </td>
                                    <td>{data.price}</td>
                                    <td>{data.currency}</td>
                                    <td>
                                        <span className="badge bg-secondary">
                                            {data.is_per_person ? "Per Person" : "Flat"}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${data.is_active ? 'bg-success' : 'bg-danger'}`}>
                                            {data.is_active ? "Active" : "Inactive"}
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
                                             onClick={() => handleDelete(data._id)}
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
            {/* Add Addon Modal */}
            <AddAddonsModal
                show={AddAddons}
                onClose={() => setAddaddons(false)}
                onaddonsAdded={() => getaddons()}
            />

            {/* View Addon Modal */}
            <ViewAddonsModal
                show={ViewAddons}
                onClose={() => setViewaddons(false)}
                addons={selectedaddons}
            />

            {/* Edit Addon Modal */}
            <EditAddonsModal
                show={EditAddons}
                onClose={() => setEditaddons(false)}
                addon={selectedEditAddon}
                onAddonUpdated={() => getaddons()}
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

export default Addons