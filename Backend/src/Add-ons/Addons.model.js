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
        type: Number,
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
    }
})
const Addonsmodel = module.exports = mongoose.model('addons', AddonsSchema);

module.exports = Addonsmodel