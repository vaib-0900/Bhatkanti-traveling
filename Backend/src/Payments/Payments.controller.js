
const PaymentsModel = require("./Payments.model");

// GET: List all payments
const list = async (req, res) => {
    try {
        const data = await PaymentsModel.find();

        return res.status(200).json({
            message: "Payments fetched successfully",
            data,
        });
    } catch (error) {
        console.error("PAYMENTS LIST ERROR:", error);

        return res.status(500).json({
            message: "Failed to fetch payments",
            error: error.message,
        });
    }
};

// POST: Create payment
const store = async (req, res) => {
    try {
        console.log("PAYMENT STORE BODY:", req.body);

        const {
            booking_id,
            payment_reference,
            amount,
            currency,
            payment_method,
            transaction_id,
            refund_reason,
            notes,
            processed_by,
        } = req.body || {};

        // Basic validation
        if (!booking_id) {
            return res.status(400).json({
                message: "booking_id is required",
            });
        }

        if (amount === undefined || amount === null || amount === "") {
            return res.status(400).json({
                message: "amount is required",
            });
        }

        const numericAmount = Number(amount);

        if (!Number.isFinite(numericAmount) || numericAmount < 0) {
            return res.status(400).json({
                message: "amount must be a valid non-negative number",
            });
        }

        const save = await PaymentsModel.create({
            booking_id,
            payment_reference: payment_reference || `PAY-${Date.now()}`,
            amount: numericAmount,
            currency: currency || "INR",
            payment_method: payment_method || "card",
            transaction_id: transaction_id || "",
            refund_reason: refund_reason || "",
            notes: notes || "",
            processed_by: processed_by || undefined,
        });

        return res.status(201).json({
            message: "Payment created successfully",
            data: save,
        });
    } catch (error) {
        console.error("PAYMENT STORE ERROR:", error);
        console.error("PAYMENT VALIDATION ERRORS:", error.errors);

        return res.status(500).json({
            message: "Failed to create payment",
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

// GET: Get one payment
const show = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await PaymentsModel.findById(id);

        if (!data) {
            return res.status(404).json({
                message: "Payment not found",
            });
        }

        return res.status(200).json({
            message: "Payment fetched successfully",
            data,
        });
    } catch (error) {
        console.error("PAYMENT SHOW ERROR:", error);

        return res.status(500).json({
            message: "Failed to fetch payment",
            error: error.message,
        });
    }
};

// DELETE: Delete one payment
const deleted = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await PaymentsModel.findByIdAndDelete(id);

        if (!data) {
            return res.status(404).json({
                message: "Payment not found",
            });
        }

        return res.status(200).json({
            message: "Payment deleted successfully",
            data,
        });
    } catch (error) {
        console.error("PAYMENT DELETE ERROR:", error);

        return res.status(500).json({
            message: "Failed to delete payment",
            error: error.message,
        });
    }
};

// PUT: Update payment
const updated = async (req, res) => {
    try {
        console.log("PAYMENT UPDATE BODY:", req.body);

        const { _id } = req.body || {};

        if (!_id) {
            return res.status(400).json({
                message: "Payment ID (_id) is required",
            });
        }

        const updateData = {
            booking_id: req.body.booking_id,
            payment_reference: req.body.payment_reference,
            amount: req.body.amount,
            currency: req.body.currency,
            payment_method: req.body.payment_method,
            transaction_id: req.body.transaction_id,
            refund_reason: req.body.refund_reason,
            notes: req.body.notes,
            processed_by: req.body.processed_by,
        };

        // Avoid overwriting existing fields with omitted values.
        Object.keys(updateData).forEach((key) => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });

        if (
            updateData.amount !== undefined &&
            (
                updateData.amount === "" ||
                !Number.isFinite(Number(updateData.amount)) ||
                Number(updateData.amount) < 0
            )
        ) {
            return res.status(400).json({
                message: "amount must be a valid non-negative number",
            });
        }

        if (updateData.amount !== undefined) {
            updateData.amount = Number(updateData.amount);
        }

        const data = await PaymentsModel.findByIdAndUpdate(
            _id,
            { $set: updateData },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!data) {
            return res.status(404).json({
                message: "Payment not found",
            });
        }

        return res.status(200).json({
            message: "Payment updated successfully",
            data,
        });
    } catch (error) {
        console.error("PAYMENT UPDATE ERROR:", error);
        console.error("PAYMENT VALIDATION ERRORS:", error.errors);

        return res.status(500).json({
            message: "Failed to update payment",
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
