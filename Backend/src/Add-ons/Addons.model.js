const mongoose = require('mongoose');

const AddonsSchema = new mongoose.Schema({

    addon_name: {
        type: String,
        
    },
     description: {
        type: String,
       
    },
     price: {
        type: Number,
       
    },
     currency: {
        type: String,
       
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