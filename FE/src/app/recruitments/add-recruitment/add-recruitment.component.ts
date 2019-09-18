import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { RecruitmentsService } from '../../services/recruitments.service';
import { IRecruitmentForm, ICandidate, IInterviewer, IPersonalAndTechnicalTraits, IInterviewerAssessment, IHiringAuthorityRemarks, IScoringFields } from '../../models/interface';

@Component({
  selector: 'app-add-recruitment',
  templateUrl: './add-recruitment.component.html',
  styleUrls: ['./add-recruitment.component.scss']
})
export class AddRecruitmentComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private snackBar: MatSnackBar,
    private recruitmentService: RecruitmentsService) {

    // this.formErrors = {
    //   candidateName: {},
    //   candidatePosition: {},
    //   relevantEducation: {},
    //   relevantJobPersistance: {},
    //   relevantJobExperience: {},
    //   appearance: {},
    //   communicationSkills: {},
    //   basicProgrammingSkills: {},
    //   objectOrientedConcepts: {},
    //   dataStructureConcepts: {},
    //   algorithm: {},
    //   designPattern: {},
    //   programingLanguageSkills: {},
    //   analyticalSkills: {},
    //   understandingOfDevLifeCycle: {},
    //   teamPlayerCapability: {},
    //   teamLeadCapability: {},
    //   suitabilityForAppliedPost: {},
    //   scoreObtained: {},
    //   overallEvaluation: {},
    //   interviewerComments: {},
    //   interviewerName: {},
    //   interviewerDesignation: {},
    //   recommendation: {},
    //   proposedDesignation: {},
    //   noticePeriod: {},
    //   currentSalary: {},
    //   expectedSalary: {},
    //   otherBenefits: {},
    //   location: {},
    //   date: {},
    //   hiringAuthoritySignature: {}
    // };
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
  minDate: Date = new Date();
  scoringCriteria: IScoringFields;
  totalScore: number = 0;

  ngOnInit() {
    this.recruitmentForm = this.formBuilder.group({
      candidateInformation: this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(50)]],
        postAppliedFor: ['', [Validators.required, Validators.maxLength(50)]]
      }),
      interviewerAssesment: this.formBuilder.group({
        education: ['0', [Validators.required]],
        jobPersistance: ['0', [Validators.required]],
        jobExpreience: ['0', [Validators.required]],
      }),
      personalAndTechnicalTraits: this.formBuilder.group({
        appearance: ['0', [Validators.required]],
        communicationSkills: ['0', [Validators.required]],
        programmingSkills: ['0', [Validators.required]],
        oopConcepts: ['0', [Validators.required]],
        dataStructureConcepts: ['0', [Validators.required]],
        algorithms: ['0', [Validators.required]],
        designPattern: ['0', [Validators.required]],
        programmingLanguageSkills: ['0', [Validators.required]],
        analyticalSkills: ['0', [Validators.required]],
        understandingOfdevLifeCycle: ['0', [Validators.required]],
        teamPlayerCapability: ['0', [Validators.required]],
        teamLeadCapability: ['0', [Validators.required]],
        suitabilityForAppliedPost: ['0', [Validators.required]],
        scoreObtained: ['0', [Validators.required, Validators.pattern('^[0-9-]*$'), Validators.maxLength(50)]],
        overAllEvaluation: ['0', [Validators.required]],
      }),
      interviewer: this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(50)]],
        designation: ['', [Validators.required, Validators.maxLength(50)]],
        recommendation: ['0', [Validators.required]],
        comments: ['', [Validators.required, Validators.maxLength(500)]],
      }),
      hiringAuthorityRemarks: this.formBuilder.group({
        proposedDesignation: ['', [Validators.required, Validators.maxLength(50)]],
        noticePeriod: [0, [Validators.required, Validators.minLength(1), Validators.maxLength(60)]],
        currentSalary: [0, [Validators.required]],
        expectedSalary: [0, [Validators.required]],
        otherBenifits: [' ', [Validators.required, Validators.maxLength(500)]],
        location: ['', [Validators.required, Validators.maxLength(50)]],
        date: ['', [Validators.required, Validators.maxLength(50)]],
        hiringAuthoritySignature: ['']
      })
    });
    this.harHiringAuthoritySignature.disable();

    this.harHiringAuthoritySignature.disable();

    if (!this.imageUploaded) {
      this.imageInfo.USER_FILE_SRC = "assets/images/profile.jpg";
    }
    this.recruitmentService.selected_recruitment.subscribe(recruitment => {
      if (!!Object.entries(recruitment).length) {
        this.isNewForm = false;
        const data: IRecruitmentForm = recruitment;
        this.candidateId = data._id;
        this.ciName.setValue(data.candidateInformation.name);
        this.ciPostAppliedFor.setValue(data.candidateInformation.postAppliedFor);
        this.iaEducation.setValue(`${data.interviewerAssesment.education}`);
        this.iaJobPersistance.setValue(`${data.interviewerAssesment.jobPersistance}`);
        this.iaJobExpreience.setValue(`${data.interviewerAssesment.jobExpreience}`);
        this.ptAppearance.setValue(`${data.personalAndTechnicalTraits.appearance}`);
        this.ptCommunicationSkills.setValue(`${data.personalAndTechnicalTraits.communicationSkills}`);
        this.ptProgrammingSkills.setValue(`${data.personalAndTechnicalTraits.programmingSkills}`);
        this.ptOopConcepts.setValue(`${data.personalAndTechnicalTraits.oopConcepts}`);
        this.ptDataStructureConcepts.setValue(`${data.personalAndTechnicalTraits.dataStructureConcepts}`);
        this.ptAlgorithms.setValue(`${data.personalAndTechnicalTraits.algorithms}`);
        this.ptDesignPattern.setValue(`${data.personalAndTechnicalTraits.designPattern}`);
        this.ptProgrammingLanguageSkills.setValue(`${data.personalAndTechnicalTraits.programmingLanguageSkills}`);
        this.ptAnalyticalSkills.setValue(`${data.personalAndTechnicalTraits.analyticalSkills}`);
        this.ptUnderstandingOfdevLifeCycle.setValue(`${data.personalAndTechnicalTraits.understandingOfdevLifeCycle}`);
        this.ptTeamPlayerCapability.setValue(`${data.personalAndTechnicalTraits.teamPlayerCapability}`);
        this.ptTeamLeadCapability.setValue(`${data.personalAndTechnicalTraits.teamLeadCapability}`);
        this.ptSuitabilityForAppliedPost.setValue(`${data.personalAndTechnicalTraits.suitabilityForAppliedPost}`);
        this.ptScoreObtained.setValue(data.personalAndTechnicalTraits.scoreObtained);
        this.ptOverAllEvaluation.setValue(`${data.personalAndTechnicalTraits.overAllEvaluation}`);
        this.iName.setValue(data.interviewer.name);
        this.iDesignation.setValue(data.interviewer.designation);
        this.iRecommendation.setValue(data.interviewer.recommendation);
        this.iComments.setValue(data.interviewer.comments);
        this.harProposedDesignation.setValue(data.hiringAuthorityRemarks.proposedDesignation);
        this.harNoticePeriod.setValue(data.hiringAuthorityRemarks.currentSalary);
        this.harCurrentSalary.setValue(data.hiringAuthorityRemarks.expectedSalary);
        this.harExpectedSalary.setValue(data.hiringAuthorityRemarks.noticePeriod);
        this.harOtherBenifits.setValue(data.hiringAuthorityRemarks.otherBenifits);
        this.harLocation.setValue(data.hiringAuthorityRemarks.location);
        this.harDate.setValue(data.hiringAuthorityRemarks.date.toString().split('T')[0]);
      }
    });
    this.calculateObtainedScore();
  }

  calculateObtainedScore() {
    this.recruitmentForm.controls.interviewerAssesment.valueChanges.subscribe(update => {
      console.log(update);
        let finalScore = Object.values(update).reduce((prev: string, curr: string, index) => {
          return parseInt(prev) + parseInt(curr);
        })
        console.log(finalScore);
    })
    this.recruitmentForm.controls.personalAndTechnicalTraits.valueChanges.subscribe(update => {
      console.log(update);
      //   let finalScore = Object.values(this.scoringCriteria).reduce((prev, curr, index) => {
      //     return parseInt(prev) + parseInt(curr);
      //   })
    })
    // this.recruitmentForm.valueChanges.subscribe(formObject => {
    //   this.scoringCriteria = {
    //     education: formObject['relevantEducation'],
    //     jobPersistance: formObject['relevantJobPersistance'],
    //     jobExpreience: formObject['relevantJobExperience'],
    //     appearance: formObject['appearance'],
    //     communicationSkills: formObject['communicationSkills'],
    //     programmingSkills: formObject['basicProgrammingSkills'],
    //     oopConcepts: formObject['objectOrientedConcepts'],
    //     dataStructureConcepts: formObject['dataStructureConcepts'],
    //     algorithms: formObject['algorithm'],
    //     designPattern: formObject['designPattern'],
    //     programmingLanguageSkills: formObject['programingLanguageSkills'],
    //     analyticalSkills: formObject['analyticalSkills'],
    //     understandingOfdevLifeCycle: formObject['understandingOfDevLifeCycle'],
    //     teamPlayerCapability: formObject['teamPlayerCapability'],
    //     teamLeadCapability: formObject['teamLeadCapability'],
    //     suitabilityForAppliedPost: formObject['suitabilityForAppliedPost']
    //   }
    //   let finalScore = Object.values(this.scoringCriteria).reduce((prev, curr, index) => {
    //     return parseInt(prev) + parseInt(curr);
    //   })
    //   console.log(finalScore);
    //   // this.ptScoreObtained.setValue(finalScore);
    // })
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
      "currentSalary": values.currentSalary,
      "expectedSalary": values.expectedSalary,
      "noticePeriod": values.noticePeriod,
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
    if (this.isNewForm) {
      await this.recruitmentService.addRecruitment(payload).subscribe(res => {
        console.log(res, this.isNewForm);
        this.snackBar.open('Recruitment Added Successfully!!', '', { duration: 3000 });
      });
    } else {
      payload._id = this.candidateId;
      await this.recruitmentService.editRecruitment(payload).subscribe(res => {
        console.log(res, this.isNewForm);
        this.snackBar.open('Recruitment Updated Successfully!!', '', { duration: 3000, panelClass: 'bg-success' });
      })
    }
    this.recruitmentForm.reset();
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
    console.log(event.target.files);

    // if (event.target.files[0]) {
    //   let name_length = event.target.files[0].name.length;
    //   let file_size = event.target.files[0].size / 1000000;

    //   if (name_length <= 30 && file_size <= 50 && event.target.files[0].type.indexOf('image') !== -1) {
    //     this.imageUploaded = true;

    //     this.imageInfo.USER_FILE_SRC = URL.createObjectURL(event.target.files[0]);
    //     this.imageInfo.USER_FILE_TYPE = event.target.files[0].type;
    //     this.imageInfo.USER_FILE_NAME = event.target.files[0].name;
    //     this.imageInfo.USER_FILE_SIZE = file_size;

    //     //this.uploaded_images = Object.assign([], event.target.files);
    //   }
    //   else {
    //     let message = "File must have a size of less then 50 MB & Name of file must be less then 30 characters";
    //     this.snackBar.open(message, '', {
    //       duration: 3000
    //     });
    //   }
    // }
  }

  uploadCadidateCv(cvFile) {
    this.recruitmentService.uploadCadidateCv(cvFile).subscribe(res => {
      console.log(res);
    })
  }

