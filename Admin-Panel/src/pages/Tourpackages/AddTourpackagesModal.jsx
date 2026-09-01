import React, { useState } from "react";
import AuthUser from "../../Auth/AuthUser";

const AddTourpackagesModal = ({ show, onClose, ontourpackagesAdded }) => {
    const { https } = AuthUser();

    const initialForm = {
        package_name: "",
        slug: "",
        description: "",
        destination: "",
        duration_days: "",
        duration_nights: "",
        base_price: "",
        discount_price: "",
        max_group_size: "",
        min_group_size: "",
        inclusions: "",
        exclusions: "",
        itinerary: "",
        is_featured: false,
        is_active: true,
        status: "draft",
        category: "",
    };

    const [form, setForm] = useState(initialForm);
    const [featuredImage, setFeaturedImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    // Input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    // Featured image change
    const handleFeaturedImageChange = (e) => {
        setFeaturedImage(e.target.files[0] || null);
        setErrors((prev) => ({ ...prev, featured_image: "" }));
    };

    // Gallery images change (multiple)
    const handleGalleryImagesChange = (e) => {
        setGalleryImages(Array.from(e.target.files));
        setErrors((prev) => ({ ...prev, gallery_images: "" }));
    };

    // Close modal and reset form
    const resetAndClose = () => {
        setForm(initialForm);
        setFeaturedImage(null);
        setGalleryImages([]);
        setErrors({});
        setSubmitting(false);
        onClose();
    };

    // Validation
    const validate = () => {
        const newErrors = {};

        if (!form.package_name.trim()) newErrors.package_name = "Package name is required";
        if (!form.slug.trim()) newErrors.slug = "Slug is required";
        if (!form.description.trim()) newErrors.description = "Description is required";
        if (!form.destination.trim()) newErrors.destination = "Destination is required";
        if (!form.duration_days) newErrors.duration_days = "Duration (days) is required";
        if (!form.duration_nights) newErrors.duration_nights = "Duration (nights) is required";
        if (!form.base_price) newErrors.base_price = "Base price is required";
        if (!form.min_group_size) newErrors.min_group_size = "Min group size is required";
        if (!form.max_group_size) newErrors.max_group_size = "Max group size is required";

        if (
            form.min_group_size &&
            form.max_group_size &&
            Number(form.min_group_size) > Number(form.max_group_size)
        ) {
            newErrors.max_group_size = "Max group size cannot be less than min group size";
        }

        if (
            form.discount_price &&
            form.base_price &&
            Number(form.discount_price) > Number(form.base_price)
        ) {
            newErrors.discount_price = "Discount price cannot exceed base price";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Submit tour package
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setSubmitting(true);

        try {
            const formData = new FormData();

            Object.keys(form).forEach((key) => {
                formData.append(key, form[key]);
            });

            if (featuredImage) {
                formData.append("featured_image", featuredImage);
            }

            galleryImages.forEach((file) => {
                formData.append("gallery_images", file);
            });

            const res = await https.post("/tourpackages/store", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("TOURPACKAGE SUCCESS:", res.data);

            setForm(initialForm);
            setFeaturedImage(null);
            setGalleryImages([]);
            setErrors({});

            if (ontourpackagesAdded) {
                ontourpackagesAdded();
            }

            onClose();
        } catch (error) {
            console.log("TOURPACKAGE ERROR:", error);
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);

            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({
                    general:
                        error.response?.data?.message ||
                        "Something went wrong while adding tour package",
                });
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (!show) return null;

    return (
        <>
            <div
                className="modal fade show d-block"
                tabIndex="-1"
                role="dialog"
                style={{
                    background: "rgba(15,23,42,0.35)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    zIndex: 1055,
                }}
            >
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content border-0 rounded-4 shadow-lg">
                        {/* Header */}
                        <div
                            className="modal-header border-0 px-4 py-3"
                            style={{ background: "#4F46E5" }}
                        >
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <div>
                                    <h4 className="fw-bold mb-1 text-white">Add Tour Package</h4>
                                    <small className="text-white-50">Create a new tour package</small>
                                </div>

                                <button
                                    className="btn btn-light rounded-circle"
                                    onClick={resetAndClose}
                                    style={{ width: 40, height: 40 }}
                                    type="button"
                                >
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body px-4">
                                {errors.general && (
                                    <div className="alert alert-danger">{errors.general}</div>
                                )}

                                <div className="row g-3">
                                    {/* Package Name */}
                                    <div className="col-md-6">
                                        <label className="form-label">Package Name</label>
                                        <input
                                            type="text"
                                            name="package_name"
                                            className={`form-control ${errors.package_name ? "is-invalid" : ""}`}
                                            placeholder="Enter package name"
                                            value={form.package_name}
                                            onChange={handleChange}
                                        />
                                        {errors.package_name && (
                                            <div className="invalid-feedback">{errors.package_name}</div>
                                        )}
                                    </div>

                                    {/* Slug */}
                                    <div className="col-md-6">
                                        <label className="form-label">Slug</label>
                                        <input
                                            type="text"
                                            name="slug"
                                            className={`form-control ${errors.slug ? "is-invalid" : ""}`}
                                            placeholder="Enter slug"
                                            value={form.slug}
                                            onChange={handleChange}
                                        />
                                        {errors.slug && <div className="invalid-feedback">{errors.slug}</div>}
                                    </div>

                                    {/* Description */}
                                    <div className="col-12">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            name="description"
                                            rows="3"
                                            className={`form-control ${errors.description ? "is-invalid" : ""}`}
                                            placeholder="Enter description"
                                            value={form.description}
                                            onChange={handleChange}
                                        ></textarea>
                                        {errors.description && (
                                            <div className="invalid-feedback">{errors.description}</div>
                                        )}
                                    </div>

                                    {/* Destination */}
                                    <div className="col-md-6">
                                        <label className="form-label">Destination</label>
                                        <input
                                            type="text"
                                            name="destination"
                                            className={`form-control ${errors.destination ? "is-invalid" : ""}`}
                                            placeholder="Enter destination"
                                            value={form.destination}
                                            onChange={handleChange}
                                        />
                                        {errors.destination && (
                                            <div className="invalid-feedback">{errors.destination}</div>
                                        )}
                                    </div>

                                    {/* Category */}
                                    {/* Category */}
                                    <div className="col-md-6">
                                        <label className="form-label">Category</label>
                                        <select
                                            name="category"
                                            className={`form-select ${errors.category ? "is-invalid" : ""}`}
                                            value={form.category}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Category</option>
                                            <option value="adventure">Adventure</option>
                                            <option value="beach">Beach</option>
                                            <option value="hill-station">Hill Station</option>
                                            <option value="heritage">Heritage</option>
                                            <option value="wildlife">Wildlife</option>
                                            <option value="fort">Fort</option>
                                            <option value="religious">Religious</option>
                                            <option value="honeymoon">Honeymoon</option>
                                        </select>
                                        {errors.category && (
                                            <div className="invalid-feedback">{errors.category}</div>
                                        )}
                                    </div>

                                    {/* Duration Days */}
                                    <div className="col-md-6">
                                        <label className="form-label">Duration (Days)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            name="duration_days"
                                            className={`form-control ${errors.duration_days ? "is-invalid" : ""}`}
                                            placeholder="Enter duration in days"
                                            value={form.duration_days}
                                            onChange={handleChange}
                                        />
                                        {errors.duration_days && (
                                            <div className="invalid-feedback">{errors.duration_days}</div>
                                        )}
                                    </div>

                                    {/* Duration Nights */}
                                    <div className="col-md-6">
                                        <label className="form-label">Duration (Nights)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            name="duration_nights"
                                            className={`form-control ${errors.duration_nights ? "is-invalid" : ""}`}
                                            placeholder="Enter duration in nights"
                                            value={form.duration_nights}
                                            onChange={handleChange}
                                        />
                                        {errors.duration_nights && (
                                            <div className="invalid-feedback">{errors.duration_nights}</div>
                                        )}
                                    </div>

                                    {/* Base Price */}
                                    <div className="col-md-6">
                                        <label className="form-label">Base Price</label>
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            name="base_price"
                                            className={`form-control ${errors.base_price ? "is-invalid" : ""}`}
                                            placeholder="Enter base price"
                                            value={form.base_price}
                                            onChange={handleChange}
                                        />
                                        {errors.base_price && (
                                            <div className="invalid-feedback">{errors.base_price}</div>
                                        )}
                                    </div>

                                    {/* Discount Price */}
                                    <div className="col-md-6">
                                        <label className="form-label">Discount Price</label>
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            name="discount_price"
                                            className={`form-control ${errors.discount_price ? "is-invalid" : ""}`}
                                            placeholder="Enter discount price"
                                            value={form.discount_price}
                                            onChange={handleChange}
                                        />
                                        {errors.discount_price && (
                                            <div className="invalid-feedback">{errors.discount_price}</div>
                                        )}
                                    </div>

                                    {/* Min Group Size */}
                                    <div className="col-md-6">
                                        <label className="form-label">Min Group Size</label>
                                        <input
                                            type="number"
                                            min="0"
                                            name="min_group_size"
                                            className={`form-control ${errors.min_group_size ? "is-invalid" : ""}`}
                                            placeholder="Enter min group size"
                                            value={form.min_group_size}
                                            onChange={handleChange}
                                        />
                                        {errors.min_group_size && (
                                            <div className="invalid-feedback">{errors.min_group_size}</div>
                                        )}
                                    </div>

                                    {/* Max Group Size */}
                                    <div className="col-md-6">
                                        <label className="form-label">Max Group Size</label>
                                        <input
                                            type="number"
                                            min="0"
                                            name="max_group_size"
                                            className={`form-control ${errors.max_group_size ? "is-invalid" : ""}`}
                                            placeholder="Enter max group size"
                                            value={form.max_group_size}
                                            onChange={handleChange}
                                        />
                                        {errors.max_group_size && (
                                            <div className="invalid-feedback">{errors.max_group_size}</div>
                                        )}
                                    </div>

                                    {/* Inclusions */}
                                    <div className="col-12">
                                        <label className="form-label">Inclusions</label>
                                        <textarea
                                            name="inclusions"
                                            rows="2"
                                            className={`form-control ${errors.inclusions ? "is-invalid" : ""}`}
                                            placeholder="Enter inclusions"
                                            value={form.inclusions}
                                            onChange={handleChange}
                                        ></textarea>
                                        {errors.inclusions && (
                                            <div className="invalid-feedback">{errors.inclusions}</div>
                                        )}
                                    </div>

                                    {/* Exclusions */}
                                    <div className="col-12">
                                        <label className="form-label">Exclusions</label>
                                        <textarea
                                            name="exclusions"
                                            rows="2"
                                            className={`form-control ${errors.exclusions ? "is-invalid" : ""}`}
                                            placeholder="Enter exclusions"
                                            value={form.exclusions}
                                            onChange={handleChange}
                                        ></textarea>
                                        {errors.exclusions && (
                                            <div className="invalid-feedback">{errors.exclusions}</div>
                                        )}
                                    </div>

                                    {/* Itinerary */}
                                    <div className="col-12">
                                        <label className="form-label">Itinerary</label>
                                        <textarea
                                            name="itinerary"
                                            rows="3"
                                            className={`form-control ${errors.itinerary ? "is-invalid" : ""}`}
                                            placeholder="Enter itinerary"
                                            value={form.itinerary}
                                            onChange={handleChange}
                                        ></textarea>
                                        {errors.itinerary && (
                                            <div className="invalid-feedback">{errors.itinerary}</div>
                                        )}
                                    </div>

                                    {/* Featured Image (file) */}
                                    <div className="col-md-6">
                                        <label className="form-label">Featured Image</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className={`form-control ${errors.featured_image ? "is-invalid" : ""}`}
                                            onChange={handleFeaturedImageChange}
                                        />
                                        {featuredImage && (
                                            <small className="text-muted d-block mt-1">
                                                Selected: {featuredImage.name}
                                            </small>
                                        )}
                                        {errors.featured_image && (
                                            <div className="invalid-feedback">{errors.featured_image}</div>
                                        )}
                                    </div>

                                    {/* Gallery Images (multiple files) */}
                                    <div className="col-md-6">
                                        <label className="form-label">Gallery Images</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className={`form-control ${errors.gallery_images ? "is-invalid" : ""}`}
                                            onChange={handleGalleryImagesChange}
                                        />
                                        {galleryImages.length > 0 && (
                                            <small className="text-muted d-block mt-1">
                                                {galleryImages.length} file(s) selected
                                            </small>
                                        )}
                                        {errors.gallery_images && (
                                            <div className="invalid-feedback">{errors.gallery_images}</div>
                                        )}
                                    </div>

                                    {/* Status */}
                                    <div className="col-md-6">
                                        <label className="form-label">Status</label>
                                        <select
                                            name="status"
                                            className={`form-select ${errors.status ? "is-invalid" : ""}`}
                                            value={form.status}
                                            onChange={handleChange}
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                            <option value="archived">Archived</option>
                                        </select>
                                        {errors.status && (
                                            <div className="invalid-feedback">{errors.status}</div>
                                        )}
                                    </div>

                                    {/* Featured */}
                                    <div className="col-md-3">
                                        <div className="form-check form-switch mt-4">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="is_featured"
                                                name="is_featured"
                                                checked={form.is_featured}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="is_featured">
                                                Featured
                                            </label>
                                        </div>
                                    </div>

                                    {/* Active */}
                                    <div className="col-md-3">
                                        <div className="form-check form-switch mt-4">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="is_active"
                                                name="is_active"
                                                checked={form.is_active}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="is_active">
                                                Active
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="modal-footer border-0">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={resetAndClose}
                                    disabled={submitting}
                                >
                                    Cancel
                                </button>

                                <button type="submit" className="btn btn-primary px-4" disabled={submitting}>
                                    {submitting ? "Saving..." : "Save Tour Package"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddTourpackagesModal;