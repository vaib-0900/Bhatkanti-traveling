const express = require('express');
const router = express();
const controller = require('./User.controller')

router.get("/user/index",controller.index)
router.get("/user/show/:id",controller.show)
router.post("/user/store",controller.store)
router.put("/user/update",controller.updated)
router.delete("/user/delete/:id",controller.deleted)
module.exports = router;