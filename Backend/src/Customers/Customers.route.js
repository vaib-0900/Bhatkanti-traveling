const express = require('express');
const router = express();
const controller = require('./Customers.controller')

router.get("/customers/list",controller.list)
router.get("/customers/show/:id",controller.show)
router.post("/customers/store",controller.store)
router.put("/customers/update",controller.updated)
router.delete("/customers/delete/:id",controller.deleted)
module.exports = router;