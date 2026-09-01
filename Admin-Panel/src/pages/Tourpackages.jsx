import React, { useEffect, useState } from 'react'
import AuthUser from '../Auth/AuthUser'
import AddTourpackagesModal from './Tourpackages/AddTourpackagesModal'
import ViewTourpackagesModal from './Tourpackages/ViewTourpackagesModal'
import EditTourpackagesModal from './Tourpackages/EditTourpackagesModal'





const Tourpackages = () => {
    const [Tourpackages, settourpackages] = useState([])
    const { http } = AuthUser()
    const gettourpackages = async () => {
        await http.get("/tourpackages/list")
            .then((res) => {
                settourpackages(res.data)
            }).catch((err) => {
                console.log(err)
                console.log("Error in tourpackages")
            })
    }
    useEffect(() => {
        gettourpackages()
    }, [])

    const [AddTourpackages, setAddtourpackages] = useState(false)
    const Addmodel = () => {
        setAddtourpackages(true)
    }

    const [ViewTourpackages, setViewtourpackages] = useState(false)
    const [selectedtourpackages, setSelectedtourpackages] = useState(null)
    const Viewmodel = (data) => {
        setSelectedtourpackages(data)
        setViewtourpackages(true)
    }

    const [EditTourpackages, setEdittourpackages] = useState(false)
    const [selectedEditTourpackage, setSelectedEditTourpackage] = useState(null)
    const Editmodel = (data) => {
        setSelectedEditTourpackage(data)
        setEdittourpackages(true)
    }

     const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const res = await http.delete(`/tourpackages/delete/${id}`);

      console.log("DELETE SUCCESS:", res.data);

      // table refresh
      gettourpackages();

    } catch (error) {
      console.log("DELETE ERROR:", error);
    }
  };


    return (
        <>
            {/* Breadcrumb */}
            <div className="page-header">
                <h3 className="fw-bold">Tourpackages</h3>
                <ul className="breadcrumbs">

                </ul>
            </div>

            {/* Title */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <button className="btn btn-attractive" onClick={Addmodel}>
                    <i className="fas fa-user-plus me-2"></i>
                    Add Tourpackages
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
                                    placeholder="Search Tourpackages..."
                                />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                        <thead className="table-light">
                            <tr>
                                <th>Featured Image</th>
                                <th>Gallery Images</th>
                                <th>package_name</th>
                                <th>slug</th>
                                <th>destination</th>
                                <th>duration</th>
                                <th>base_price</th>
                                <th>discount_price</th>
                                <th>group_size</th>
                                <th>category</th>
                                <th>status</th>
                                <th>Featured</th>
                                <th>Active</th>
                                <th width="150">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Tourpackages.length > 0 && Tourpackages.map((data, key) => (
                                <tr key={key}>
                                    {/* featured_image */}
                                    <td>
                                        {data.featured_image ? (
                                            <img
                                                src={`http://localhost:3000/media/${data.featured_image}`}
                                                alt={data.package_name}
                                                width="70"
                                                height="70"
                                                style={{
                                                    objectFit: "cover",
                                                    borderRadius: "50%"
                                                }}
                                            />
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>
                                    
                                       {/* gallery_images */}
                                     <td>
                                        {data.gallery_images ? (
                                            <img
                                                src={`http://localhost:3000/media/${data.gallery_images}`}
                                                alt={data.package_name}
                                                width="70"
                                                height="70"
                                                style={{
                                                    objectFit: "cover",
                                                    borderRadius: "50%"
                                                }}
                                            />
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>

                                    <td>{data.package_name}</td>
                                    <td>{data.slug}</td>
                                    <td>{data.destination}</td>
                                    <td>{data.duration_days}D / {data.duration_nights}N</td>
                                    <td>{data.base_price}</td>
                                    <td>{data.discount_price}</td>
                                    <td>{data.min_group_size} - {data.max_group_size}</td>
                                    <td>
                                        <span className="badge bg-secondary text-capitalize">
                                            {data.category}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge text-capitalize ${data.status === 'published' ? 'bg-success' : data.status === 'draft' ? 'bg-warning text-dark' : 'bg-secondary'}`}>
                                            {data.status}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${data.is_featured ? 'bg-success' : 'bg-secondary'}`}>
                                            {data.is_featured ? "Yes" : "No"}
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
            {/* Add Tourpackage Modal */}
            <AddTourpackagesModal
                show={AddTourpackages}
                onClose={() => setAddtourpackages(false)}
                ontourpackagesAdded={() => gettourpackages()}
            />

            {/* View Tourpackage Modal */}
            <ViewTourpackagesModal
                show={ViewTourpackages}
                onClose={() => setViewtourpackages(false)}
                tourpackages={selectedtourpackages}
            />

            {/* Edit Tourpackage Modal */}
            <EditTourpackagesModal
                show={EditTourpackages}
                onClose={() => setEdittourpackages(false)}
                tourpackage={selectedEditTourpackage}
                onTourpackageUpdated={() => gettourpackages()}
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

export default Tourpackages
