const tourschedule = require("./Tourschedules.model")

const list = async (req, res) => {
     try {
          const data = await tourschedule.find()
          return res.json(data)

     } catch (error) {
          console.log(error)
          return res.json('internal server error..')
     }
}
const store = async (req, res) => {
     try {
          const {
               package_id,
               departure_date,
               return_date,
               available_seats,
               total_seats,
               is_cancelled,
               price_override,
               notes
          } = req.body

          const save = await tourschedule.create({
               package_id,
               departure_date,
               return_date:return_date==""?Date.now:return_date,
               available_seats,
               total_seats,
               is_cancelled,
               price_override,
               notes
          })
          if (!save) {
               return res.json({
                    message: "somthing went wrong",
               })
          }

          return res.json(
               {
                    package_id,
                    departure_date,
                    return_date,
                    available_seats,
                    total_seats,
                    is_cancelled,
                    price_override,
                    notes
               }
          )
     } catch (error) {
          console.log(error)
          return res.status(500).json({
               message: "stored error"
          })

     }
}
const show = async (req,res) =>{
     try {
        const {id} =req.params 
        const data = await tourschedule.findById({_id:id})
        return res.json(id) 
     }  catch (error) {
     console.log(error)
     return res.json('internal server error..')
    }   
}
const deleted = async (req,res) =>{
      try {
        const {id} =req.params 
        const data = await tourschedule.deleteOne({_id:id})
          return res.json({message:"Record Deleted Sucessfully..."})
        return res.json(id) 
     }  catch (error) {
     console.log(error)
     return res.json('internal server error..')
    }   
   
}
const updated = async (req, res) => {
     return res.json("i am update function");
     try {
          const {
               package_id,
               departure_date,
               return_date,
               available_seats,
               total_seats,
               is_cancelled,
               price_override,
               notes
          } = req.body
          return res.json(
               {
                    package_id,
                    departure_date,
                    return_date,
                    available_seats,
                    total_seats,
                    is_cancelled,
                    price_override,
                    notes
               }
          )
     } catch (error) {
          console.log(error)
          return res.status(500).json({
               message: "update error"
          }
          )
     }
}


module.exports = {
     list,
     store,
     show,
     deleted,
     updated
};