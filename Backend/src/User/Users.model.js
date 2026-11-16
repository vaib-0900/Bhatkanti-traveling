const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    password_hash: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    full_name: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["admin", "manager", "agent"],
      default: "admin",
    },

    profile_image: {
      type: String,
      default: null,
    },

    is_active: {
      type: Boolean,
      default: true,
    },

    last_login: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const UsersModel = mongoose.model("users", UsersSchema);

module.exports = UsersModel;