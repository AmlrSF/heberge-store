const express = require('express');
const router = express.Router();

const {
  getAllFTPs,
  postFTP,
  deleteSingleFTP,
  getSingleFTP,
  updateSingleFTP,
  deleteAllFTPs,
  getSingleFtpBaseDomain
} = require('../controllers/FtpCrud');


//http://localhost:3000/api/v1/ftps
//http://localhost:3000/api/v1/ftps/:id


// FTP routes
router.route('/ftps')
  .get(getAllFTPs)
  .post(postFTP)
  .delete(deleteAllFTPs);

router.route('/ftps/:id')
  .get(getSingleFTP)
  .put(updateSingleFTP)
  .delete(deleteSingleFTP);


  router.route('/ftps/ftp/:id')
    .get(getSingleFtpBaseDomain)

module.exports = router;
