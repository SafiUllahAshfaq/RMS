'use strict';

const controller = require('./candidate.controller');
const router = require('koa-router')({
  prefix: `/candidate`
});

router
  .get('/allevaluations', controller.getAllEvaluations)
  .get('/getEvaluation/:id', controller.getEvaluation)
  .patch('/updateevaluation', controller.updateEvaluation)
  .post('/postevaluation', controller.postEvaluation)
  .post('/uploadcadidateimage', controller.uploadCadidateImage)
  .get('/getcandidateimage/:id', controller.getCandidateImage)
  .delete('/deletecandidateimage/:id', controller.deleteCandidateImage)
  .delete('/deleteevaluation/:id', controller.deleteEvaluation);
module.exports = router;
