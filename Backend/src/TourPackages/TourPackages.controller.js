const TourpackagesModel = require("./Tourpackages.model")


const list = async (req, res) => {
    try {
        const data = await TourpackagesModel.find()
        return res.json(data)

    } catch (error) {
        console.log(error)
        return res.json('internal server error..')
    }
}
const store = async (req, res) => {
    try {
        const {
            package_name,
            slug,
            description,
            destination,
            duration_days,
            duration_nights,
            base_price,
            discount_price,
            max_group_size,
            min_group_size,
            inclusions,
            exclusions,
            itinerary,
            is_featured,
            is_active,
            status,
            category
        } = req.body;

        // req.files comes from multer.fields([{ name: "featured_image" }, { name: "gallery_images" }])
        const featured_image =
            req.files && req.files.featured_image
                ? req.files.featured_image[0].filename
                : null;

        const gallery_images =
            req.files && req.files.gallery_images
                ? req.files.gallery_images.map((file) => file.filename).join(",")
                : null;

        const save = await TourpackagesModel.create({
            package_name,
            slug,
            description,
            destination,
            duration_days,
            duration_nights,
            base_price,
            discount_price,
            max_group_size,
            min_group_size,
            inclusions,
            exclusions,
            itinerary,
            gallery_images,
            featured_image,
            is_featured,
            is_active,
            status,
            category
        });

        if (!save) {
            return res.status(400).json({
                message: "Something went wrong while saving tour package"
            });
        }

        return res.json({
            message: "Tour package added successfully",
            data: save
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Store error"
        });
    }
};
const show = async (req, res) => {
    try {
        const { id } = req.params
        const data = await TourpackagesModel.findById({ _id: id })
        return res.json(id)
    } catch (error) {
        console.log(error)
        return res.json('internal server error..')
    }
}
const deleted = async (req, res) => {
    try {
        const { id } = req.params
        const data = await TourpackagesModel.deleteOne({ _id: id })
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
                message: " Tour package  ID is required",
            });
        }

        const updateData = {

            package_name: req.body.package_name,
            slug: req.body.slug,
            description: req.body.description,
            destination: req.body.destination,
            duration_days: req.body.duration_days,
            duration_nights: req.body.duration_nights,
            base_price: req.body.base_price,
            discount_price: req.body.discount_price,
            max_group_size: req.body.max_group_size,
            min_group_size: req.body.min_group_size,
            inclusions: req.body.inclusions,
            exclusions: req.body.exclusions,
            itinerary: req.body.itinerary,
            gallery_images: req.body.gallery_images,
            featured_image: req.body.featured_image,
            is_featured: req.body.is_featured,
            is_active: req.body.is_active,
            status: req.body.status,
            category: req.body.category
        };

        const data = await TourpackagesModel.findByIdAndUpdate(
            _id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!data) {
            return res.status(404).json({
                message: "  Tourpackages not found",
            });
        }

        return res.status(200).json({
            message: "  Tourpackages updated successfully",
            data: data,
        });

    } catch (error) {
        console.log("  Tourpackages UPDATE ERROR:", error);

        return res.status(500).json({
            message: "  Tourpackages update error",
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