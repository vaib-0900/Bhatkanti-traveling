const mongoose = require('mongoose');

const NotificationsSchema = new mongoose.Schema({

    recipient_type: {
        type: String,
        enum:["customer","admin","all"],
        required: true,
    },
    recipient_id: {
        type: Number,
        required: true,
    },
     recipient_type: {
        type: String,
        enum:["booking_confirmation","payment_received","reminder","cancellation","promotion"],
        required: true,
    },
     subject: {
        type: String,
        required: true,
    },
     message: {
        type: String,
        required: true,
    },
     is_read: {
        type: Boolean,
        default: false,
    },
     sent_via: {
        type: String,
        enum:["email","sms","inapp"],
        required: true,
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