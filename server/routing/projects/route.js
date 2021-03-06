const express = require ('express');
const router = express.Router();
const project = require ('./details');

router

  .get ('/', project.get)
  .get ('/:id', project.info)
  .get ('/user/:userId', project.userId)
  .post ('/', project.add)
  .delete ('/:id', project.delete)
  .put ('/:id', project.update);

module.exports = router;
