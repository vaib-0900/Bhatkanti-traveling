const express = require('express');
const router = express();
const controller = require('./TourPackages.controller')

router.get("/tourpackages/list",controller.list)
router.get("/tourpackages/show/:id",controller.show)
router.post("/tourpackages/store",controller.store)
router.put("/tourpackages/update",controller.updated)
router.delete("/tourpackages/delete/:id",controller.deleted)
module.exports = router;