const mongoose = require('mongoose');

const BookingsSchema = new mongoose.Schema({

    booking_reference: {
        type: String,
      
    },
    customer_id: {
        type: Number,
        
    },
    schedule_id: {
        type: Number,
       
    },
    number_of_travelers: {
        type: Number,
     
    },
    number_of_adults: {
        type: Number,
      
    },
    number_of_children: {
        type: Number,
      
    },
    total_price: {
        type: String,
       
    },
    discount_applied: {
        type: String,
       
    },
     booking_status: {
        type: String,
        enum:["pending", "confirmed","cancelled", "completed"],
       default:'pending',
    },
      payment_status: {
        type: String,
        enum:["pending", "partial","paid", "refunded"],
       default:'pending',
    },
     special_requests: {
        type: String,
       
    },
     cancellation_reason: {
        type: String,
     
    },

},
{
    timestamps:true
},)
const Bookingsmodel = module.exports = mongoose.model('bookings',BookingsSchema);

module.exports = Bookingsmodel    