const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password_hash: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    full_name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "manager", "agent"],
        default: 'admin'
    },
    profile_image: {
        type: String,
        required: true,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    last_login: {
        type: String,
        required: true,

    },

},
{
    timestamps:true
},
)

const Usersmodel = module.exports = mongoose.model('users', UsersSchema);

module.exports = Usersmodel