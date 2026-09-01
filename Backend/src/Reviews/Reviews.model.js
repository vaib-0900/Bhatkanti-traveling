const mongoose = require('mongoose');

const ReviewsSchema = new mongoose.Schema({

    booking_id: {
        type: Number,
      
    },
    customer_id: {
        type: Number,
      
    },
    package_id: {
        type: Number,
        
    },
     rating: {
        type: Number,
       
    },
     title: {
        type: String,
       
    },
     comment: {
        type: String,
       
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