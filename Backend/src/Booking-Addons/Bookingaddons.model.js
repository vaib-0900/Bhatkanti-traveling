const mongoose = require('mongoose');

const BookingaddonsSchema = new mongoose.Schema({

      booking_addon_id: {
        type: Number,
        required: true,
    },
      booking_id: {
        type: Number,
        required: true,
    },
      addon_id: {
        type: Number,
        required: true,
    },
     quantity: {
        type: Number,
        default: 1,
        required: true,
    },
    price_at_time: {
        type: Number,
        required: true,
    },

})
const Bookingaddonsmodel = module.exports = mongoose.model('bookingaddons', BookingaddonsSchema);

module.exports = Bookingaddonsmodel