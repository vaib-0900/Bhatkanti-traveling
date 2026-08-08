const NotificationsModel = require('./Notifications.model')

const list = async (req, res) => {
    try {
        const data = await NotificationsModel.find()
        return res.json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const store = async (req, res) => {
    try {
        const {
            recipient_type,
            recipient_id_type,
            subject,
            message,
            is_read,
            sent_via,
            status
        } = req.body
        
        const save = await NotificationsModel.create({
            recipient_type,
            recipient_id_type,
            subject,
            message,
            is_read,
            sent_via,
            status
        })
        
        if (!save) {
            return res.status(400).json({
                message: "Something went wrong",
            })
        }

        return res.status(201).json({
            recipient_type,
            recipient_id_type,
            subject,
            message,
            is_read,
            sent_via,
            status
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Store error"
        })
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params 
        const data = await NotificationsModel.findById(id)
        if (!data) {
            return res.status(404).json({ message: "Record not found" })
        }
        return res.json(data) // Return data, not id
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }   
}

const deleted = async (req, res) => {
    try {
        const { id } = req.params 
        const data = await NotificationsModel.deleteOne({ _id: id })
        if (data.deletedCount === 0) {
            return res.status(404).json({ message: "Record not found" })
        }
        return res.json({ message: "Record Deleted Successfully..." })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }   
}

const updated = async (req, res) => {
    try {
        const { id } = req.params
        const {
            recipient_type,
            recipient_id_type,
            subject,
            message,
            is_read,
            sent_via,
            status
        } = req.body
        
        const updatedData = await NotificationsModel.findByIdAndUpdate(
            id,
            {
                recipient_type,
                recipient_id_type,
                subject,
                message,
                is_read,
                sent_via,
                status
            },
            { new: true } // Returns the updated document
        )
        
        if (!updatedData) {
            return res.status(404).json({ message: "Record not found" })
        }
        
        return res.json(updatedData)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Update error"
        })
    }
}

module.exports = {
    list,    // Now this exists!
    store,
    show,
    deleted,
    updated
};