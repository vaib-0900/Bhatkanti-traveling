
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthUser from "../Auth/AuthUser";

const AdminLogin = () => {
    const navigate = useNavigate();
    const { http } = AuthUser();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
            submit: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = form.username.trim();
        const password = form.password;

        const newErrors = {};

        if (!username) {
            newErrors.username = "Username or email is required";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true);
            setErrors({});

            const response = await http.post("/auth/admin/login", {
                username,
                password,
            });

            console.log("ADMIN LOGIN RESPONSE:", response.data);

            const token = response.data?.token;
            const user = response.data?.user;

            if (!token || !user) {
                setErrors({
                    submit: "Login response is missing the token or user data.",
                });
                return;
            }

            if (user.role !== "admin") {
                setErrors({
                    submit: "This account does not have admin access.",
                });
                return;
            }

            localStorage.setItem("admin_token", token);
            localStorage.setItem("admin_user", JSON.stringify(user));

            navigate("/admin/dashboard", { replace: true });
        } catch (error) {
            console.error(
                "ADMIN LOGIN ERROR:",
                error.response?.status,
                error.response?.data || error.message
            );

            setErrors({
                submit:
                    error.response?.data?.message ||
                    (error.response
                        ? `Login failed (${error.response.status}). Check your credentials and admin account status.`
                        : "Cannot connect to the server. Check whether the backend is running."),
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="d-flex align-items-center justify-content-center min-vh-100 px-3"
            style={{ background: "#f4f6f9" }}
        >
            <div
                className="card shadow-lg border-0"
                style={{ width: "100%", maxWidth: "420px", borderRadius: "14px" }}
            >
                <div className="card-body p-4 p-md-5">
                    <div className="text-center mb-4">
                        <h3 className="fw-bold">Admin Login</h3>
                        <p className="text-muted mb-0">
                            Login to Admin Panel
                        </p>
                    </div>

                    {errors.submit && (
                        <div className="alert alert-danger" role="alert">
                            {errors.submit}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Username or Email
                            </label>

                            <input
                                id="username"
                                type="text"
                                name="username"
                                autoComplete="username"
                                className={`form-control ${
                                    errors.username ? "is-invalid" : ""
                                }`}
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Enter username or email"
                                disabled={loading}
                            />

                            {errors.username && (
                                <div className="invalid-feedback">
                                    {errors.username}
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                name="password"
                                autoComplete="current-password"
                                className={`form-control ${
                                    errors.password ? "is-invalid" : ""
                                }`}
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                disabled={loading}
                            />

                            {errors.password && (
                                <div className="invalid-feedback">
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100 py-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        aria-hidden="true"
                                    />
                                    Logging in...
                                </>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
