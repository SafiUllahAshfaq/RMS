import { EThreePointEstimate, ERecommendation, EOverAllEvaluation } from './enum';

export interface IRecruitmentForm {
    _id?: string,
    __v?: number,
    candidateInformation: ICandidate,
    interviewerAssesment: IInterviewerAssessment,
    personalAndTechnicalTraits: IPersonalAndTechnicalTraits,
    interviewer: IInterviewer,
    hiringAuthorityRemarks: IHiringAuthorityRemarks
}

export interface ICandidate {
    name: string;
    postAppliedFor: string;
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
    algorithms: EThreePointEstimate;
    designPattern: EThreePointEstimate;
    programmingLanguageSkills: EThreePointEstimate;
    analyticalSkills: EThreePointEstimate;
    understandingOfdevLifeCycle: EThreePointEstimate;
    teamPlayerCapability: EThreePointEstimate;
    teamLeadCapability: EThreePointEstimate;
    suitabilityForAppliedPost: EThreePointEstimate;
    picture: string;
    cv: string;
    scoreObtained?: number;
    overAllEvaluation?: EOverAllEvaluation;
}

export interface IInterviewer {
    name: string;
    designation: string;
    recommendation: ERecommendation
}

export interface IHiringAuthorityRemarks {
    proposedDesignation: string,
    salary: number,
    otherBenifits: string,
    location: string,
    date: Date
}

