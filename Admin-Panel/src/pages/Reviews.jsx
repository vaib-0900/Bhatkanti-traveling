import React, { useEffect, useState } from 'react'
import AuthUser from '../Auth/AuthUser'
import AddReviewsModal from './Reviews/AddReviewsModal'
import ViewReviewsModal from './Reviews/ViewReviewsModal'
import EditReviewsModal from './Reviews/EditReviewsModal'   





const Reviews = () => {
    const [Reviews, setreviews] = useState([])
    const { http } = AuthUser()
    const getreviews = async () => {
        await http.get("/reviews/list")
            .then((res) => {
                setreviews(res.data)
            }).catch((err) => {
                console.log(err)
                console.log("Error in reviews")
            })
    }
    useEffect(() => {
        getreviews()
    }, [])

    const [AddReviews, setAddreviews] = useState(false)
    const Addmodel = () => {
        setAddreviews(true)
    }

    const [ViewReviews, setViewreviews] = useState(false)
    const [selectedreviews, setSelectedreviews] = useState(null)
    const Viewmodel = (data) => {
        setSelectedreviews(data)
        setViewreviews(true)
    }

    const [EditReviews, setEditreviews] = useState(false)
    const [selectedEditReview, setSelectedEditReview] = useState(null)
    const Editmodel = (data) => {
        setSelectedEditReview(data)
        setEditreviews(true)
    }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this reviews?")) {
      return;
    }

    try {
      const res = await http.delete(`/reviews/delete/${id}`);

      console.log("DELETE SUCCESS:", res.data);

      // table refresh
      getreviews();

    } catch (error) {
      console.log("DELETE ERROR:", error);
    }
  };
    return (
        <>
            {/* Breadcrumb */}
            <div className="page-header">
                <h3 className="fw-bold">Reviews</h3>
                <ul className="breadcrumbs">

                </ul>
            </div>

            {/* Title */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <button className="btn btn-attractive" onClick={Addmodel}>
                    <i className="fas fa-user-plus me-2"></i>
                    Add Reviews
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
                                    placeholder="Search Reviews..."
                                />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                        <thead className="table-light">
                            <tr>
                                <th>booking_id</th>
                                <th>customer_id</th>
                                <th>package_id</th>
                                <th>rating</th>
                                <th>title</th>
                                <th>comment</th>
                                <th>Approved</th>
                                <th width="150">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Reviews.length > 0 && Reviews.map((data, key) => (
                                <tr key={key}>
                                    <td>{data.booking_id}</td>
                                    <td>{data.customer_id}</td>
                                    <td>{data.package_id}</td>
                                    <td>
                                        <span className="badge bg-warning text-dark">
                                            <i className="fa fa-star me-1"></i>{data.rating}
                                        </span>
                                    </td>
                                    <td>{data.title}</td>
                                    <td style={{ maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {data.comment}
                                    </td>
                                    <td>
                                        <span className={`badge ${data.is_approved ? 'bg-success' : 'bg-secondary'}`}>
                                            {data.is_approved ? "Approved" : "Pending"}
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
            {/* Add Review Modal */}
            <AddReviewsModal
                show={AddReviews}
                onClose={() => setAddreviews(false)}
                onreviewsAdded={() => getreviews()}
            />

            {/* View Review Modal */}
            <ViewReviewsModal
                show={ViewReviews}
                onClose={() => setViewreviews(false)}
                reviews={selectedreviews}
            />

            {/* Edit Review Modal */}
            <EditReviewsModal
                show={EditReviews}
                onClose={() => setEditreviews(false)}
                review={selectedEditReview}
                onReviewUpdated={() => getreviews()}
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

export default Reviews