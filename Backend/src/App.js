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


module.exports = app;