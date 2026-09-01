
const UsersModel = require("./Users.model");

const list = async (req,res) =>{
    try {
     const data = await UsersModel.find()
     return res.json(data)

    } catch (error) {
     console.log(error)
     return res.json('internal server error..')
    }   
}
const store = async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      full_name,
      role
    } = req.body;

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const save = await UsersModel.create({
      username: username,
      password_hash: password,
      email: email,
      full_name: full_name,
      role: role,
      profile_image: req.file ? req.file.filename : null,
      is_active: true,
      last_login: null
    });

    return res.status(201).json({
      message: "User created successfully",
      user: save
    });

  } catch (error) {
    console.log("STORE ERROR:", error);

    return res.status(500).json({
      message: "User store error",
      error: error.message
    });
  }
};
const show = async (req,res) =>{
     try {
        const {id} =req.params 
        const data = await UsersModel.findById({_id:id})
        return res.json(id) 
     }  catch (error) {
     console.log(error)
     return res.json('internal server error..')
    }   
}
const deleted = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await UsersModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "User deleted successfully"
    });

  } catch (error) {
    console.log("DELETE ERROR:", error);

    return res.status(500).json({
      message: "Delete error",
      error: error.message
    });
  }
};
const updated = async (req, res) => {
  try {
    const {
      _id,
      username,
      email,
      full_name,
      role,
      isactive
    } = req.body;

    if (!_id) {
      return res.status(400).json({
        message: "User ID is required"
      });
    }

    const updateData = {
      username,
      email,
      full_name,
      role,
      is_active: isactive === "true"
    };

    if (req.file) {
      updateData.profile_image = req.file.filename;
    }

    const updatedUser = await UsersModel.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.log("UPDATE ERROR:", error);

    return res.status(500).json({
      message: "Update error",
      error: error.message
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