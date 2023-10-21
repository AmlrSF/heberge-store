const express = require('express');

const router = express.Router();
const {
    getAllProducts,
    postProduct,
    deleteSingleProduct,
    getSingleProduct,
    updateSingleProduct,
    deleteAllProducts
} = require('../controllers/productsCrud');

router.route('/')
    .get(getAllProducts)
    .post(postProduct)
    .delete(deleteAllProducts)

router.route('/product/:id')
    .delete(deleteSingleProduct)
    .get(getSingleProduct)
    .put(updateSingleProduct)


module.exports = router