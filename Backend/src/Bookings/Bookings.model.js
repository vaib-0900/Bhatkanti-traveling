const mongoose = require('mongoose');

const BookingsSchema = new mongoose.Schema({

    booking_reference: {
        type: String,
        required: true,
    },
    customer_id: {
        type: Number,
        required: true,
    },
    schedule_id: {
        type: Number,
        required: true,
    },
    number_of_travelers: {
        type: Number,
        required: true,
    },
    number_of_adults: {
        type: Number,
        required: true,
    },
    number_of_children: {
        type: Number,
        required: true,
    },
    total_price: {
        type: String,
        required: true,
    },
    discount_applied: {
        type: String,
        required: true,
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
        required: true,
    },
     cancellation_reason: {
        type: String,
        required: true,
    },

},
{
    timestamps:true
},)
const Bookingsmodel = module.exports = mongoose.model('bookings',BookingsSchema);

module.exports = Bookingsmodel    