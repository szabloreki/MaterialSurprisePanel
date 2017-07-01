const express = require('express');
const router = express.Router();
const login = require ('./details');

router

  .post('/', login.login)
  .post('/forgot', login.forgot)
  .put('/change/:recoveryKey', login.change);

module.exports = router;
