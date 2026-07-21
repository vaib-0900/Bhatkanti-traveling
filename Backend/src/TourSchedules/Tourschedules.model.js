const mongoose = require('mongoose');

const TourschedulesSchema = new mongoose.Schema({

    package_id: {
        type: Number,
        required: true,
    },
    departure_date: {
        type: Date,
        required: true,
         default:'Date.now',
    },
    return_date: {
        type: Date,
        required: true,
         default:'Date.now',
    },
    available_seats: {
        type: Number,
        required: true,
        default: '0',
    },
    total_seats: {
        type: Number,
        required: true,
        default: '0',
    },
    is_cancelled: {
         type: Boolean,
        default: false,
    },
    price_override: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        required: true,
    },
},
{
    timestamps:true
},)
const Tourschedulesmodel = module.exports = mongoose.model('tourschedule', TourschedulesSchema);

module.exports = Tourschedulesmodel    