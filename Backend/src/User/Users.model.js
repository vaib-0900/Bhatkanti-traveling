const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
       
    },
    password_hash: {
        type: String,
       
    },
    email: {
        type: String,
       
    },
    full_name: {
        type: String,
      
    },
    role: { 
        type: String,
        enum: ["admin", "manager", "agent"],
        default: 'admin'
    },
    profile_image: {
        type: String,
      
    },  
    is_active: {
        type: Boolean,
      
    },
    last_login: {
        type: String,
       

    },

},
{
    timestamps:true
},
)

const Usersmodel = module.exports = mongoose.model('users', UsersSchema);

module.exports = Usersmodel