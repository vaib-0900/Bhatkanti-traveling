const express = require('express');
const router = express();
const controller = require('./TourPackages.controller');
const upload = require('../../middleware/Multer');

router.get("/tourpackages/list", controller.list)
router.get("/tourpackages/show/:id", controller.show)
router.post("/tourpackages/store",upload.fields([{ name: "featured_image", maxCount: 1 },{ name: "gallery_images", maxCount: 10 },]),controller.store);
router.put("/tourpackages/update", controller.updated)
router.delete("/tourpackages/delete/:id", controller.deleted)
module.exports = router;