'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = {
  requiredString: {
    type: String,
    required: true
  },
  requiredNumber: {
    type: Number,
    required: true
  },
  requiredDate: {
    type: Date,
    required: true
  }
}

const RecruitmentFormSchema = new Schema({
  candidateInformation: {
    name: config.requiredString,
    postAppliedFor: config.requiredString
  },
  interviewerAssesment: {
    education: config.requiredNumber,
    jobPersistance: config.requiredNumber,
    jobExpreience: config.requiredNumber
  },
  personalAndTechnicalTraits: {
    appearance: config.requiredNumber,
    communicationSkills: config.requiredNumber,
    programmingSkills: config.requiredNumber,
    oopConcepts: config.requiredNumber,
    algorithms: config.requiredNumber,
    designPattern: config.requiredNumber,
    programmingLanguageSkills: config.requiredNumber,
    analyticalSkills: config.requiredNumber,
    understandingOfdevLifeCycle: config.requiredNumber,
    teamPlayerCapability: config.requiredNumber,
    teamLeadCapability: config.requiredNumber,
    suitabilityForAppliedPost: config.requiredNumber,
    scoreObtained: config.requiredNumber,
    overAllEvaluation: config.requiredString
  },
  interviewer: {
    name: config.requiredString,
    designation: config.requiredString,
    recommendation: config.requiredString
  },
  hiringAuthorityRemarks: {
    proposedDesignation: config.requiredString,
    salary: config.requiredString,
    otherBenifits: config.requiredString,
    location: config.requiredString,
    date: config.requiredDate
  }
});

const RecruitmentForm = mongoose.model(
  'RecruitmentForm',
  RecruitmentFormSchema
);

module.exports = { RecruitmentForm };
