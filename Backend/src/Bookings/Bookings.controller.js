const BookingsModel = require("./Bookings.model");

const list = async (req,res) =>{
    try {
     const data = await BookingsModel.find()
     return res.json(data)

    } catch (error) {
     console.log(error)
     return res.json('internal server error..')
    }   
}


const store = async (req, res) => {
  try {
    console.log("BOOKING BODY:", req.body);

    const {
      booking_reference,
      customer_id,
      schedule_id,
      number_of_travelers,
      number_of_adults,
      number_of_children,
      total_price,
      discount_applied,
      booking_status,
      payment_status,
      special_requests,
      cancellation_reason,
    } = req.body;

    if (!customer_id || !String(customer_id).trim()) {
      return res.status(400).json({
        message: "Customer ID is required",
      });
    }

    if (!schedule_id || !String(schedule_id).trim()) {
      return res.status(400).json({
        message: "Schedule ID is required",
      });
    }

    const save = await BookingsModel.create({
      booking_reference,
      customer_id: String(customer_id),
      schedule_id: String(schedule_id),
      number_of_travelers,
      number_of_adults,
      number_of_children,
      total_price:
        total_price !== undefined ? String(total_price) : undefined,
      discount_applied:
        discount_applied !== undefined
          ? String(discount_applied)
          : undefined,
      booking_status: booking_status || "pending",
      payment_status: payment_status || "pending",
      special_requests,
      cancellation_reason,
    });

    return res.status(201).json({
      message: "Booking created successfully",
      data: save,
    });
  } catch (error) {
    console.error("BOOKING STORE ERROR:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Booking validation failed",
        error: error.message,
      });
    }

    return res.status(500).json({
      message: "Booking store error",
      error: error.message,
    });
  }
};


const show = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await BookingsModel.findById(id);

    if (!data) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.log("BOOKING SHOW ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


const deleted = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Booking ID is required",
      });
    }

    const deletedBooking =
      await BookingsModel.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      message: "Booking deleted successfully",
    });

  } catch (error) {
    console.log("BOOKING DELETE ERROR:", error);

    return res.status(500).json({
      message: "Booking delete error",
      error: error.message,
    });
  }
};


const updated = async (req, res) => {
  try {
    console.log("UPDATE BODY:", req.body);

    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({
        message: "Booking ID is required",
      });
    }

    const updateData = {
      booking_reference: req.body.booking_reference,
      customer_id: req.body.customer_id,
      schedule_id: req.body.schedule_id,
      number_of_travelers: req.body.number_of_travelers,
      number_of_adults: req.body.number_of_adults,
      number_of_children: req.body.number_of_children,
      total_price: req.body.total_price,
      discount_applied: req.body.discount_applied,
      booking_status: req.body.booking_status,
      payment_status: req.body.payment_status,
      special_requests: req.body.special_requests,
      cancellation_reason: req.body.cancellation_reason,
    };

    const data = await BookingsModel.findByIdAndUpdate(
      _id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!data) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      message: "Booking updated successfully",
      data: data,
    });
  } catch (error) {
    console.log("BOOKING UPDATE ERROR:", error);

    return res.status(500).json({
      message: "Booking update error",
      error: error.message,
    });
  }
};


module.exports = {
  list,
  store,
  show,
  deleted,
  updated,
};