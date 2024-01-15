const express = require('express');

const router = express.Router();
const {
    getAllDomains,
    postDomain,
    deleteSingleDomain,
    getSingleDomain,
    updateSingleDomain,
    deleteAllDomains
} = require('../controllers/domainCrud');

router.route('/')
    .get(getAllDomains)
    .post(postDomain)
    .delete(deleteAllDomains)

router.route('/Domain/:id')
    .delete(deleteSingleDomain)
    .get(getSingleDomain)
    .put(updateSingleDomain)


module.exports = router