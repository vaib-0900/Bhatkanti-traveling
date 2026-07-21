const express = require('express');
const router = express();
const controller = require('./User.controller')

router.get("/user/index",controller.index)
router.get("/user/show",controller.show)
router.post("/user/store",controller.store)
router.put("/user/updated",controller.updated)
router.delete("/user/deleted",controller.deleted)
module.exports = router;