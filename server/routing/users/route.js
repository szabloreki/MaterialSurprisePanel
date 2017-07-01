const express = require('express');
const router = express.Router();
const user = require ('./details');
const jwt = require('express-jwt');
const secret = require('../../token/sekret');

router

  .get('/', user.get)
  .get('/:id', user.info)
  .post('/',user.add)
  .delete('/:id', user.delete)
  .put('/:id', user.update);

module.exports = router;
