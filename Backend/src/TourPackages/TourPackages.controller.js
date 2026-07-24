const TourpackagesModel = require("./Tourpackages.model")
const tourpackages = require("./Tourpackages.model")

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
               gallery_images,
               featured_image,
               is_featured,
               is_active,
               status,
               category
          } = req.body

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
          })
          if (!save) {
               return res.json({
                    message: "somthing went wrong",
               })
          }


          return res.json(
               {
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
const show = async (req,res) =>{
     try {
        const {id} =req.params 
        const data = await TourpackagesModel.findById({_id:id})
        return res.json(id) 
     }  catch (error) {
     console.log(error)
     return res.json('internal server error..')
    }   
}
const deleted = async (req,res) =>{
      try {
        const {id} =req.params 
        const data = await TourpackagesModel.deleteOne({_id:id})
          return res.json({message:"Record Deleted Sucessfully..."})
        return res.json(id) 
     }  catch (error) {
     console.log(error)
     return res.json('internal server error..')
    }   
   
}
const updated = async (req, res) => {
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
               gallery_images,
               featured_image,
               is_featured,
               is_active,
               status,
               category
          } = req.body
          return res.json(
               {
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
               }
          )
     } catch (error) {
          console.log(error)
          return res.status(500).json({
               message: "update error"
          })
     }
}


module.exports = {
     list,
     store,
     show,
     deleted,
     updated
};