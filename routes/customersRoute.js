const express = require('express');

const router = express.Router();
const {
    PostCostmers
} = require('../controllers/customersCrud');

router.route('/')
    .post(PostCostmers)


module.exports = router