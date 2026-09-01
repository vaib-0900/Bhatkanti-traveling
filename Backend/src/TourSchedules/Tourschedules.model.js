const mongoose = require('mongoose');

const TourschedulesSchema = new mongoose.Schema({

    package_id: {
        type: Number,
        
    },
    departure_date: {
        type: Date,
         default:Date.now,
    },
    return_date: {
        type: Date,
         default:Date.now,
    },
    available_seats: {
        type: Number,
       
        default: '0',
    },
    total_seats: {
        type: Number,
       
        default: '0',
    },
    is_cancelled: {
         type: Boolean,
        default: false,
    },
    price_override: {
        type: String,
       
    },
    notes: {
        type: String,
       
    },
},
{
    timestamps:true
},)
const Tourschedulesmodel = module.exports = mongoose.model('tourschedule', TourschedulesSchema);

module.exports = Tourschedulesmodel    