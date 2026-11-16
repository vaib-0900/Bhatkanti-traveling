const mongoose = require("mongoose");

const CustomersSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        password_hash: {
            type: String,
            required: true,
        },

        first_name: {
            type: String,
            required: true,
            trim: true,
        },

        last_name: {
            type: String,
            required: true,
            trim: true,
        },

        phone: {
            type: String,
            default: "",
        },

        date_of_birth: {
            type: Date,
            default: null,
        },

        nationality: {
            type: String,
            default: "",
        },

        passport_number: {
            type: String,
            default: "",
        },

        address: {
            type: String,
            default: "",
        },

        emergency_contact_name: {
            type: String,
            default: "",
        },

        emergency_contact_phone: {
            type: String,
            default: "",
        },

        is_active: {
            type: Boolean,
            default: true,
        },

        preferred_language: {
            type: String,
            default: "en",
        },

        newsletter_subscription: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const CustomersModel = mongoose.model(
    "customers",
    CustomersSchema
);

module.exports = CustomersModel;