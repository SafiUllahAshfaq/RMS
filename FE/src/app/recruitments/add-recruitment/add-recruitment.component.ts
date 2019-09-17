import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { RecruitmentsService } from '../../services/recruitments.service';
import { IRecruitmentForm, ICandidate, IInterviewer, IPersonalAndTechnicalTraits, IInterviewerAssessment, IHiringAuthorityRemarks } from '../../models/interface';

@Component({
  selector: 'app-add-recruitment',
  templateUrl: './add-recruitment.component.html',
  styleUrls: ['./add-recruitment.component.scss']
})
export class AddRecruitmentComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private snackBar: MatSnackBar,
    private recruitmentService: RecruitmentsService) {

    this.formErrors = {
      candidateName: {},
      candidatePosition: {},
      relevantEducation: {},
      relevantJobPersistance: {},
      relevantJobExperience: {},
      appearance: {},
      communicationSkills: {},
      basicProgrammingSkills: {},
      objectOrientedConcepts: {},
      dataStructureConcepts: {},
      algorithm: {},
      designPattern: {},
      programingLanguageSkills: {},
      analyticalSkills: {},
      understandingOfDevLifeCycle: {},
      teamPlayerCapability: {},
      teamLeadCapability: {},
      suitabilityForAppliedPost: {},
      scoreObtained: {},
      overallEvaluation: {},
      interviewerComments: {},
      interviewerName: {},
      interviewerDesignation: {},
      recommendation: {},
      proposedDesignation: {},
      salary: {},
      otherBenefits: {},
      location: {},
      date: {},
      hiringAuthoritySignature: {}
    };
  }

  recruitmentForm: FormGroup;
  formErrors: any;
  resumeInfo: any = {};
  imageInfo: any = {};
  uploadedFiles: any = [];
  recruitmentSaved: boolean = false;
  resumeUploaded: boolean = false;
  imageUploaded: boolean = false;
  fileData: any;
  isNewForm: boolean = true;
  candidateId: string = '';

  ngOnInit() {
    this.recruitmentForm = this.formBuilder.group({
      candidateName: ['Saad Sohail', [Validators.required, Validators.maxLength(50)]],
      candidatePosition: ['Software Engineer', [Validators.required, Validators.maxLength(50)]],
      relevantEducation: ['0', [Validators.required]],
      relevantJobPersistance: ['0', [Validators.required]],
      relevantJobExperience: ['1', [Validators.required]],
      appearance: ['0', [Validators.required]],
      communicationSkills: ['3', [Validators.required]],
      basicProgrammingSkills: ['0', [Validators.required]],
      objectOrientedConcepts: ['4', [Validators.required]],
      dataStructureConcepts: ['0', [Validators.required]],
      algorithm: ['3', [Validators.required]],
      designPattern: ['4', [Validators.required]],
      programingLanguageSkills: ['0', [Validators.required]],
      analyticalSkills: ['4', [Validators.required]],
      understandingOfDevLifeCycle: ['0', [Validators.required]],
      teamPlayerCapability: ['0', [Validators.required]],
      teamLeadCapability: ['3', [Validators.required]],
      suitabilityForAppliedPost: ['0', [Validators.required]],
      scoreObtained: ['20', [Validators.required, Validators.pattern('^[0-9-]*$'), Validators.maxLength(50)]],
      overallEvaluation: ['0', [Validators.required]],
      interviewerName: ['Fahid Sami', [Validators.required, Validators.maxLength(50)]],
      interviewerDesignation: ['Project Manager', [Validators.required, Validators.maxLength(50)]],
      recommendation: ['0', [Validators.required]],
      interviewerComments: ['Has potential to learn and adopt rapidly.', [Validators.required, Validators.maxLength(500)]],
      proposedDesignation: ['Software Engineer', [Validators.required, Validators.maxLength(50)]],
      salary: [0, [Validators.required, Validators.pattern('^[0-9-]*$'), Validators.maxLength(50)]],
      otherBenefits: ['Medical Benifits', [Validators.required, Validators.maxLength(500)]],
      location: ['Lahore', [Validators.required, Validators.maxLength(50)]],
      date: ['2019-09-19', [Validators.required, Validators.maxLength(50)]],
      hiringAuthoritySignature: ['']
    });
    this.hiringAuthoritySignature.disable();

    if (!this.imageUploaded) {
      this.imageInfo.USER_FILE_SRC = "assets/images/profile.jpg";
    }
    this.recruitmentService.selected_recruitment.subscribe(recruitment => {
      //this.recruitmentForm = recruitment;
      if (!!Object.entries(recruitment).length) {
        this.isNewForm = false;
        const data: IRecruitmentForm = recruitment;
        this.candidateId = data._id;
        console.log(data, this.candidateId);
        this.candidateName.setValue(data.candidateInformation.name);
        this.candidatePosition.setValue(data.candidateInformation.postAppliedFor);
        this.relevantEducation.setValue(`${data.interviewerAssesment.education}`);
        this.relevantJobPersistance.setValue(`${data.interviewerAssesment.jobPersistance}`);
        this.relevantJobExperience.setValue(`${data.interviewerAssesment.jobExpreience}`);
        this.appearance.setValue(`${data.personalAndTechnicalTraits.appearance}`);
        this.communicationSkills.setValue(`${data.personalAndTechnicalTraits.communicationSkills}`);
        this.basicProgrammingSkills.setValue(`${data.personalAndTechnicalTraits.programmingSkills}`);
        this.objectOrientedConcepts.setValue(`${data.personalAndTechnicalTraits.oopConcepts}`);
        this.dataStructureConcepts.setValue(`${data.personalAndTechnicalTraits.dataStructureConcepts}`);
        this.algorithm.setValue(`${data.personalAndTechnicalTraits.algorithms}`);
        this.designPattern.setValue(`${data.personalAndTechnicalTraits.designPattern}`);
        this.programingLanguageSkills.setValue(`${data.personalAndTechnicalTraits.programmingLanguageSkills}`);
        this.analyticalSkills.setValue(`${data.personalAndTechnicalTraits.analyticalSkills}`);
        this.understandingOfDevLifeCycle.setValue(`${data.personalAndTechnicalTraits.understandingOfdevLifeCycle}`);
        this.teamPlayerCapability.setValue(`${data.personalAndTechnicalTraits.teamPlayerCapability}`);
        this.teamLeadCapability.setValue(`${data.personalAndTechnicalTraits.teamLeadCapability}`);
        this.suitabilityForAppliedPost.setValue(`${data.personalAndTechnicalTraits.suitabilityForAppliedPost}`);
        this.scoreObtained.setValue(data.personalAndTechnicalTraits.scoreObtained);
        this.overallEvaluation.setValue(`${data.personalAndTechnicalTraits.overAllEvaluation}`);
        this.interviewerName.setValue(data.interviewer.name);
        this.interviewerDesignation.setValue(data.interviewer.designation);
        this.recommendation.setValue(data.interviewer.recommendation);
        this.interviewerComments.setValue(data.interviewer.comments);
        this.proposedDesignation.setValue(data.hiringAuthorityRemarks.proposedDesignation);
        this.salary.setValue(data.hiringAuthorityRemarks.salary);
        this.otherBenefits.setValue(data.hiringAuthorityRemarks.otherBenifits);
        this.location.setValue(data.hiringAuthorityRemarks.location);
        this.date.setValue(data.hiringAuthorityRemarks.date.toString().split('T')[0]);
      }
    });
  }

  onFormValuesChanged() {
    for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) {
        continue;
      }

      this.formErrors[field] = {};
      const control = this.recruitmentForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.formErrors[field] = control.errors;
      }
    }
  }

  async addRecruitment() {
    const values = this.recruitmentForm.value;
    const candidateInformation: ICandidate = {
      "name": values.candidateName,
      "postAppliedFor": values.candidatePosition
    }
    const interviewerAssesment: IInterviewerAssessment = {
      "education": values.relevantEducation,
      "jobPersistance": values.relevantJobPersistance,
      "jobExpreience": values.relevantJobExperience
    }
    const personalAndTechnicalTraits: IPersonalAndTechnicalTraits = {
      "appearance": values.appearance,
      "communicationSkills": values.communicationSkills,
      "programmingSkills": values.basicProgrammingSkills,
      "oopConcepts": values.objectOrientedConcepts,
      "dataStructureConcepts": values.dataStructureConcepts,
      "algorithms": values.algorithm,
      "designPattern": values.designPattern,
      "programmingLanguageSkills": values.programingLanguageSkills,
      "analyticalSkills": values.analyticalSkills,
      "understandingOfdevLifeCycle": values.understandingOfDevLifeCycle,
      "teamPlayerCapability": values.teamPlayerCapability,
      "teamLeadCapability": values.teamLeadCapability,
      "suitabilityForAppliedPost": values.suitabilityForAppliedPost,
      "scoreObtained": values.scoreObtained,
      "overAllEvaluation": values.overallEvaluation
    }
    const interviewer: IInterviewer = {
      "name": values.interviewerName,
      "designation": values.interviewerDesignation,
      "recommendation": values.recommendation,
      "comments": values.interviewerComments
    }
    const hiringAuthorityRemarks: IHiringAuthorityRemarks = {
      "proposedDesignation": values.proposedDesignation,
      "salary": values.salary,
      "otherBenifits": values.otherBenefits,
      "location": values.location,
      "date": values.date
    }
    const payload: IRecruitmentForm = {
      candidateInformation,
      interviewerAssesment,
      personalAndTechnicalTraits,
      interviewer,
      hiringAuthorityRemarks
    }
    // console.log(payload);
    if (this.isNewForm) {
      await this.recruitmentService.addRecruitment(payload).subscribe(res => {
        console.log(res, this.isNewForm);
        // this.recruitmentForm.reset();
        this.snackBar.open('Recruitment Added Successfully!!', '', { duration: 3000 });
      });
    } else {
      payload._id = this.candidateId;
      await this.recruitmentService.editRecruitment(payload).subscribe(res => {
        console.log(res, this.isNewForm);
        this.snackBar.open('Recruitment Updated Successfully!!', '', { duration: 3000, panelClass: 'bg-success' });
      })
    }
    this.router.navigateByUrl('recruitments');
    this.recruitmentSaved = true;
  }

  uploadFile(event) {

    console.log(event.target);

    if (event.target.files[0]) {

      let name_length = event.target.files[0].name.length;
      let file_size = event.target.files[0].size / 1000000;

      if (name_length <= 30 && file_size <= 50) {
        this.resumeUploaded = true;
        this.imageUploaded = false;

        this.resumeInfo.path = URL.createObjectURL(event.target.files[0]);
        this.resumeInfo.type = event.target.files[0].type;
        this.resumeInfo.name = event.target.files[0].name;
        this.resumeInfo.size = file_size;

        this.uploadedFiles = Object.assign([], event.target.files);
        const cvFile = {
          '_id': "5d8077090fd08d3e84b7e3ae",
          'candidateName': 'Saad Sohail',
          'cv': this.resumeInfo
        };

        console.log(cvFile);

        this.uploadCadidateCv(cvFile);
      }
      else {
        let message = "File must have a size of less then 50 MB & Name of file must be less then 50 characters";
        this.snackBar.open(message, '', {
          duration: 3000
        });
      }
    }
  }

  uploadImage(event) {
    if (event.target.files[0]) {
      let name_length = event.target.files[0].name.length;
      let file_size = event.target.files[0].size / 1000000;

      if (name_length <= 30 && file_size <= 50 && event.target.files[0].type.indexOf('image') !== -1) {
        this.imageUploaded = true;

        this.imageInfo.USER_FILE_SRC = URL.createObjectURL(event.target.files[0]);
        this.imageInfo.USER_FILE_TYPE = event.target.files[0].type;
        this.imageInfo.USER_FILE_NAME = event.target.files[0].name;
        this.imageInfo.USER_FILE_SIZE = file_size;

        //this.uploaded_images = Object.assign([], event.target.files);
      }
      else {
        let message = "File must have a size of less then 50 MB & Name of file must be less then 30 characters";
        this.snackBar.open(message, '', {
          duration: 3000
        });
      }
    }
  }

  uploadCadidateCv(cvFile) {
    this.recruitmentService.uploadCadidateCv(cvFile).subscribe(res => {
      console.log(res);
    })
  }

  get candidateName() {
    return this.recruitmentForm.get("candidateName");
  }
  get candidatePosition() {
    return this.recruitmentForm.get("candidatePosition");
  }
  get relevantEducation() {
    return this.recruitmentForm.get("relevantEducation");
  }
  get relevantJobPersistance() {
    return this.recruitmentForm.get("relevantJobPersistance");
  }
  get relevantJobExperience() {
    return this.recruitmentForm.get("relevantJobExperience");
  }
  get appearance() {
    return this.recruitmentForm.get("appearance");
  }
  get communicationSkills() {
    return this.recruitmentForm.get("communicationSkills");
  }
  get basicProgrammingSkills() {
    return this.recruitmentForm.get("basicProgrammingSkills");
  }
  get objectOrientedConcepts() {
    return this.recruitmentForm.get("objectOrientedConcepts");
  }
  get dataStructureConcepts() {
    return this.recruitmentForm.get("dataStructureConcepts");
  }
  get algorithm() {
    return this.recruitmentForm.get("algorithm");
  }
  get designPattern() {
    return this.recruitmentForm.get("designPattern");
  }
  get programingLanguageSkills() {
    return this.recruitmentForm.get("programingLanguageSkills");
  }
  get analyticalSkills() {
    return this.recruitmentForm.get("analyticalSkills");
  }
  get understandingOfDevLifeCycle() {
    return this.recruitmentForm.get("understandingOfDevLifeCycle");
  }
  get teamPlayerCapability() {
    return this.recruitmentForm.get("teamPlayerCapability");
  }
  get teamLeadCapability() {
    return this.recruitmentForm.get("teamLeadCapability");
  }
  get suitabilityForAppliedPost() {
    return this.recruitmentForm.get("suitabilityForAppliedPost");
  }
  get scoreObtained() {
    return this.recruitmentForm.get("scoreObtained");
  }
  get overallEvaluation() {
    return this.recruitmentForm.get("overallEvaluation");
  }
  get interviewerName() {
    return this.recruitmentForm.get("interviewerName");
  }
  get interviewerDesignation() {
    return this.recruitmentForm.get("interviewerDesignation");
  }
  get recommendation() {
    return this.recruitmentForm.get("recommendation");
  }
  get interviewerComments() {
    return this.recruitmentForm.get("interviewerComments");
  }
  get proposedDesignation() {
    return this.recruitmentForm.get("proposedDesignation");
  }
  get salary() {
    return this.recruitmentForm.get("salary");
  }
  get otherBenefits() {
    return this.recruitmentForm.get("otherBenefits");
  }
  get location() {
    return this.recruitmentForm.get("location");
  }
  get date() {
    return this.recruitmentForm.get("date");
  }
  get hiringAuthoritySignature() {
    return this.recruitmentForm.get("hiringAuthoritySignature");
  }

}
