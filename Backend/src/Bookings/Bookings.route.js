const express = require('express');
const router = express();
const controller = require('./Bookings.controller')

router.get("/bookings/index",controller.index)
router.get("/bookings/show/:id",controller.show)
router.post("/bookings/store",controller.store)
router.put("/bookings/update",controller.updated)
router.delete("/bookings/delete/:id",controller.deleted)
module.exports = router;