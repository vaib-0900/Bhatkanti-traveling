const express = require('express');
const router = express();
const controller = require('./Bookingtravelers.controller')

router.get("/bookingtravelers/list",controller.list)
router.get("/bookingtravelers/show/:id",controller.show)
router.post("/bookingtravelers/store",controller.store)
router.put("/bookingtravelers/update",controller.updated)
router.delete("/bookingtravelers/delete/:id",controller.deleted)
module.exports = router;