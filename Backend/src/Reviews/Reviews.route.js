const express = require('express');
const router = express();
const controller = require('./Reviews.controller')

router.get("/reviews/list",controller.list)
router.get("/reviews/show/:id",controller.show)
router.post("/reviews/store",controller.store)
router.put("/reviews/update",controller.updated)
router.delete("/reviews/delete/:id",controller.deleted)
module.exports = router;