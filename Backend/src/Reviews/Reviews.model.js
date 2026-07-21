const mongoose = require('mongoose');

const ReviewsSchema = new mongoose.Schema({

    booking_id: {
        type: Number,
        required: true,
    },
    customer_id: {
        type: Number,
        required: true,
    },
    package_id: {
        type: Number,
        required: true,
    },
     rating: {
        type: Number,
        required: true,
    },
     title: {
        type: String,
        required: true,
    },
     comment: {
        type: String,
        required: true,
    },
     is_approved: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps:true
},)
const  Reviewsmodel = module.exports = mongoose.model('reviews',  ReviewsSchema);

module.exports = Reviewsmodel