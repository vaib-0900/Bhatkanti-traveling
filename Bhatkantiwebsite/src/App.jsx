import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import TourPackages from "./pages/TourPackages";
import Contact from "./pages/Contact";
import Destination from "./pages/Destination";
import Booking from "./pages/Booking";
import TourPackageDetails from "./componant/TourPackageDetails";

import Register from "./pages/Register";
import Login from "./pages/Login";

import ProtectedRoute from "./Auth/ProtectedRoute";

function App() {
    return (
        <>
            <Routes>

                {/* =========================
                    DEFAULT
                ========================= */}

                <Route
                    path="/"
                    element={<Home to="/" />}
                />


                {/* =========================
                    PUBLIC PAGES
                ========================= */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* =========================
                    PROTECTED PAGES
                ========================= */}

                <Route element={<ProtectedRoute />}>

                    <Route
                        path="/home"
                        element={<Home />}
                    />

                    <Route
                        path="/about"
                        element={<About />}
                    />

                    <Route
                        path="/tour-packages"
                        element={<TourPackages />}
                    />

                    <Route
                        path="/destination"
                        element={<Destination />}
                    />

                    <Route
                        path="/booking"
                        element={<Booking />}
                    />

                    <Route
                        path="/contact"
                        element={<Contact />}
                    />

                    <Route
                        path="/tour-packages/:id"
                        element={<TourPackageDetails />}
                    />

                </Route>

            </Routes>
        </>
    );
}

export default App;