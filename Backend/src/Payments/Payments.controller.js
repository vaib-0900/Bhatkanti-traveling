const PaymentsModel = require("./Payments.model");


const list = async (req, res) => {
     try {
          const data = await PaymentsModel.find()
          return res.json(data)

     } catch (error) {
          console.log(error)
          return res.json('internal server error..')
     }
}
const store = async (req, res) => {
     try {
          const {
               booking_id,
               payment_reference,
               amount,
               currency,
               payment_method,
               transaction_id,
               refund_reason,
               notes,
               processed_by
          } = req.body
          const save = await PaymentsModel.create({
              booking_id,
               payment_reference,
               amount,
               currency,
               payment_method,
               transaction_id,
               refund_reason,
               notes,
               processed_by
          })
          if (!save) {
               return res.json({
                    message: "somthing went wrong",
               })
          }

          return res.json(
               {
                    booking_id,
                    payment_reference,
                    amount,
                    currency,
                    payment_method,
                    transaction_id,
                    refund_reason,
                    notes,
                    processed_by
               }
          )
     } catch (error) {
          console.log(error)
          return res.status(500).json({
               message: "stored error"
          })

     }
     return res.json("i am store function");
}
const show = async (req, res) => {
     try {
          const { id } = req.params
          const data = await PaymentsModel.findById({ _id: id })
          return res.json(id)
     } catch (error) {
          console.log(error)
          return res.json('internal server error..')
     }
}
const deleted = async (req, res) => {
     try {
          const { id } = req.params
          const data = await PaymentsModel.deleteOne({ _id: id })
          return res.json({ message: "Record Deleted Sucessfully..." })
          return res.json(id)
     } catch (error) {
          console.log(error)
          return res.json('internal server error..')
     }

}
const updated = async (req, res) => {
     try {
          console.log("UPDATE BODY:", req.body);

          const { _id } = req.body;

          if (!_id) {
               return res.status(400).json({
                    message: "  Payments ID is required",
               });
          }

          const updateData = {
               booking_id: req.body.booking_id,
               payment_reference: req.body.payment_reference,
               amount: req.body.amount,
               currency: req.body.currency,
               payment_method: req.body.payment_method,
               transaction_id: req.body.transaction_id,
               refund_reason: req.body.refund_reason,
               notes: req.body.notes,
               processed_by: req.body.processed_by
              


          };

          const data = await PaymentsModel.findByIdAndUpdate(
               _id,
               updateData,
               {
                    new: true,
                    runValidators: true,
               }
          );

          if (!data) {
               return res.status(404).json({
                    message: "  Payments not found",
               });
          }

          return res.status(200).json({
               message: "  Payments updated successfully",
               data: data,
          });

     } catch (error) {
          console.log("  Payments UPDATE ERROR:", error);

          return res.status(500).json({
               message: " Customers update error",
               error: error.message,
          });
     }
};


module.exports = {
     list,
     store,
     show,
     deleted,
     updated
};