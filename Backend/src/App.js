const express = require('express');
const app = express();
const cors = require('cors');
const ConnectionDB = require('../db/db');

app.use(express.json());

app.use(cors())

ConnectionDB(); 

app.use('', require('./User/User.route'))


module.exports = app;