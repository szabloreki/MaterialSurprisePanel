const express = require ('express');
const router = express.Router();
const category = require ('./details');

router

  .get ('/', category.get)
  .get ('/:id', category.info)
  .get ('/project/:projectId', category.projectId)
  .post ('/', category.add)
  .delete ('/:id', category.delete)
  .put ('/:id', category.update);

module.exports = router;
