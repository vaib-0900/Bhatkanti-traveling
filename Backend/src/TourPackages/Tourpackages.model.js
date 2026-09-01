const mongoose = require('mongoose');

const TourpackagesSchema = new mongoose.Schema({

    package_name: {
        type: String,
     
    },
    slug: {
        type: String,
     
    },
    description: {
        type: String,
       
    },
    destination: {
        type: String,
       
    },
    duration_days: {
        type: String,
       
    },
    duration_nights: {
        type: String,
    
    },
    base_price: {
        type: String,
      
    },
    discount_price: {
        type: String,
    },
    max_group_size: {
        type: Number,
    },
    min_group_size: {
        type: Number,
    },
    inclusions: {
        type: String,
    },
    exclusions: {
        type: String,
    },
    itinerary: {
        type: String,
       
    },
    gallery_images: {
        type: String,
       
    },
    featured_image: {
        type: String,
       
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
    enum: ["adventure", "beach", "hill-station", "heritage", "wildlife", "fort", "religious", "honeymoon"],
    default: 'adventure'
},
},
{
    timestamps:true
},
)
const Tourpackagesmodel = module.exports = mongoose.model('tourpackages', TourpackagesSchema);

module.exports = Tourpackagesmodel    