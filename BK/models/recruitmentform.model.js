'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecruitmentFormSchema = new Schema({
  candidateInformation: {
    name: {
      type: String,
      required: true
    },
    postAppliedFor: {
      type: String,
      required: true
    }
  },
  interviewerAssesment: {
    education: {
      type: Number,
      required: true
    },
    jobPersistance: {
      type: Number,
      required: true
    },
    jobExpreience: {
      type: Number,
      required: true
    }
  },
  personalAndTechnicalTraits: {
    appearance: {
      type: Number,
      required: true
    },
    communicationSkills: {
      type: Number,
      required: true
    },
    programmingSkills: {
      type: Number,
      required: true
    },
    oopConcepts: {
      type: Number,
      required: true
    },
    algorithms: {
      type: Number,
      required: true
    },
    designPattern: {
      type: Number,
      required: true
    },
    programmingLanguageSkills: {
      type: Number,
      required: true
    },
    analyticalSkills: {
      type: Number,
      required: true
    },
    understandingOfdevLifeCycle: {
      type: Number,
      required: true
    },
    teamPlayerCapability: {
      type: Number,
      required: true
    },
    teamLeadCapability: {
      type: Number,
      required: true
    },
    suitabilityForAppliedPost: {
      type: Number,
      required: true
    },
    scoreObtained: {
      type: Number,
      required: true
    },
    overAllEvaluation: {
      type: String,
      required: true
    }
  },
  interviewer: {
    name: {
      type: String,
      required: true
    },
    designation: {
      type: String,
      required: true
    },
    recommendation: {
      type: String,
      required: true
    }
  },
  hiringAuthorityRemarks: {
    proposedDesignation: {
      type: String,
      required: true
    },
    salary: {
      type: String,
      required: true
    },
    otherBenifits: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  }
});

const RecruitmentForm = mongoose.model(
  'RecruitmentForm',
  RecruitmentFormSchema
);

module.exports = { RecruitmentForm };
