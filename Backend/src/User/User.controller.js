
const UsersModel = require("./Users.model");

const list = async (req,res) =>{
    try {
     const data = await UsersModel.find()
     return res.json(data)

    } catch (error) {
     console.log(error)
     return res.json('internal server error..')
    }   
}
const store = async (req,res) =>{
     try {
          const{
               username,
               password_hash,
               email,
               full_name,
               role,
               profile_image,
               last_login,
               is_active
          }= req.body;

          const save = await UsersModel.create({
                username,
               password_hash,
               email,
               full_name,
               role,
               profile_image,
               last_login,
               is_active
          })
          if(!save){
               return res.json({
                    message:"somthing went wrong",
               })
          }
          
          return res.json(
               {
               username,
               password_hash,
               email,
               full_name,
               role,
               profile_image,
               last_login,
               is_active
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
        const data = await UsersModel.findById({_id:id})
        return res.json(id) 
     }  catch (error) {
     console.log(error)
     return res.json('internal server error..')
    }   
}
const deleted = async (req,res) =>{
      try {
        const {id} =req.params 
        const data = await UsersModel.deleteOne({_id:id})
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
               username,
               password_hash,
               email,
               full_name,
               role,
               profile_image,
               last_login,
               is_active
              
           }= req.body
           return res.json(
               {
               username,
               password_hash,
               email,
               full_name,
               role,
               profile_image,
               last_login,
               is_active
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