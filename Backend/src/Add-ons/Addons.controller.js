const AddonsModel = require("./Addons.model")

const list = async (req,res) =>{
    try {
     const data = await AddonsModel.find()
     return res.json(data)

    } catch (error) {
     console.log(error)
     return res.json('internal server error..')
    }   
}
const store = async (req,res) =>{
     try {
          const{
               addon_name,
               description,
               price,
               currency,
               is_per_person,
               is_active
          }= req.body;

          const save = await AddonsModel.create({
               addon_name,
               description,
               price,
               currency,
               is_per_person,
               is_active
          })
          if(!save){
               return res.json({
                    message:"somthing went wrong",
               })
          }
          
          return res.json(
               {
              addon_name,
               description,
               price,
               currency,
               is_per_person,
               is_active
               }
          )
           
     } catch (error) {
          console.log(error)
          return res.status(500).json({
          message:"stored error"
          })
          
     }
     return res.json("i am store function");
}
const show = async (req,res) =>{
     try {
        const {id} =req.params 
        const data = await AddonsModel.findById({_id:id})
        return res.json(id) 
     }  catch (error) {
     console.log(error)
     return res.json('internal server error..')
    }   
}
const deleted = async (req,res) =>{
      try {
        const {id} =req.params 
        const data = await AddonsModel.deleteOne({_id:id})
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
        message: "addon ID is required",
      });
    }

    const updateData = {
      addon_name: req.body.addon_name,
      description: req.body.description,
      price: req.body.price,
      currency: req.body.currency,
      is_per_person: req.body.is_per_person,
      is_active: req.body.is_active,
     
    };

    const data = await AddonsModel.findByIdAndUpdate(
      _id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!data) {
      return res.status(404).json({
        message: "addon not found",
      });
    }

    return res.status(200).json({
      message: "addon updated successfully",
      data: data,
    });

  } catch (error) {
    console.log("addon UPDATE ERROR:", error);

    return res.status(500).json({
      message: "addon update error",
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