const mongoose = require('mongoose');

const AddonsSchema = new mongoose.Schema({

    addon_name: {
        type: String,
        required: true,
    },
     description: {
        type: String,
        required: true,
    },
     price: {
        type: String,
        required: true,
    },
     currency: {
        type: String,
        required: true,
    },
     is_per_person: {
        type: Boolean,
        default: true,
    },
     is_active: {
        type: Boolean,
        default: true,
    },
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
const Addonmodel = module.exports = mongoose.model('addon', AddonSchema);

module.exports = Addonmodel