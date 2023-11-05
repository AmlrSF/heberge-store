const express = require('express');

const router = express.Router();
const {
    postOrders,
    getOrders,
    getOrdersByCustomer
} = require('../controllers/ordersCrud');

router.route('/')
    .post(postOrders)
    .get(getOrders)

router.route('/:id')
    .get(getOrdersByCustomer);


module.exports = router