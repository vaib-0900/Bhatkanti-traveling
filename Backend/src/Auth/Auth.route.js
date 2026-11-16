const express = require("express");

const router = express.Router();

const controller = require("./Auth.controller");

const {
    authMiddleware,
    customerAuth,
    adminAuth,
} = require("./Auth.middleware");

// Customer Auth
router.post(
    "/auth/customer/register",
    controller.customerRegister
);

router.post(
    "/auth/customer/login",
    controller.customerLogin
);

router.get(
    "/auth/customer/me",
    authMiddleware,
    customerAuth,
    controller.customerMe
);

const UsersController = require("../User/User.controller");

// Admin Login
router.post("/admin/login", UsersController.adminLogin);

router.get(
    "/auth/admin/me",
    authMiddleware,
    adminAuth,
    controller.adminMe
);

module.exports = router;