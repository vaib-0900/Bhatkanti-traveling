const mongoose = require("mongoose");

const TourschedulesSchema = new mongoose.Schema(
  {
    package_id: {
      type: String,
      required: true,
    },

    departure_date: {
      type: Date,
      required: true,
    },

    return_date: {
      type: Date,
      default: null,
    },

    available_seats: {
      type: Number,
      required: true,
      min: 0,
    },

    total_seats: {
      type: Number,
      required: true,
      min: 1,
    },

    is_cancelled: {
      type: Boolean,
      default: false,
    },

    price_override: {
      type: Number,
      default: 0,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const TourschedulesModel = mongoose.model(
  "tourschedules",
  TourschedulesSchema
);

module.exports = TourschedulesModel;