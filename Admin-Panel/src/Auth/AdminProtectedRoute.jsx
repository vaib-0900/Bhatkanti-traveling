import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
    const token = localStorage.getItem("admin_token");
    const adminUser = localStorage.getItem("admin_user");

    // Login केलेला नसेल
    if (!token || !adminUser) {
        return <Navigate to="/admin/login" replace />;
    }

    // Login केलेला असेल
    return <Outlet />;
};

export default AdminProtectedRoute;