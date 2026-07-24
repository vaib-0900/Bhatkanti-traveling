const express = require('express');
const router = express();
const controller = require('./Bookingaddons.controller')

router.get("/bookingaddons/list",controller.list)
router.get("/bookingaddons/show/:id",controller.show)
router.post("/bookingaddons/store",controller.store)
router.put("/bookingaddons/update",controller.updated)
router.delete("/bookingaddons/delete/:id",controller.deleted)
module.exports = router;