'use strict';

const controller = require('./candidate.controller');
const router = require('koa-router')({
  prefix: `/candidate`
});

router
  .get('/allevaluations', controller.getAllEvaluations)
  .get('/getEvaluation/:id', controller.getEvaluation)
  .put('/updateevaluation', controller.updateEvaluation)
  .post('/postevaluation', controller.postEvaluation)
  .delete('/deleteevaluation/:id', controller.deleteEvaluation)
  .post('/uploadcadidateimage', controller.uploadCadidateImage)
  .get('/getcandidateimage/:id', controller.getCandidateImage)
  .delete('/deletecandidateimage/:id', controller.deleteCandidateImage)
  .post('/uploadcadidatecv', controller.uploadCadidateCv)
  .post('/getcandidatecv', controller.getCandidateCv);

module.exports = router;
