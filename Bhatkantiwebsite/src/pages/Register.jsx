import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthUser from "../Auth/AuthUser";

const Register = () => {

    const navigate = useNavigate();
    const { http } = AuthUser();

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
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

        if (!form.first_name.trim()) {
            newErrors.first_name =
                "First name is required";
        }

        if (!form.last_name.trim()) {
            newErrors.last_name =
                "Last name is required";
        }

        if (!form.email.trim()) {
            newErrors.email =
                "Email is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ) {
            newErrors.email =
                "Enter a valid email";
        }

        if (!form.phone.trim()) {
            newErrors.phone =
                "Phone number is required";
        }

        if (!form.password.trim()) {
            newErrors.password =
                "Password is required";
        } else if (form.password.length < 6) {
            newErrors.password =
                "Password must be at least 6 characters";
        }

        if (!form.confirm_password.trim()) {
            newErrors.confirm_password =
                "Confirm password is required";
        } else if (
            form.password !== form.confirm_password
        ) {
            newErrors.confirm_password =
                "Passwords do not match";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // ==========================================
    // Register
    // ==========================================
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {

            setLoading(true);

            const response = await http.post(
                "/auth/customer/register",
                {
                    first_name: form.first_name,
                    last_name: form.last_name,
                    email: form.email,
                    phone: form.phone,
                    password: form.password,
                }
            );

            console.log(
                "CUSTOMER REGISTER RESPONSE:",
                response.data
            );

            const token = response.data?.token;
            const user = response.data?.user;

            if (!token) {

                setErrors({
                    submit:
                        "Registration successful but token was not received",
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
            // Redirect
            // ==========================================
            navigate("/");

        } catch (error) {

            console.log(
                "CUSTOMER REGISTER ERROR:",
                error
            );

            const message =
                error.response?.data?.message ||
                "Registration failed";

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

                <div className="col-md-7 col-lg-6">

                    <div className="card shadow border-0">

                        <div className="card-body p-4">

                            {/* Heading */}
                            <div className="text-center mb-4">

                                <h3 className="fw-bold">
                                    Create Account
                                </h3>

                                <p className="text-muted">
                                    Register as a customer
                                </p>

                            </div>


                            {/* Error */}
                            {errors.submit && (
                                <div className="alert alert-danger">
                                    {errors.submit}
                                </div>
                            )}


                            <form onSubmit={handleSubmit}>

                                <div className="row">

                                    {/* First Name */}
                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            First Name
                                        </label>

                                        <input
                                            type="text"
                                            name="first_name"
                                            className={`form-control ${
                                                errors.first_name
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            placeholder="First name"
                                            value={form.first_name}
                                            onChange={handleChange}
                                        />

                                        {errors.first_name && (
                                            <div className="invalid-feedback">
                                                {errors.first_name}
                                            </div>
                                        )}

                                    </div>


                                    {/* Last Name */}
                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Last Name
                                        </label>

                                        <input
                                            type="text"
                                            name="last_name"
                                            className={`form-control ${
                                                errors.last_name
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            placeholder="Last name"
                                            value={form.last_name}
                                            onChange={handleChange}
                                        />

                                        {errors.last_name && (
                                            <div className="invalid-feedback">
                                                {errors.last_name}
                                            </div>
                                        )}

                                    </div>

                                </div>


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
                                        placeholder="Enter email"
                                        value={form.email}
                                        onChange={handleChange}
                                    />

                                    {errors.email && (
                                        <div className="invalid-feedback">
                                            {errors.email}
                                        </div>
                                    )}

                                </div>


                                {/* Phone */}
                                <div className="mb-3">

                                    <label className="form-label">
                                        Phone
                                    </label>

                                    <input
                                        type="text"
                                        name="phone"
                                        className={`form-control ${
                                            errors.phone
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        placeholder="Enter phone number"
                                        value={form.phone}
                                        onChange={handleChange}
                                    />

                                    {errors.phone && (
                                        <div className="invalid-feedback">
                                            {errors.phone}
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
                                        placeholder="Create password"
                                        value={form.password}
                                        onChange={handleChange}
                                    />

                                    {errors.password && (
                                        <div className="invalid-feedback">
                                            {errors.password}
                                        </div>
                                    )}

                                </div>


                                {/* Confirm Password */}
                                <div className="mb-3">

                                    <label className="form-label">
                                        Confirm Password
                                    </label>

                                    <input
                                        type="password"
                                        name="confirm_password"
                                        className={`form-control ${
                                            errors.confirm_password
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        placeholder="Confirm password"
                                        value={
                                            form.confirm_password
                                        }
                                        onChange={handleChange}
                                    />

                                    {errors.confirm_password && (
                                        <div className="invalid-feedback">
                                            {errors.confirm_password}
                                        </div>
                                    )}

                                </div>


                                {/* Register Button */}
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >

                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Creating account...
                                        </>
                                    ) : (
                                        "Create Account"
                                    )}

                                </button>

                            </form>


                            {/* Login */}
                            <div className="text-center mt-4">

                                <span className="text-muted">
                                    Already have an account?{" "}
                                </span>

                                <Link to="/login">
                                    Login
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Register;