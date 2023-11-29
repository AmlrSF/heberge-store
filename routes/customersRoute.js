const express = require('express');

const router = express.Router();
const {
    loginCustomer,
    registerCustomer,
    getProfile,
    updateCustomer,
    deleteCustomerById,
    getAllCustomers,
    getCustomerById
} = require('../controllers/customersCrud');

const { authenticate } = require('../auth/index')

router.route('/register')
    .post(registerCustomer)

    
router.route('/login')
    .post(loginCustomer)

router.route('/profile')
        .post(authenticate, getProfile);

router.route('/:id')
        .put(updateCustomer)
        .get(getCustomerById)
        .delete(deleteCustomerById)

router.route('')
    .get(getAllCustomers);
module.exports = router