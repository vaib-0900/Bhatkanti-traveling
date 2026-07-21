const mongoose = require('mongoose');

const TourpackagesSchema = new mongoose.Schema({

    package_name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    duration_days: {
        type: String,
        required: true,
    },
    duration_nights: {
        type: String,
        required: true,
    },
    base_price: {
        type: String,
        required: true,
    },
    discount_price: {
        type: String,
        required: true,
    },
    max_group_size: {
        type: Number,
        required: true,
    },
    min_group_size: {
        type: Number,
        required: true,
    },
    inclusions: {
        type: String,
        required: true,
    },
    exclusions: {
        type: String,
        required: true,
    },
    itinerary: {
        type: String,
        required: true,
    },
    gallery_images: {
        type: Object,
        required: true,
    },
    featured_image: {
        type: String,
        required: true,
    },
    is_featured: {
        type: Boolean,
        default: false,
    },
    is_active: {
         type: Boolean,
        default: true,
    },
    status: {
        type: String,
        enum: ["draft", "published", "archived"],
        default: 'draft'
    },
    category: {
        type: String,
        enum: ["draft", "published", "archived"],
        default: 'draft'
    },
},
{
    timestamps:true
},
)
const Tourpackagesmodel = module.exports = mongoose.model('tourpackages', TourpackagesSchema);

module.exports = Tourpackagesmodel    