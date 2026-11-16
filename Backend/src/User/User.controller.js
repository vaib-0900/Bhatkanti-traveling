const UsersModel = require("./Users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// =====================================================
// LIST USERS
// =====================================================
const list = async (req, res) => {
  try {

    const data = await UsersModel.find();

    return res.status(200).json(data);

  } catch (error) {

    console.log("LIST ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


// =====================================================
// STORE USER
// =====================================================
const store = async (req, res) => {
    try {
        console.log("REQ BODY:", req.body);
        console.log("REQ FILE:", req.file);

        const {
            username,
            password,
            email,
            full_name,
            role
        } = req.body || {};

        if (!username || !password || !email || !full_name || !role) {
            return res.status(400).json({
                message: "All fields are required",
                missing: {
                    username: !username,
                    password: !password,
                    email: !email,
                    full_name: !full_name,
                    role: !role
                }
            });
        }

        const existingUsername = await UsersModel.findOne({ username });

        if (existingUsername) {
            return res.status(400).json({
                message: "Username already exists"
            });
        }

        const existingEmail = await UsersModel.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const save = await UsersModel.create({
            username: username.trim(),
            password_hash: hashedPassword,
            email: email.trim(),
            full_name: full_name.trim(),
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


// =====================================================
// ADMIN LOGIN
// =====================================================
const adminLogin = async (req, res) => {
  try {

    const {
      username,
      password,
    } = req.body;


    console.log("=================================");
    console.log("ADMIN LOGIN REQUEST");
    console.log("USERNAME:", username);
    console.log("PASSWORD:", password);
    console.log("=================================");


    // -----------------------------------------------
    // Validation
    // -----------------------------------------------
    if (!username || !password) {

      return res.status(400).json({
        message: "Username and password are required",
      });

    }


    // -----------------------------------------------
    // Find user by username OR email
    // -----------------------------------------------
    const user = await UsersModel.findOne({

      $or: [
        {
          username: username,
        },
        {
          email: username,
        },
      ],

    });


    console.log("LOGIN USER:", user);


    // -----------------------------------------------
    // User not found
    // -----------------------------------------------
    if (!user) {

      return res.status(401).json({
        message: "Invalid username or password",
      });

    }


    // -----------------------------------------------
    // Check Admin Role
    // -----------------------------------------------
    console.log("ROLE:", user.role);

    if (user.role !== "admin") {

      return res.status(401).json({
        message: "Admin access denied",
      });

    }


    // -----------------------------------------------
    // Check Active Status
    // -----------------------------------------------
    console.log("ACTIVE:", user.is_active);

    if (user.is_active !== true) {

      return res.status(401).json({
        message: "Admin account is inactive",
      });

    }


    // -----------------------------------------------
    // Check Password
    // -----------------------------------------------
   const passwordMatch = await bcrypt.compare(
    password,
    user.password_hash
);

if (!passwordMatch) {
    return res.status(401).json({
        message: "Invalid username or password"
    });
}


    // -----------------------------------------------
    // Update Last Login
    // -----------------------------------------------
    user.last_login = new Date();

    await user.save();


    // -----------------------------------------------
    // Create JWT Token
    // -----------------------------------------------
    const token = jwt.sign(

      {
        id: user._id,
        username: user.username,
        role: user.role,
      },

      process.env.JWT_SECRET || "admin_secret_key",

      {
        expiresIn: "1d",
      }

    );


    // -----------------------------------------------
    // Login Success
    // -----------------------------------------------
    return res.status(200).json({

      message: "Admin login successful",

      token: token,

      user: {

        id: user._id,

        username: user.username,

        email: user.email,

        full_name: user.full_name,

        role: user.role,

        profile_image: user.profile_image,

        is_active: user.is_active,

        last_login: user.last_login,

      },

    });


  } catch (error) {

    console.log(
      "ADMIN LOGIN ERROR:",
      error
    );

    return res.status(500).json({

      message: "Admin login error",

      error: error.message,

    });

  }
};


// =====================================================
// SHOW USER
// =====================================================
const show = async (req, res) => {
  try {

    const {
      id,
    } = req.params;


    const data = await UsersModel.findById(id);


    if (!data) {

      return res.status(404).json({
        message: "User not found",
      });

    }


    return res.status(200).json(data);


  } catch (error) {

    console.log("SHOW ERROR:", error);

    return res.status(500).json({

      message: "Internal server error",

      error: error.message,

    });
  }
};


// =====================================================
// DELETE USER
// =====================================================
const deleted = async (req, res) => {
  try {

    const {
      id,
    } = req.params;


    const deletedUser =
      await UsersModel.findByIdAndDelete(id);


    if (!deletedUser) {

      return res.status(404).json({
        message: "User not found",
      });

    }


    return res.status(200).json({

      message: "User deleted successfully",

    });


  } catch (error) {

    console.log(
      "DELETE ERROR:",
      error
    );

    return res.status(500).json({

      message: "Delete error",

      error: error.message,

    });
  }
};


// =====================================================
// UPDATE USER
// =====================================================
const updated = async (req, res) => {
  try {

    console.log(
      "UPDATE BODY:",
      req.body
    );

    console.log(
      "UPDATE FILE:",
      req.file
    );


    const {
      _id,
      username,
      email,
      full_name,
      role,
      is_active,
    } = req.body;


    // -----------------------------------------------
    // Check ID
    // -----------------------------------------------
    if (!_id) {

      return res.status(400).json({

        message: "User ID is required",

      });

    }


    // -----------------------------------------------
    // Convert Active / Inactive to Boolean
    // -----------------------------------------------
    let activeStatus = true;


    if (
      is_active === false ||
      is_active === "false" ||
      is_active === "0" ||
      is_active === 0
    ) {

      activeStatus = false;

    }


    // -----------------------------------------------
    // Update Data
    // -----------------------------------------------
    const updateData = {

      username,

      email,

      full_name,

      role,

      is_active: activeStatus,

    };


    // -----------------------------------------------
    // Update Image
    // -----------------------------------------------
    if (req.file) {

      updateData.profile_image =
        req.file.filename;

    }


    // -----------------------------------------------
    // Update User
    // -----------------------------------------------
    const updatedUser =
      await UsersModel.findByIdAndUpdate(

        _id,

        {
          $set: updateData,
        },

        {
          new: true,
          runValidators: true,
        }

      );


    if (!updatedUser) {

      return res.status(404).json({

        message: "User not found",

      });

    }


    return res.status(200).json({

      message: "User updated successfully",

      user: updatedUser,

    });


  } catch (error) {

    console.log(
      "UPDATE ERROR:",
      error
    );

    return res.status(500).json({

      message: "Update error",

      error: error.message,

    });
  }
};


// =====================================================
// EXPORT
// =====================================================
module.exports = {

  list,

  store,

  adminLogin,

  show,

  deleted,

  updated,

};