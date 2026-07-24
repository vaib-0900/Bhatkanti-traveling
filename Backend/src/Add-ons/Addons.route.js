const express = require('express');
const router = express();
const controller = require('./Addons.controller')

router.get("/addons/list",controller.list)
router.get("/addons/show/:id",controller.show)
router.post("/addons/store",controller.store)
router.put("/addons/update",controller.updated)
router.delete("/addons/delete/:id",controller.deleted)
module.exports = router;