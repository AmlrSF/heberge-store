const express = require('express');

const router = express.Router();
const {
    postOrders,
    getOrders
} = require('../controllers/ordersCrud');

router.route('/')
    .post(postOrders)
    .get(getOrders)


module.exports = router