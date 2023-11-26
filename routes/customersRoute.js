const express = require('express');

const router = express.Router();
const {
    loginCustomer,
    registerCustomer,
    getProfile
} = require('../controllers/customersCrud');

const { authenticate } = require('../auth/index')

router.route('/register')
    .post(registerCustomer)

    
router.route('/login')
    .post(loginCustomer)

router.route('/profile')
        .get(authenticate, getProfile);

module.exports = router