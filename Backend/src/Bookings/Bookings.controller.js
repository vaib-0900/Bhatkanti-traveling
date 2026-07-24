const BookingsModel = require("./Bookings.model")


const list = async (req, res) => {
     try {
          const data = await BookingsModel.find()
          return res.json(data)

     } catch (error) {
          console.log(error)
          return res.json('internal server error..')
     }
}
const store = async (req, res) => {
     try {
          const {
               booking_reference,
               customer_id,
               schedule_id,
               number_of_travelers,
               number_of_adults,
               number_of_children,
               total_price,
               discount_applied,
               booking_status,
               payment_status,
               special_requests,
               cancellation_reason
          } = req.body

          const save = await BookingsModel.create({
                 booking_reference,
               customer_id,
               schedule_id,
               number_of_travelers,
               number_of_adults,
               number_of_children,
               total_price,
               discount_applied,
               booking_status,
               payment_status,
               special_requests,
               cancellation_reason
          })
          if (!save) {
               return res.json({
                    message: "somthing went wrong",
               })
          }

          return res.json(
               {
                    booking_reference,
                    customer_id,
                    schedule_id,
                    number_of_travelers,
                    number_of_adults,
                    number_of_children,
                    total_price,
                    discount_applied,
                    booking_status,
                    payment_status,
                    special_requests,
                    cancellation_reason
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
const show = async (req,res) =>{
     try {
        const {id} =req.params 
        const data = await BookingsModel.findById({_id:id})
        return res.json(id) 
     }  catch (error) {
     console.log(error)
     return res.json('internal server error..')
    }   
}
const deleted = async (req,res) =>{
      try {
        const {id} =req.params 
        const data = await BookingsModel.deleteOne({_id:id})
          return res.json({message:"Record Deleted Sucessfully..."})
        return res.json(id) 
     }  catch (error) {
     console.log(error)
     return res.json('internal server error..')
    }   
   
}
const updated = async (req, res) => {
     try {
          const {
               booking_reference,
               customer_id,
               schedule_id,
               number_of_travelers,
               number_of_adults,
               number_of_children,
               total_price,
               discount_applied,
               booking_status,
               payment_status,
               special_requests,
               cancellation_reason
          } = req.body
          return res.json(
               {
                    booking_reference,
                    customer_id,
                    schedule_id,
                    number_of_travelers,
                    number_of_adults,
                    number_of_children,
                    total_price,
                    discount_applied,
                    booking_status,
                    payment_status,
                    special_requests,
                    cancellation_reason
               }
          )
     } catch (error) {
          console.log(error)
          return res.status(500).json({
               message: "update error"
          })
     }
}


module.exports = {
     list,
     store,
     show,
     deleted,
     updated
};