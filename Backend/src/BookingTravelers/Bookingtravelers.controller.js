const BookingtravelersModel = require("./Bookingtravelers.model")


const list = async (req, res) => {
     try {
          const data = await BookingtravelersModel.find()
          return res.json(data)

     } catch (error) {
          console.log(error)
          return res.json('internal server error..')
     }
}
const store = async (req, res) => {
     try {

          const {
               booking_id,
               first_name,
               last_name,
               date_of_birth,
               passport_number,
               passport_expiry,
               gender,
               nationality,
               is_primary
          } = req.body

          const save = await BookingtravelersModel.create({
               booking_id,
               first_name,
               last_name,
               date_of_birth,
               passport_number,
               passport_expiry,
               nationality,
               is_primary
          })
          if (!save) {
               return res.json({
                    message: "somthing went wrong",
               })
          }
          return res.json(
               {
                    booking_id,
                    first_name,
                    last_name,
                    date_of_birth,
                    passport_number,
                    passport_expiry,
                    gender,
                    nationality,
                    is_primary
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
          const data = await BookingtravelersModel.findById({ _id: id })
          return res.json(id)
     } catch (error) {
          console.log(error)
          return res.json('internal server error..')
     }
}
const deleted = async (req, res) => {
     try {
          const { id } = req.params
          const data = await BookingtravelersModel.deleteOne({ _id: id })
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
        message: "Booking Traveler ID is required",
      });
    }

    const updateData = {
      booking_id: req.body.booking_id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date_of_birth: req.body.date_of_birth,
      passport_number: req.body.passport_number,
      passport_expiry: req.body.passport_expiry,
      gender: req.body.gender,
      nationality: req.body.nationality,
      is_primary: req.body.is_primary,
    };

    console.log("UPDATE ID:", _id);
    console.log("UPDATE DATA:", updateData);

    const data =
      await BookingtravelersModel.findByIdAndUpdate(
        _id,
        { $set: updateData },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!data) {
      return res.status(404).json({
        message: "Booking traveler not found",
      });
    }

    return res.status(200).json({
      message: "Booking traveler updated successfully",
      data,
    });

  } catch (error) {
    console.error(
      "Bookingtraveler UPDATE ERROR:",
      error
    );

    return res.status(500).json({
      message: "Bookingtraveler update error",
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