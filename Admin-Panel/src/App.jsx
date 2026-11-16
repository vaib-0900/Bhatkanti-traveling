import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Tourpackages from "./pages/Tourpackages";
import Customers from "./pages/Customers";
import Payments from "./pages/Payments";
import Users from "./pages/Users";
import Reviews from "./pages/Reviews";
import Notifications from "./pages/Notifications";
import Bookingtravelers from "./pages/Bookingtravelers";
import Bookingaddons from "./pages/Bookingaddons";
import Addons from "./pages/Addons";
import Tourschedules from "./pages/Tourschedules";

import AdminLogin from "./pages/AdminLogin";
import AdminProtectedRoute from "./Auth/AdminProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Admin Login */}
                <Route
                    path="/admin/login"
                    element={<AdminLogin />}
                />

                {/* Protected Admin Panel */}
                <Route element={<AdminProtectedRoute />}>
                    <Route path="/admin" element={<Layout />}>

                        {/* Default Dashboard */}
                        <Route
                            index
                            element={<Dashboard />}
                        />

                        <Route
                            path="dashboard"
                            element={<Dashboard />}
                        />

                        <Route
                            path="users"
                            element={<Users />}
                        />

                        <Route
                            path="bookings"
                            element={<Bookings />}
                        />

                        <Route
                            path="bookingtravelers"
                            element={<Bookingtravelers />}
                        />

                        <Route
                            path="bookingaddons"
                            element={<Bookingaddons />}
                        />

                        <Route
                            path="addons"
                            element={<Addons />}
                        />

                        <Route
                            path="tourschedules"
                            element={<Tourschedules />}
                        />

                        <Route
                            path="tourpackages"
                            element={<Tourpackages />}
                        />

                        <Route
                            path="reviews"
                            element={<Reviews />}
                        />

                        <Route
                            path="customers"
                            element={<Customers />}
                        />

                        <Route
                            path="payments"
                            element={<Payments />}
                        />

                        <Route
                            path="notifications"
                            element={<Notifications />}
                        />

                    </Route>
                </Route>

                {/* Default URL */}
                <Route
                    path="/"
                    element={<Navigate to="/admin" replace />}
                />

                {/* Unknown URL */}
                <Route
                    path="*"
                    element={<Navigate to="/admin" replace />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;