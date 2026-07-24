const BookingtravelersModel = require("./Bookingtravelers.model")


const list = async (req, res) => {
     try {
          const data = await BookingtravelersModel.find()
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
               first_name,
               last_name,
               date_of_birth,
               passport_number,
               passport_expiry,
               gender,
               nationality,
               is_primary
          } = req.body

          const save = await BookingtravelersModel.create({
               booking_id,
               first_name,
               last_name,
               date_of_birth,
               passport_number,
               passport_expiry,
               nationality,
               is_primary
          })
          if (!save) {
               return res.json({
                    message: "somthing went wrong",
               })
          }
          return res.json(
               {
                    booking_id,
                    first_name,
                    last_name,
                    date_of_birth,
                    passport_number,
                    passport_expiry,
                    gender,
                    nationality,
                    is_primary
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
          const data = await BookingtravelersModel.findById({ _id: id })
          return res.json(id)
     } catch (error) {
          console.log(error)
          return res.json('internal server error..')
     }
}
const deleted = async (req, res) => {
     try {
          const { id } = req.params
          const data = await BookingtravelersModel.deleteOne({ _id: id })
          return res.json({ message: "Record Deleted Sucessfully..." })
          return res.json(id)
     } catch (error) {
          console.log(error)
          return res.json('internal server error..')
     }

}
const updated = async (req, res) => {
     try {
          const {
               booking_id,
               first_name,
               last_name,
               date_of_birth,
               passport_number,
               passport_expiry,
               gender,
               nationality,
               is_primary
          } = req.body

          const save = await BookingtravelersModel.create({
               booking_id,
               first_name,
               last_name,
               date_of_birth,
               passport_number,
               passport_expiry,
               gender,
               nationality,
               is_primary
          })
          if (!save) {
               return res.json({
                    message: "somthing went wrong",
               })
          }
          return res.json(
               {
                    booking_id,
                    first_name,
                    last_name,
                    date_of_birth,
                    passport_number,
                    passport_expiry,
                    gender,
                    nationality,
                    is_primary
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