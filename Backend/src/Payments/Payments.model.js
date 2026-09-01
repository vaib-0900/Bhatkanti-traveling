const mongoose = require('mongoose');

const PaymentsSchema = new mongoose.Schema({

    booking_id: {
        type: Number,
       
    },
     payment_reference: {
        type: String,
        
    },
     amount: {
        type: String,
        
    },
     currency: {
        type: String,
       
    },
    payment_method:{
         type: String,
         enum:["pending","pleted","failed","refunded"],
         default: 'pending',
    },
    transaction_id:{
          type: String,
         
    },
     refund_reason:{
          type: String,
          
    },
     notes:{
          type: String,
           
    },
      processed_by:{
          type: Number,
          
    },


},
{
    timestamps:true
},)
const Paymentsmodel = module.exports = mongoose.model('payments', PaymentsSchema);

module.exports = Paymentsmodel