const mongoose = require('mongoose');

const ConnectionDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Traveltour")
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error while connecting with the database", error);
    }
}
module.exports = ConnectionDB;