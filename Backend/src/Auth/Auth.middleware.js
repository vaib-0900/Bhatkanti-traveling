const jwt = require("jsonwebtoken");

const JWT_SECRET =
  process.env.JWT_SECRET || "travel_booking_secret_2026";


// =====================================================
// COMMON AUTH MIDDLEWARE
// =====================================================
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization token is required",
      });
    }

    // Expected:
    // Authorization: Bearer TOKEN

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }

    const token = parts[1];

    if (!token) {
      return res.status(401).json({
        message: "Token is required",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    /*
      decoded example:

      Customer:
      {
        id: "...",
        type: "customer"
      }

      Admin:
      {
        id: "...",
        type: "admin",
        role: "admin"
      }
    */

    req.user = decoded;

    next();
  } catch (error) {
    console.log("AUTH MIDDLEWARE ERROR:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired. Please login again",
      });
    }

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};


// =====================================================
// CUSTOMER AUTH
// =====================================================
const customerAuth = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (req.user.type !== "customer") {
      return res.status(403).json({
        message: "Customer access required",
      });
    }

    next();
  } catch (error) {
    console.log("CUSTOMER AUTH ERROR:", error);

    return res.status(403).json({
      message: "Customer authorization failed",
    });
  }
};


// =====================================================
// ADMIN AUTH
// =====================================================
const adminAuth = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (req.user.type !== "admin") {
      return res.status(403).json({
        message: "Admin access required",
      });
    }

    next();
  } catch (error) {
    console.log("ADMIN AUTH ERROR:", error);

    return res.status(403).json({
      message: "Admin authorization failed",
    });
  }
};


// =====================================================
// ROLE AUTH
// =====================================================
const roleAuth = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      if (req.user.type !== "admin") {
        return res.status(403).json({
          message: "Admin access required",
        });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          message: "You do not have permission to access this resource",
        });
      }

      next();
    } catch (error) {
      console.log("ROLE AUTH ERROR:", error);

      return res.status(403).json({
        message: "Role authorization failed",
      });
    }
  };
};


module.exports = {
  authMiddleware,
  customerAuth,
  adminAuth,
  roleAuth,
};