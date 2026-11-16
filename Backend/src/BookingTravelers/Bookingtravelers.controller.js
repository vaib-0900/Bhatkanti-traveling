
const BookingtravelersModel = require("./Bookingtravelers.model");

const list = async (req, res) => {
    try {
        const data = await BookingtravelersModel.find().sort({ _id: -1 });

        return res.status(200).json(data);
    } catch (error) {
        console.error("BOOKING TRAVELERS LIST ERROR:", error);

        return res.status(500).json({
            message: "Failed to fetch booking travelers",
            error: error.message,
        });
    }
};

// POST: Create booking traveler
const store = async (req, res) => {
    try {
        console.log("BOOKING TRAVELER STORE BODY:", req.body);

        const {
            booking_id,
            first_name,
            last_name,
            date_of_birth,
            passport_number,
            passport_expiry,
            gender,
            nationality,
            is_primary,
        } = req.body || {};

        // Basic required-field validation
        if (!booking_id || !first_name?.trim() || !last_name?.trim()) {
            return res.status(400).json({
                message: "booking_id, first_name and last_name are required",
            });
        }

        const save = await BookingtravelersModel.create({
            booking_id,
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            date_of_birth: date_of_birth || undefined,
            passport_number: passport_number || "",
            passport_expiry: passport_expiry || undefined,
            gender: gender || undefined,
            nationality: nationality || "",
            is_primary: is_primary === true || is_primary === "true",
        });

        return res.status(201).json({
            message: "Booking traveler created successfully",
            data: save,
        });
    } catch (error) {
        console.error("BOOKING TRAVELER STORE ERROR:", error);
        console.error("VALIDATION ERRORS:", error.errors);

        return res.status(500).json({
            message: "Failed to create booking traveler",
            error: error.message,
            details: error.errors
                ? Object.values(error.errors).map((item) => ({
                      field: item.path,
                      message: item.message,
                  }))
                : undefined,
        });
    }
};

// GET: Get one booking traveler
const show = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await BookingtravelersModel.findById(id);

        if (!data) {
            return res.status(404).json({
                message: "Booking traveler not found",
            });
        }

        return res.status(200).json({
            message: "Booking traveler fetched successfully",
            data,
        });
    } catch (error) {
        console.error("BOOKING TRAVELER SHOW ERROR:", error);

        return res.status(500).json({
            message: "Failed to fetch booking traveler",
            error: error.message,
        });
    }
};

// DELETE: Delete booking traveler
const deleted = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await BookingtravelersModel.findByIdAndDelete(id);

        if (!data) {
            return res.status(404).json({
                message: "Booking traveler not found",
            });
        }

        return res.status(200).json({
            message: "Booking traveler deleted successfully",
            data,
        });
    } catch (error) {
        console.error("BOOKING TRAVELER DELETE ERROR:", error);

        return res.status(500).json({
            message: "Failed to delete booking traveler",
            error: error.message,
        });
    }
};

// PUT: Update booking traveler
const updated = async (req, res) => {
    try {
        console.log("UPDATE BODY:", req.body);

        const { _id } = req.body || {};

        if (!_id) {
            return res.status(400).json({
                message: "Booking Traveler ID is required in req.body._id",
            });
        }

        const updateData = {
            booking_id: req.body.booking_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            date_of_birth: req.body.date_of_birth || undefined,
            passport_number: req.body.passport_number,
            passport_expiry: req.body.passport_expiry || undefined,
            gender: req.body.gender,
            nationality: req.body.nationality,
            is_primary:
                req.body.is_primary === true ||
                req.body.is_primary === "true",
        };

        // Remove undefined values so omitted fields are not overwritten.
        Object.keys(updateData).forEach((key) => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });

        const data = await BookingtravelersModel.findByIdAndUpdate(
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
        console.error("BOOKING TRAVELER UPDATE ERROR:", error);
        console.error("VALIDATION ERRORS:", error.errors);

        return res.status(500).json({
            message: "Failed to update booking traveler",
            error: error.message,
            details: error.errors
                ? Object.values(error.errors).map((item) => ({
                      field: item.path,
                      message: item.message,
                  }))
                : undefined,
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
