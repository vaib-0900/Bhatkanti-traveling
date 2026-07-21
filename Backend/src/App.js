const express = require('express');
const app = express();
const cors = require('cors');
const ConnectionDB = require('../db/db');

app.use(express.json());

app.use(cors())

ConnectionDB(); 

app.use('/api', require('./User/User.route'))
app.use('/api', require('./TourSchedules/Tourschedules.route'))
app.use('/api', require('./TourPackages/TourPackages.route'))
app.use('/api', require('./Reviews/Reviews.route'))
app.use('/api', require('./Payments/Payments.route'))
app.use('/api', require('./Notifications/Notifications.route'))
app.use('/api', require('./Customers/Customers.route'))
app.use('/api', require('./BookingTravelers/Bookingtravelers.route'))
app.use('/api', require('./Bookings/Bookings.route'))





module.exports = app;