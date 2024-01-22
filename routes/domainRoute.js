const express = require('express');

const router = express.Router();
const {
    getAllDomains,
    postDomain,
    deleteSingleDomain,
    getSingleDomain,
    updateSingleDomain,
    deleteAllDomains,
    getAllDomainsBaseOnClient
} = require('../controllers/domainCrud');

router.route('/')
    .get(getAllDomains)
    .post(postDomain)
    .delete(deleteAllDomains)

router.route('/Domain/:id')
    .delete(deleteSingleDomain)
    .get(getSingleDomain)
    .put(updateSingleDomain)

router.route('/Domain/client/:id')
    .get(getAllDomainsBaseOnClient);


module.exports = router