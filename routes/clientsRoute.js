const express = require('express');

const router = express.Router();
const {
    getAllClients,
    postClient,
    deleteSingleClient,
    getSingleClient,
    updateSingleClient,
    deleteAllClients
} = require('../controllers/clientsCrud');

router.route('/')
    .get(getAllClients)
    .post(postClient)
    .delete(deleteAllClients)

router.route('/Client/:id')
    .delete(deleteSingleClient)
    .get(getSingleClient)
    .put(updateSingleClient)


module.exports = router