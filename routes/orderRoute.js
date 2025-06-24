const express = require("express");
const { getAllOrders, getOrder, createOrder } = require("../controllers/orderController");

const router = express.Router()

router
    .route('/')
    .get(getAllOrders)
    .post(createOrder)
router
    .route('/:id')
    .get(getOrder)

module.exports = router;