get ciName () {
  return this.recruitmentForm.controls.candidateInformation.get("name");
}
get ciPostAppliedFor () {
  return this.recruitmentForm.controls.candidateInformation.get("postAppliedFor");
}
get iaEducation () {
  return this.recruitmentForm.controls.interviewerAssesment.get("education");
}
get iaJobPersistance () {
  return this.recruitmentForm.controls.interviewerAssesment.get("jobPersistance");
}
get iaJobExpreience () {
  return this.recruitmentForm.controls.interviewerAssesment.get("jobExpreience");
}
get ptAppearance () {
  return this.recruitmentForm.controls.personalAndTechnicalTraits.get("appearance");
}
get ptCommunicationSkills () {
  return this.recruitmentForm.controls.personalAndTechnicalTraits.get("communicationSkills");
}
get ptProgrammingSkills () {
  return this.recruitmentForm.controls.personalAndTechnicalTraits.get("programmingSkills");
}
get ptOopConcepts () {
  return this.recruitmentForm.controls.personalAndTechnicalTraits.get("oopConcepts");
}
get ptDataStructureConcepts () {
  return this.recruitmentForm.controls.personalAndTechnicalTraits.get("dataStructureConcepts");
}
get ptAlgorithms () {
  return this.recruitmentForm.controls.personalAndTechnicalTraits.get("algorithms");
}
get ptDesignPattern () {
  return this.recruitmentForm.controls.personalAndTechnicalTraits.get("designPattern");
}
get ptProgrammingLanguageSkills () {
  return this.recruitmentForm.controls.personalAndTechnicalTraits.get("programmingLanguageSkills");
}
get ptAnalyticalSkills () {
  return this.recruitmentForm.controls.personalAndTechnicalTraits.get("analyticalSkills");
}
get ptUnderstandingOfdevLifeCycle () {
  return this.recruitmentForm.controls.personalAndTechnicalTraits.get("understandingOfdevLifeCycle");
}
get ptTeamPlayerCapability () {
  return this.recruitmentForm.controls.personalAndTechnicalTraits.get("teamPlayerCapability");
}
get ptTeamLeadCapability () {
  return this.recruitmentForm.controls.personalAndTechnicalTraits.get("teamLeadCapability");
}
get ptSuitabilityForAppliedPost () {
  return this.recruitmentForm.controls.personalAndTechnicalTraits.get("suitabilityForAppliedPost");
}
get ptScoreObtained () {
  return this.recruitmentForm.controls.personalAndTechnicalTraits.get("scoreObtained");
}
get ptOverAllEvaluation () {
  return this.recruitmentForm.controls.personalAndTechnicalTraits.get("overAllEvaluation");
}
get iName () {
  return this.recruitmentForm.controls.interviewer.get("name");
}
get iDesignation () {
  return this.recruitmentForm.controls.interviewer.get("designation");
}
get iRecommendation () {
  return this.recruitmentForm.controls.interviewer.get("recommendation");
}
get iComments () {
  return this.recruitmentForm.controls.interviewer.get("comments");
}interviewer
get harProposedDesignation () {
  return this.recruitmentForm.controls.hiringAuthorityRemarks.get("proposedDesignation");
}
get harNoticePeriod () {
  return this.recruitmentForm.controls.hiringAuthorityRemarks.get("noticePeriod");
}
get harCurrentSalary () {
  return this.recruitmentForm.controls.hiringAuthorityRemarks.get("currentSalary");
}
get harExpectedSalary () {
  return this.recruitmentForm.controls.hiringAuthorityRemarks.get("expectedSalary");
}
get harOtherBenifits () {
  return this.recruitmentForm.controls.hiringAuthorityRemarks.get("otherBenifits");
}
get harLocation () {
  return this.recruitmentForm.controls.hiringAuthorityRemarks.get("location");
}
get harDate () {
  return this.recruitmentForm.controls.hiringAuthorityRemarks.get("date");
}
get harHiringAuthoritySignature () {
  return this.recruitmentForm.controls.hiringAuthorityRemarks
}

}
