const BookingaddonsModel = require("./Bookingaddons.model")


const list = async (req,res) =>{
    try {
     const data = await BookingaddonsModel.find()
     return res.json(data)

    } catch (error) {
     console.log(error)
     return res.json('internal server error..')
    }   
}
const store = async (req,res) =>{
     try {
          const{
              booking_addon_id,
               booking_id,
               addon_id,
               quantity,
               price_at_time
          }= req.body;

          const save = await BookingaddonsModel.create({
               booking_addon_id,
               booking_id,
               addon_id,
               quantity,
               price_at_time
          })
          if(!save){
               return res.json({
                    message:"somthing went wrong",
               })
          }
          
          return res.json(
               {
             booking_addon_id,
               booking_id,
               addon_id,
               quantity,
               price_at_time
               }
          )
           
     } catch (error) {
          console.log(error)
          return res.status(500).json({
          message:"stored error"
          })
          
     }
     return res.json("i am store function");
}
const show = async (req,res) =>{
     try {
        const {id} =req.params 
        const data = await BookingaddonsModel.findById({_id:id})
        return res.json(id) 
     }  catch (error) {
     console.log(error)
     return res.json('internal server error..')
    }   
}
const deleted = async (req,res) =>{
      try {
        const {id} =req.params 
        const data = await BookingaddonsModel.deleteOne({_id:id})
          return res.json({message:"Record Deleted Sucessfully..."})
        return res.json(id) 
     }  catch (error) {
     console.log(error)
     return res.json('internal server error..')
    }   
   
}
const updated = async (req,res) =>{
     try {
           const{
              booking_addon_id,
               booking_id,
               addon_id,
               quantity,
               price_at_time
              
           }= req.body
           return res.json(
               {
              booking_addon_id,
               booking_id,
               addon_id,
               quantity,
               price_at_time
               }
          )
     } catch (error) {
           console.log(error)
          return res.status(500).json({
          message:"update error"
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