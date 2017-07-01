const express = require ('express');
const router = express.Router();
const task = require ('./details');

router

  .get('/', task.get)
  .get('/date/date', task.date)
  .get('/date/tomorrow', task.tomorrow)
  .get('/date/older', task.older)
  .get('/list/:userId', task.loggedUser)
  .put('/change/responsible', task.changeResponsible)
  .get('/:id', task.info)
  .get('/project/:projectId/category/:categoryId', task.catproj)
  .post('/', task.add)
  .delete('/:id', task.delete)
  .put('/:id', task.update);

module.exports = router;
