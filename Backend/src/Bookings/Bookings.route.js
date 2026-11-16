const express = require("express");

const router =
    express.Router();

const controller =
    require("./Bookings.controller");
router.get(
    "/bookings/list",
    controller.list
);

router.get(
    "/bookings/show/:id",
    controller.show
);

router.post(
    "/bookings/store",
    controller.store
);

router.put(
    "/bookings/update/:id",
    controller.updated
);

router.delete(
    "/bookings/delete/:id",
    controller.deleted
);


module.exports = router;