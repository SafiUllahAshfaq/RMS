'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecruitmentFormSchema = new Schema({
    candidateName: {
        type: String,
        required: true
    },
    postAppliedFor: {
        type: String,
        required: true
    }
});

mongoose.model('RecruitmentForm', RecruitmentFormSchema);
