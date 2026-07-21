const mongoose = require('mongoose');

const PaymentsSchema = new mongoose.Schema({

    booking_id: {
        type: Number,
        required: true,
    },
     payment_reference: {
        type: String,
        required: true,
    },
     amount: {
        type: String,
        required: true,
    },
     currency: {
        type: String,
        required: true,
    },
    payment_method:{
         type: String,
         enum:["pending","pleted","failed","refunded"],
         default: 'pending',
    },
    transaction_id:{
          type: String,
           required: true,
    },
     refund_reason:{
          type: String,
           required: true,
    },
     notes:{
          type: String,
           required: true,
    },
      processed_by:{
          type: Number,
           required: true,
    },


},
{
    timestamps:true
},)
const Paymentsmodel = module.exports = mongoose.model('payments', PaymentsSchema);

module.exports = Paymentsmodel