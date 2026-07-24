const mongoose = require('mongoose');

const BookingtravelersSchema = new mongoose.Schema({

    booking_id: {
        type: Number,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },  
    date_of_birth: {
        type: Date,
        default:Date.now,
    },
    passport_number: {
        type: String,
        required: true,
    },
    passport_expiry: {
        type: Date,
        default:Date.now,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "male",
    },
    nationality: {
        type: String,
        required: true,
    },
    is_primary: {
        type: Boolean,
        default: false,
    }

})
const Bookingtravelersmodel = module.exports = mongoose.model('bookingtravelers', BookingtravelersSchema);

module.exports = Bookingtravelersmodel