const express = require('express');
const router = express();
const controller = require('./Tourschedules.controller')

router.get("/tourschedule/index",controller.index)
router.get("/tourschedule/show/:id",controller.show)
router.post("/tourschedule/store",controller.store)
router.put("/tourschedule/update",controller.updated)
router.delete("/tourschedule/delete/:id",controller.deleted)
module.exports = router;