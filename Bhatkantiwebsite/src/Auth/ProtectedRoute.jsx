import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
    const location = useLocation();

    const token = localStorage.getItem("customer_token");
    const customer = localStorage.getItem("customer_user");

    if (!token || !customer) {
        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location.pathname,
                }}
            />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;