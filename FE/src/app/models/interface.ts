import { EThreePointEstimate, ERecommendation, EOverAllEvaluation } from './enum';

export interface IRecruitmentForm {
    _id?: string,
    __v?: number,
    candidateInformation: ICandidate,
    interviewerAssesment: IInterviewerAssessment,
    personalAndTechnicalTraits: IPersonalAndTechnicalTraits,
    finalScoring: IFinalScoring,
    interviewer: IInterviewer,
    hiringAuthorityRemarks: IHiringAuthorityRemarks
}

export interface ICandidate {
    name: string;
    postAppliedFor: string;
    picture?: string;
    cv?: string;
}

export interface IInterviewerAssessment {
    education: EThreePointEstimate;
    jobPersistance: EThreePointEstimate;
    jobExpreience: EThreePointEstimate;
}

export interface IPersonalAndTechnicalTraits {
    appearance: EThreePointEstimate;
    communicationSkills: EThreePointEstimate;
    programmingSkills: EThreePointEstimate;
    oopConcepts: EThreePointEstimate;
    dataStructureConcepts: EThreePointEstimate;
    algorithms: EThreePointEstimate;
    designPattern: EThreePointEstimate;
    programmingLanguageSkills: EThreePointEstimate;
    analyticalSkills: EThreePointEstimate;
    understandingOfdevLifeCycle: EThreePointEstimate;
    teamPlayerCapability: EThreePointEstimate;
    teamLeadCapability: EThreePointEstimate;
    suitabilityForAppliedPost: EThreePointEstimate;
}

export interface IFinalScoring {
    scoreObtained?: number;
    overallEvaluation?: EOverAllEvaluation;
}

export interface IInterviewer {
    name: string;
    designation: string;
    recommendation: ERecommendation;
    comments: string;
}

export interface IHiringAuthorityRemarks {
    proposedDesignation: string,
    noticePeriod: number,
    currentSalary: number,
    expectedSalary: number,
    otherBenifits: string,
    location: string,
    date: Date
}

export interface IScoringFields extends IPersonalAndTechnicalTraits, IInterviewerAssessment { }
