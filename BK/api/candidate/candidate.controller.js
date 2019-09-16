'use strict';

const { RecruitmentForm } = require('../../models/recruitmentform.model');

exports.getAllEvaluations = async (ctx, next) => {
  await RecruitmentForm.find()
    .then(result => {
      ctx.body = result;
    })
    .catch(err => {
      ctx.body = err;
    });
  next();
};

exports.postEvaluation = async (ctx, next) => {
  const document = ctx.request.body;
  await RecruitmentForm.create(document)
    .then(result => {
      ctx.body = result;
    })
    .catch(err => {
      ctx.body = err;
    });
  next();
};

exports.getEvaluation = async (ctx, next) => {
  const id = ctx.params.id;
  console.log(id);
  await RecruitmentForm.findById(id)
    .then(result => {
      ctx.body = result;
    })
    .catch(err => {
      console.log('err', err);
      if (err.name === 'CastError') {
        ctx.status = 400;
        ctx.body = {
          error: {
            type: 'Database error',
            message: `Invalid user id: ${id}`
          }
        };
      }
    });
  next();
};

exports.updateEvaluation = async (ctx, next) => {
  const document = ctx.request.body;
  const id = document._id;
  delete document._id;
  const config = { new: true };
  await RecruitmentForm.findByIdAndUpdate(id, document, config)
    .then(result => {
      ctx.body = result;
    })
    .catch(err => {
      ctx.body = err;
    });
  next();
};

exports.deleteEvaluation = async (ctx, next) => {
  const id = ctx.params.id;
  await RecruitmentForm.findByIdAndDelete(id)
    .then(result => {
      ctx.body = result;
    })
    .catch(err => {
      ctx.body = err;
    });
  next();
};
