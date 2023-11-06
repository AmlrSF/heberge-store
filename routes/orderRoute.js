const express = require('express');

const router = express.Router();
const {
    postOrders,
    getOrders,
    getOrdersByCustomer,
    DeleteAllOrders,
    DeleteOrderById,
    UpdateOrderById
} = require('../controllers/ordersCrud');

router.route('/')
    .post(postOrders)
    .get(getOrders)
    .delete(DeleteAllOrders)

router.route('/:id')
    .get(getOrdersByCustomer)
    .delete(DeleteOrderById)
    .put(UpdateOrderById);


module.exports = router