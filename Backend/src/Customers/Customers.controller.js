const CustomersModel = require("./Customers.model");


const list = async (req,res) =>{
    try {
     const data = await CustomersModel.find()
     return res.json(data)

    } catch (error) {
     console.log(error)
     return res.json('internal server error..')
    }   
}
const store = async (req, res) => {
     try {
          const {
               email,
               password_hash,
               first_name,
               last_name,
               phone,
               date_of_birth,
               nationality,
               passport_number,
               address,
               emergency_contact_name,
               emergency_contact_phone,
               is_active,
               preferred_language,
               newsletter_subscription
          } = req.body

          const save = await CustomersModel.create({
                email,
               password_hash,
               first_name,
               last_name,
               phone,
               date_of_birth,
               nationality,
               passport_number,
               address,
               emergency_contact_name,
               emergency_contact_phone,
               is_active,
               preferred_language,
               newsletter_subscription
          })
          if (!save) {
               return res.json({
                    message: "somthing went wrong",
               })
          }
          return res.json(
               {
                    email,
                    password_hash,
                    first_name,
                    last_name,
                    phone,
                    date_of_birth,
                    nationality,
                    passport_number,
                    address,
                    emergency_contact_name,
                    emergency_contact_phone,
                    is_active,
                    preferred_language,
                    newsletter_subscription
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
          const data = await CustomersModel.findById({ _id: id })
          return res.json(id)
     } catch (error) {
          console.log(error)
          return res.json('internal server error..')
     }
}
const deleted = async (req, res) => {
     try {
          const { id } = req.params
          const data = await CustomersModel.deleteOne({ _id: id })
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
               email,
               password_hash,
               first_name,
               last_name,
               phone,
               date_of_birth,
               nationality,
               passport_number,
               address,
               emergency_contact_name,
               emergency_contact_phone,
               is_active,
               preferred_language,
               newsletter_subscription
          } = req.body
          return res.json(
               {
                    email,
                    password_hash,
                    first_name,
                    last_name,
                    phone,
                    date_of_birth,
                    nationality,
                    passport_number,
                    address,
                    emergency_contact_name,
                    emergency_contact_phone,
                    is_active,
                    preferred_language,
                    newsletter_subscription
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