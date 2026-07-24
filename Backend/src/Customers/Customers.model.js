const mongoose = require('mongoose');

const CustomersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password_hash: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    date_of_birth: {
         type: Date,
         default:'Date.now',
    },
    nationality: {
        type: String,
        required: true,
    },
    passport_number: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    emergency_contact_name: {
        type: String,
        required: true,
    },
    emergency_contact_phone: {
        type: String,
        required: true,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    preferred_language: {
        type: String,
        default: "en",
    },
    newsletter_subscription: {
         type: Boolean,
        default: false,
    },

},
{
    timestamps:true
},
)
const Customersmodel = module.exports = mongoose.model('customers', CustomersSchema);

module.exports = Customersmodel