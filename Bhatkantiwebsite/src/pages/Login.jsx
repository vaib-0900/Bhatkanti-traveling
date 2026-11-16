import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthUser from "../Auth/AuthUser";

const Login = () => {

    const navigate = useNavigate();
    const { http } = AuthUser();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // ==========================================
    // Handle Change
    // ==========================================
    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: "",
            submit: "",
        });
    };

    // ==========================================
    // Validation
    // ==========================================
    const validate = () => {

        const newErrors = {};

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ) {
            newErrors.email = "Enter a valid email";
        }

        if (!form.password.trim()) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // ==========================================
    // Login
    // ==========================================
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {

            setLoading(true);

            const response = await http.post(
                "/auth/customer/login",
                {
                    email: form.email.trim(),
                    password: form.password,
                }
            );

            console.log(
                "CUSTOMER LOGIN RESPONSE:",
                response.data
            );

            const token = response.data?.token;
            const user = response.data?.user;

            // Token check
            if (!token) {

                setErrors({
                    submit: "Login token not received",
                });

                return;
            }

            // ==========================================
            // Save Token
            // ==========================================
            localStorage.setItem(
                "customer_token",
                token
            );

            // ==========================================
            // Save Customer
            // ==========================================
            if (user) {

                localStorage.setItem(
                    "customer_user",
                    JSON.stringify(user)
                );
            }

            // ==========================================
            // Redirect after login
            // ==========================================
            navigate("/home");

        } catch (error) {

            console.log(
                "CUSTOMER LOGIN ERROR:",
                error
            );

            console.log(
                "SERVER ERROR:",
                error.response?.data
            );

            const message =
                error.response?.data?.message ||
                "Invalid email or password";

            setErrors({
                submit: message,
            });

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow border-0">

                        <div className="card-body p-4">

                            {/* Heading */}
                            <div className="text-center mb-4">

                                <h3 className="fw-bold">
                                    Customer Login
                                </h3>

                                <p className="text-muted">
                                    Login to your account
                                </p>

                            </div>

                            {/* Error */}
                            {errors.submit && (
                                <div className="alert alert-danger">
                                    {errors.submit}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                {/* Email */}
                                <div className="mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className={`form-control ${
                                            errors.email
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        placeholder="Enter your email"
                                        value={form.email}
                                        onChange={handleChange}
                                    />

                                    {errors.email && (
                                        <div className="invalid-feedback">
                                            {errors.email}
                                        </div>
                                    )}

                                </div>

                                {/* Password */}
                                <div className="mb-3">

                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        className={`form-control ${
                                            errors.password
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        placeholder="Enter your password"
                                        value={form.password}
                                        onChange={handleChange}
                                    />

                                    {errors.password && (
                                        <div className="invalid-feedback">
                                            {errors.password}
                                        </div>
                                    )}

                                </div>

                                {/* Login Button */}
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >

                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Logging in...
                                        </>
                                    ) : (
                                        "Login"
                                    )}

                                </button>

                            </form>

                            {/* Register */}
                            <div className="text-center mt-4">

                                <span className="text-muted">
                                    Don't have an account?{" "}
                                </span>

                                <Link to="/register">
                                    Register
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;