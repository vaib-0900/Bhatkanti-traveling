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
          console.log("UPDATE BODY:", req.body);

          const { _id } = req.body;

          if (!_id) {
               return res.status(400).json({
                    message: " Customers ID is required",
               });
          }

          const updateData = {
               email: req.body.email,
               password_hash: req.body.password_hash,
               first_name: req.body.first_name,
               last_name: req.body.last_name,
               phone: req.body.phone,
               date_of_birth: req.body.date_of_birth,
               nationality: req.body.nationality,
               passport_number: req.body.passport_number,
               address: req.body.address,
               emergency_contact_name: req.body.emergency_contact_name,
               emergency_contact_phone: req.body.emergency_contact_phone,
               is_active: req.body.is_active,
               preferred_language: req.body.preferred_language,
               newsletter_subscription: req.body.newsletter_subscription


          };

          const data = await CustomersModel.findByIdAndUpdate(
               _id,
               updateData,
               {
                    new: true,
                    runValidators: true,
               }
          );

          if (!data) {
               return res.status(404).json({
                    message: " Customers not found",
               });
          }

          return res.status(200).json({
               message: " Customers updated successfully",
               data: data,
          });

     } catch (error) {
          console.log(" Customers UPDATE ERROR:", error);

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