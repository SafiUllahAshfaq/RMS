'use strict';

const mongoose = require('mongoose');
const RecruitmentFormSchema = mongoose.model('RecruitmentForm');

exports.getAllEvaluations = (ctx, next) => {
    console.log(ctx);
    ctx.body = 'All evaluations of candidates will be returned!';
    next();
}

exports.evaluation = (ctx, next) => {
    console.log(ctx);
    console.log(ctx.params);
    ctx.body = ctx;
    next();
}
