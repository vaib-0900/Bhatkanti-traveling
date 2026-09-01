const TourschedulesModel = require("./Tourschedules.model")
const tourschedule = require("./Tourschedules.model")

const list = async (req, res) => {
     try {
          const data = await tourschedule.find()
          return res.json(data)

     } catch (error) {
          console.log(error)
          return res.json('internal server error..')
     }
}
const store = async (req, res) => {
     try {
          const {
               package_id,
               departure_date,
               return_date,
               available_seats,
               total_seats,
               is_cancelled,
               price_override,
               notes
          } = req.body

          const save = await tourschedule.create({
               package_id,
               departure_date,
               return_date:return_date==""?Date.now:return_date,
               available_seats,
               total_seats,
               is_cancelled,
               price_override,
               notes
          })
          if (!save) {
               return res.json({
                    message: "somthing went wrong",
               })
          }

          return res.json(
               {
                    package_id,
                    departure_date,
                    return_date,
                    available_seats,
                    total_seats,
                    is_cancelled,
                    price_override,
                    notes
               }
          )
     } catch (error) {
          console.log(error)
          return res.status(500).json({
               message: "stored error"
          })

     }
}
const show = async (req,res) =>{
     try {
        const {id} =req.params 
        const data = await tourschedule.findById({_id:id})
        return res.json(id) 
     }  catch (error) {
     console.log(error)
     return res.json('internal server error..')
    }   
}
const deleted = async (req,res) =>{
      try {
        const {id} =req.params 
        const data = await tourschedule.deleteOne({_id:id})
          return res.json({message:"Record Deleted Sucessfully..."})
        return res.json(id) 
     }  catch (error) {
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
        message: " Tourschedules ID is required",
      });
    }

    const updateData = {

      package_id: req.body.package_id,
      departure_date: req.body.departure_date,
      return_date: req.body.return_date,
      available_seats: req.body.available_seats,
      total_seats: req.body.total_seats,
      is_cancelled: req.body.is_cancelled,
      price_override: req.body.price_override,
      notes: req.body.notes,
    };

    const data = await TourschedulesModel.findByIdAndUpdate(
      _id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!data) {
      return res.status(404).json({
        message: " Tourschedules not found",
      });
    }

    return res.status(200).json({
      message: " Tourschedules updated successfully",
      data: data,
    });

  } catch (error) {
    console.log(" Tourschedules UPDATE ERROR:", error);

    return res.status(500).json({
      message: " Tourschedules update error",
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