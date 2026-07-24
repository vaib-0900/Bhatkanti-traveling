const { list } = require("../User/User.controller")
const NotificationsModel = require("./Notifications.model")


const index = async (req, res) => {
     const list = async (req, res) => {
          try {
               const data = await NotificationsModel.find()
               return res.json(data)

          } catch (error) {
               console.log(error)
               return res.json('internal server error..')
          }
     }
}
const store = async (req, res) => {
     try {
          const {
               recipient_type,
               recipient_id_type,
               subject,
               message,
               is_read,
               sent_via,
               status
          } = req.body
          const save = await NotificationsModel.create({
               recipient_type,
               recipient_id_type,
               subject,
               message,
               is_read,
               sent_via,
               status
          })
          if (!save) {
               return res.json({
                    message: "somthing went wrong",
               })
          }



          return res.json(
               {
                    recipient_type,
                    recipient_id_type,
                    subject,
                    message,
                    is_read,
                    sent_via,
                    status
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
        const data = await NotificationsModel.findById({_id:id})
        return res.json(id) 
     }  catch (error) {
     console.log(error)
     return res.json('internal server error..')
    }   
}
const deleted = async (req,res) =>{
      try {
        const {id} =req.params 
        const data = await NotificationsModel.deleteOne({_id:id})
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
               recipient_type,
               recipient_id_type,
               subject,
               message,
               is_read,
               sent_via,
               status
          } = req.body
          return res.json(
               {
                    recipient_type,
                    recipient_id_type,
                    subject,
                    message,
                    is_read,
                    sent_via,
                    status
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