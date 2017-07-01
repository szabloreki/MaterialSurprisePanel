const express = require ('express');
const router = express.Router();
const client = require ('./details');

router

  .get ('/', client.get)
  .get ('/:id', client.info)
  .post ('/', client.add)
  .delete ('/:id', client.delete)
  .put ('/:id', client.update);

module.exports = router;
