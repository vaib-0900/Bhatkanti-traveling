const express = require('express');
const app = express();
const cors = require('cors');
const ConnectionDB = require('../db/db');

app.use(express.json());

app.use(cors())

ConnectionDB();


module.exports = app;