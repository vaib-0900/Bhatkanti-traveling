const express = require('express');
const router = express();
const controller = require('./Notifications.controller')

router.get("/notifications/index",controller.index)
router.get("/notifications/show/:id",controller.show)
router.post("/notifications/store",controller.store)
router.put("/notifications/update",controller.updated)
router.delete("/notifications/delete/:id",controller.deleted)
module.exports = router;