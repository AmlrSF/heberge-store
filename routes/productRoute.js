const express = require('express');

const router = express.Router();
const {
    getAllProducts,
    postProduct,
    deleteSingleProduct,
    getSingleProduct,
    UpdateSingleProduct
} = require('../controllers/productsCrud');

router.route('/')
    .get(getAllProducts)
    .post(postProduct);




module.exports = router