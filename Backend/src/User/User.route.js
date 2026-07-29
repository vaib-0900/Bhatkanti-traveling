const express = require('express');
const router = express();
const controller = require('./User.controller');
const upload = require('../../middleware/Multer');

router.get("/user/list",controller.list)
router.get("/user/show/:id",controller.show)
router.post("/user/store",upload.single("image"),controller.store)
router.put("/user/update",controller.updated)
router.delete("/user/delete/:id",controller.deleted)
module.exports = router;