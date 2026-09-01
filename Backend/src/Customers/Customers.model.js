const mongoose = require('mongoose');

const CustomersSchema = new mongoose.Schema({
    email: {
        type: String,
      
    },
    password_hash: {
        type: String,
       
    },
    first_name: {
        type: String,
      
    },
    last_name: {
        type: String,
       
    },
    phone: {
        type: String,
       
    },
    date_of_birth: {
         type: Date,
         default:'Date.now',
    },
    nationality: {
        type: String,
       
    },
    passport_number: {
        type: String,
       
    },
    address: {
        type: String,
       
    },
    emergency_contact_name: {
        type: String,
        
    },
    emergency_contact_phone: {
        type: String,
       
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