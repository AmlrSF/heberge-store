const express = require('express');

const router = express.Router();

const {
    deleteBillboardById,
    createBillboard,
    updateBillboardById,
    getBillboardById,
    getAllBillboards,
    deleteAllBillboards
} = require('../controllers/billboardsCrud');

router.route('/')
    .get(getAllBillboards)
    .post(createBillboard)
    .delete(deleteAllBillboards)

router.route('/billboard/:id')
    .delete(deleteBillboardById)
    .get(getBillboardById)
    .put(updateBillboardById)


module.exports = router