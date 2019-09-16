import { EThreePointEstimate, ERecommendation } from './enum';

export interface ICandidate {
    name: string;
    postAppliedFor: string;
}

export interface IInterviewerAssessment {
    Education: EThreePointEstimate;
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
