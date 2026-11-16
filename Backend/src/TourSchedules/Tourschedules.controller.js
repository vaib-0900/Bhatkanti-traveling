const TourschedulesModel = require("./Tourschedules.model");

/* =========================================================
   LIST
========================================================= */

const list = async (req, res) => {
    try {

        const data = await TourschedulesModel
            .find()
            .sort({ departure_date: 1 });

        return res.status(200).json(data);

    } catch (error) {

        console.log(
            "TOUR SCHEDULE LIST ERROR:",
            error
        );

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


/* =========================================================
   STORE
========================================================= */

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
    } = req.body;

    const save = await TourschedulesModel.create({
      package_id: String(package_id),
      departure_date,
      return_date: return_date === "" ? null : return_date,
      available_seats: Number(available_seats),
      total_seats: Number(total_seats),
      is_cancelled:
        is_cancelled === true ||
        is_cancelled === "true",
      price_override:
        price_override === ""
          ? 0
          : Number(price_override),
      notes
    });

    return res.status(201).json({
      message: "Tour schedule created successfully",
      data: save
    });

  } catch (error) {
    console.log("TOUR SCHEDULE STORE ERROR:", error);

    return res.status(500).json({
      message: "Tour schedule store error",
      error: error.message
    });
  }
};

/* =========================================================
   SHOW
========================================================= */

const show = async (req, res) => {

    try {

        const { id } = req.params;

        if (!id) {

            return res.status(400).json({
                message:
                    "Tour schedule ID is required"
            });
        }


        const data =
            await TourschedulesModel.findById(id);


        if (!data) {

            return res.status(404).json({
                message:
                    "Tour schedule not found"
            });
        }


        return res.status(200).json(data);


    } catch (error) {

        console.log(
            "TOUR SCHEDULE SHOW ERROR:",
            error
        );

        return res.status(500).json({

            message:
                "Internal server error",

            error:
                error.message
        });
    }
};


/* =========================================================
   DELETE
========================================================= */

const deleted = async (req, res) => {

    try {

        const { id } = req.params;

        console.log(
            "DELETE TOUR SCHEDULE ID:",
            id
        );


        if (!id) {

            return res.status(400).json({
                message:
                    "Tour schedule ID is required"
            });
        }


        const data =
            await TourschedulesModel.findByIdAndDelete(
                id
            );


        if (!data) {

            return res.status(404).json({
                message:
                    "Tour schedule not found"
            });
        }


        return res.status(200).json({

            message:
                "Tour schedule deleted successfully",

            data
        });


    } catch (error) {

        console.log(
            "TOUR SCHEDULE DELETE ERROR:",
            error
        );

        return res.status(500).json({

            message:
                "Tour schedule delete error",

            error:
                error.message
        });
    }
};


/* =========================================================
   UPDATE
========================================================= */

const updated = async (req, res) => {

    try {

        console.log(
            "UPDATE TOUR SCHEDULE BODY:",
            req.body
        );


        const { _id } = req.body;


        if (!_id) {

            return res.status(400).json({

                message:
                    "Tour schedule ID is required"
            });
        }


        const updateData = {

            package_id:
                req.body.package_id,

            departure_date:
                req.body.departure_date,

            return_date:
                req.body.return_date || null,

            available_seats:
                Number(
                    req.body.available_seats || 0
                ),

            total_seats:
                Number(
                    req.body.total_seats || 0
                ),

            is_cancelled:
                req.body.is_cancelled === true ||
                req.body.is_cancelled === "true",

            price_override:
                req.body.price_override || null,

            notes:
                req.body.notes || ""
        };


        const data =
            await TourschedulesModel.findByIdAndUpdate(

                _id,

                updateData,

                {
                    new: true,
                    runValidators: true
                }
            );


        if (!data) {

            return res.status(404).json({

                message:
                    "Tour schedule not found"
            });
        }


        return res.status(200).json({

            message:
                "Tour schedule updated successfully",

            data
        });


    } catch (error) {

        console.log(
            "TOUR SCHEDULE UPDATE ERROR:",
            error
        );

        return res.status(500).json({

            message:
                "Tour schedule update error",

            error:
                error.message
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