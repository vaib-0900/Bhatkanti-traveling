const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const CustomersModel = require("../Customers/Customers.model");
const UsersModel = require("../User/Users.model");

const JWT_SECRET =
  process.env.JWT_SECRET || "travel_booking_secret_2026";


// =====================================================
// CUSTOMER REGISTER - WEBSITE
// =====================================================
const customerRegister = async (req, res) => {
    try {
        console.log("CUSTOMER REGISTER BODY:", req.body);

        const {
            email,
            password,
            first_name,
            last_name,
            phone,
            nationality,
            passport_number,
            address,
        } = req.body;

        // Validation
        if (
            !email ||
            !password ||
            !first_name ||
            !last_name
        ) {
            return res.status(400).json({
                message:
                    "Email, password, first name and last name are required",
            });
        }

        // Check existing customer
        const existingCustomer = await CustomersModel.findOne({
            email: email.toLowerCase().trim(),
        });

        if (existingCustomer) {
            return res.status(409).json({
                message: "Email already registered",
            });
        }

        // Password hash
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        // Create customer
        const customer = await CustomersModel.create({
            email: email.toLowerCase().trim(),

            password_hash: hashedPassword,

            first_name: first_name.trim(),

            last_name: last_name.trim(),

            phone: phone || "",

            nationality: nationality || "",

            passport_number: passport_number || "",

            address: address || "",

            is_active: true,
        });

        console.log(
            "CUSTOMER CREATED:",
            customer._id
        );

        // JWT
        const token = jwt.sign(
            {
                id: customer._id,
                type: "customer",
            },
            JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        return res.status(201).json({
            message: "Customer registered successfully",

            token,

            user: {
                _id: customer._id,
                email: customer.email,
                first_name: customer.first_name,
                last_name: customer.last_name,
                phone: customer.phone,
                nationality: customer.nationality,
                is_active: customer.is_active,
            },
        });

    } catch (error) {

        console.log(
            "CUSTOMER REGISTER ERROR:",
            error
        );

        return res.status(500).json({
            message: "Customer registration failed",
            error: error.message,
        });
    }
};


// =====================================================
// CUSTOMER LOGIN - WEBSITE
// =====================================================
const customerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find customer
    const customer = await CustomersModel.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!customer) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Check active
    if (!customer.is_active) {
      return res.status(403).json({
        message: "Your account is inactive",
      });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(
      password,
      customer.password_hash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: customer._id,
        type: "customer",
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      message: "Customer login successful",

      token,

      user: {
        _id: customer._id,
        email: customer.email,
        first_name: customer.first_name,
        last_name: customer.last_name,
        phone: customer.phone,
        nationality: customer.nationality,
        is_active: customer.is_active,
      },
    });
  } catch (error) {
    console.log("CUSTOMER LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Customer login failed",
      error: error.message,
    });
  }
};


// =====================================================
// ADMIN LOGIN
// =====================================================

const adminLogin = async (req, res) => {
    try {

        const { username, password } = req.body;

        console.log("USERNAME:", username);

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        const user = await UsersModel.findOne({
            $or: [
                { username: username },
                { email: username }
            ]
        });

        console.log("USER:", user);

        if (!user) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        if (user.role !== "admin") {
            return res.status(401).json({
                message: "Admin access denied"
            });
        }

        if (user.is_active !== true) {
            return res.status(401).json({
                message: "Admin account is inactive"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        console.log("PASSWORD MATCH:", passwordMatch);

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        user.last_login = new Date();
        await user.save();

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET || "admin_secret_key",
            {
                expiresIn: "1d"
            }
        );

        return res.status(200).json({
            message: "Admin login successful",

            token,

            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                full_name: user.full_name,
                role: user.role,
                profile_image: user.profile_image,
                is_active: user.is_active,
                last_login: user.last_login
            }
        });

    } catch (error) {

        console.log("ADMIN LOGIN ERROR:", error);

        return res.status(500).json({
            message: "Admin login error",
            error: error.message
        });
    }
};


// =====================================================
// GET LOGGED-IN CUSTOMER
// =====================================================
const customerMe = async (req, res) => {
  try {
    const customer = await CustomersModel.findById(req.user.id).select(
      "-password_hash"
    );

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      user: customer,
    });
  } catch (error) {
    console.log("CUSTOMER ME ERROR:", error);

    return res.status(500).json({
      message: "Failed to get customer",
      error: error.message,
    });
  }
};


// =====================================================
// GET LOGGED-IN ADMIN
// =====================================================
const adminMe = async (req, res) => {
  try {
    const user = await UsersModel.findById(req.user.id).select(
      "-password_hash"
    );

    if (!user) {
      return res.status(404).json({
        message: "Admin user not found",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log("ADMIN ME ERROR:", error);

    return res.status(500).json({
      message: "Failed to get admin user",
      error: error.message,
    });
  }
};


module.exports = {
  customerRegister,
  customerLogin,
  adminLogin,
  customerMe,
  adminMe,
};