const mongoose = require('mongoose');

const BookingaddonsSchema = new mongoose.Schema({

      booking_addon_id: {
        type: Number,
       
    },
      booking_id: {
        type: Number,
      
    },
      addon_id: {
        type: Number,
      
    },
     quantity: {
        type: Number,
        default: 1,
       
    },
    price_at_time: {
        type: Number,
       
    },

})
const Bookingaddonsmodel = module.exports = mongoose.model('bookingaddons', BookingaddonsSchema);

module.exports = Bookingaddonsmodel