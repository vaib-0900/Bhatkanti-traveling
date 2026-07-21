const express = require('express');
const router = express();
const controller = require('./Payments.controller')

router.get("/payments/index",controller.index)
router.get("/payments/show/:id",controller.show)
router.post("/payments/store",controller.store)
router.put("/payments/update",controller.updated)
router.delete("/payments/delete/:id",controller.deleted)
module.exports = router;