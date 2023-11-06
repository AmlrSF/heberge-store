const express = require('express');

const router = express.Router();
const {
    postOrders,
    getOrders,
    getOrdersByCustomer,
    DeleteAllOrders,
    DeleteOrderById
} = require('../controllers/ordersCrud');

router.route('/')
    .post(postOrders)
    .get(getOrders)
    .delete(DeleteAllOrders)

router.route('/:id')
    .get(getOrdersByCustomer)
    .delete(DeleteOrderById);


module.exports = router