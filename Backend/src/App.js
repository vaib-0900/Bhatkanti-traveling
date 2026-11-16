
const express = require("express");
const cors = require("cors");
const app = express();

const ConnectionDB = require("../db/db");

// CORS configuration — routes च्या आधी असणे आवश्यक
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
        ],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
ConnectionDB();

// Auth Routes
const AuthRoute = require("./Auth/Auth.route");
app.use("/api/auth", AuthRoute);

// Other Routes
app.use("/api", require("./User/User.route"));
app.use("/api", require("./TourSchedules/Tourschedules.route"));
app.use("/api", require("./TourPackages/TourPackages.route"));
app.use("/api", require("./Reviews/Reviews.route"));
app.use("/api", require("./Payments/Payments.route"));
app.use("/api", require("./Notifications/Notifications.route"));
app.use("/api", require("./Customers/Customers.route"));
app.use("/api", require("./BookingTravelers/Bookingtravelers.route"));
app.use("/api", require("./Bookings/Bookings.route"));
app.use("/api", require("./Booking-Addons/Bookingaddons.route"));
app.use("/api", require("./Add-ons/Addons.route"));

// Media
app.use("/media", express.static("media"));

// Export App
module.exports = app;
