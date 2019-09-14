'use strict';

const controller = require('./candidate.controller');
const router = require('koa-router')({
  prefix: `/candidate`
});

router
  .get('/allevaluations', controller.getAllEvaluations)
  .get('/evaluation/:candidateId', controller.evaluation)
  .post('/postevaluation', controller.postEvaluation);

module.exports = router;