const mongoose = require('mongoose');

const NotificationsSchema = new mongoose.Schema({

    recipient_type: {
        type: String,
        enum:["customer","admin","all"],
        default: "customer",
       
    },
     recipient_id_type: {
        type: String,
        enum:["booking_confirmation","payment_received","reminder","cancellation","promotion"],
        default: "booking_confirmation",
       
    },
     subject: {
        type: String,
      
    },
     message: {
        type: String,
       
    },
     is_read: {
        type: Boolean,
        default: false,
    },
     sent_via: {
        type: String,
        enum:["email","sms","inapp"],
        default: "email",
        
    },
     status: {
        type: String,
        enum:["pending","sent","failed"],
        default: 'pending',
    },
 
},
{
    timestamps:true
},)
const  Notificationsmodel = module.exports = mongoose.model('notifications',   NotificationsSchema);

module.exports = Notificationsmodel