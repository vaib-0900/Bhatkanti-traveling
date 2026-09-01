const mongoose = require('mongoose');

const BookingtravelersSchema = new mongoose.Schema({

    booking_id: {
        type: Number,
        
    },
    first_name: {
        type: String,
      
    },
    last_name: {
        type: String,
       
    },  
    date_of_birth: {
        type: Date,
        default:Date.now,
    },
    passport_number: {
        type: String,
      
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
        
    },
    is_primary: {
        type: Boolean,
        default: false,
    }

})
const Bookingtravelersmodel = module.exports = mongoose.model('bookingtravelers', BookingtravelersSchema);

module.exports = Bookingtravelersmodel