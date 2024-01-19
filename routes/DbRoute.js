const express = require('express');
const router = express.Router();

const {
  getAllDBs,
  postDB,
  deleteSingleDB,
  getSingleDB,
  updateSingleDB,
  deleteAllDBs
} = require('../controllers/DbCrud');



//http://localhost:3000/api/v1/dbs
//http://localhost:3000/api/v1/dbs/:id



//DB routes
router.route('/dbs')
  .get(getAllDBs)
  .post(postDB)
  .delete(deleteAllDBs);

router.route('/dbs/:id')
  .get(getSingleDB)
  .put(updateSingleDB)
  .delete(deleteSingleDB);

module.exports = router;
