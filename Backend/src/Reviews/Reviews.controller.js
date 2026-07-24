const ReviewsModel = require("./Reviews.model")
const Reviews = require("./Reviews.model")

const list = async (req, res) => {
     try {
          const data = await ReviewsModel.find()
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
               customer_id,
               package_id,
               rating,
               title,
               comment,
               is_approved

          } = req.body

          const save = await ReviewsModel.create({
               booking_id,
               customer_id,
               package_id,
               rating,
               title,
               comment,
               is_approved
          })
          if (!save) {
               return res.json({
                    message: "somthing went wrong",
               })
          }
          return res.json(
               {
                    booking_id,
                    customer_id,
                    package_id,
                    rating,
                    title,
                    comment,
                    is_approved
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
        const data = await ReviewsModel.findById({_id:id})
        return res.json(id) 
     }  catch (error) {
     console.log(error)
     return res.json('internal server error..')
    }   
}
const deleted = async (req,res) =>{
      try {
        const {id} =req.params 
        const data = await ReviewsModel.deleteOne({_id:id})
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
               booking_id,
               customer_id,
               package_id,
               rating,
               title,
               comment,
               is_approved
          } = req.body
          return res.json(
               {
                    booking_id,
                    customer_id,
                    package_id,
                    rating,
                    title,
                    comment,
                    is_approved
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