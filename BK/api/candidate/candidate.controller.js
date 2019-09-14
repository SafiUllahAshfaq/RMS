'use strict';

const { RecruitmentForm } = require('../../models/recruitmentform.model');

exports.getAllEvaluations = (ctx, next) => {
  console.log(ctx);
  ctx.body = 'All evaluations of candidates will be returned!';
  next();
};

exports.evaluation = (ctx, next) => {
  console.log(ctx);
  console.log(ctx.params);
  ctx.body = ctx;
  next();
};

exports.postEvaluation = (ctx, next) => {
  const document = ctx.request.body;
  RecruitmentForm.create(document)
    .then(result => {
      ctx.body = result;
    })
    .catch(err => {
      ctx.body = err;
    });
  next();
};
