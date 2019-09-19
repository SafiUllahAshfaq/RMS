import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { RecruitmentsService } from '../../services/recruitments.service';
import { IRecruitmentForm, ICandidate, IInterviewer, IPersonalAndTechnicalTraits, IInterviewerAssessment, IHiringAuthorityRemarks, IScoringFields, IFinalScoring } from '../../models/interface';

@Component({
  selector: 'app-add-recruitment',
  templateUrl: './add-recruitment.component.html',
  styleUrls: ['./add-recruitment.component.scss']
})
export class AddRecruitmentComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private snackBar: MatSnackBar,
    private recruitmentService: RecruitmentsService, private route: ActivatedRoute) {

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
  totalScore: number = 0;
  isFormEdited: boolean = false;

  ngOnInit() {
    this.recruitmentForm = this.formBuilder.group({
      candidateInformation: this.formBuilder.group({
        name: ['Test', [Validators.required, Validators.maxLength(50)]],
        postAppliedFor: ['Dev', [Validators.required, Validators.maxLength(50)]],
        picture: [''],
        cv: ['']
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
      }),
      finalScoring: this.formBuilder.group({
        scoreObtained: [0, [Validators.required, Validators.pattern('^[0-9-]*$'), Validators.maxLength(50)]],
        overallEvaluation: ['', [Validators.required]],
      }),
      interviewer: this.formBuilder.group({
        name: ['Fahid Sami', [Validators.required, Validators.maxLength(50)]],
        designation: ['Project Manager', [Validators.required, Validators.maxLength(50)]],
        recommendation: ['0', [Validators.required]],
        comments: ['Potential candidate', [Validators.required, Validators.maxLength(500)]],
      }),
      hiringAuthorityRemarks: this.formBuilder.group({
        proposedDesignation: ['Software Engineer', [Validators.required, Validators.maxLength(50)]],
        noticePeriod: [0, [Validators.required, Validators.minLength(1), Validators.maxLength(60)]],
        currentSalary: [0, [Validators.required]],
        expectedSalary: [0, [Validators.required]],
        otherBenifits: ['Medical', [Validators.required, Validators.maxLength(500)]],
        location: ['Lahore', [Validators.required, Validators.maxLength(50)]],
        date: ['', [Validators.required, Validators.maxLength(50)]],
        hiringAuthoritySignature: ['']
      })
    });

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
        this.ciPicture.setValue(data.candidateInformation.picture);
        this.ciCv.setValue(data.candidateInformation.cv);
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
        this.fsScoreObtained.setValue(data.finalScoring.scoreObtained);
        this.fsOverallEvaluation.setValue(`${data.finalScoring.overallEvaluation}`);
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

        console.log("editte form changed...sadfkljsadjfsdaf", this.isFormEdited);
        this.recruitmentForm.valueChanges.subscribe((formValue) => {
          this.isFormEdited = true;
        })
      }
    });

    this.calculateObtainedScore();
  }

  calculateObtainedScore() {
    const iaForm = this.recruitmentForm.controls.interviewerAssesment;
    const ptForm = this.recruitmentForm.controls.personalAndTechnicalTraits;
    const combinedForm: FormGroup = new FormGroup({ iaForm, ptForm });
    combinedForm.valueChanges.subscribe(updatedForm => {
      const mergedObject = Object.assign({}, updatedForm.iaForm, updatedForm.ptForm);
      const finalScore = this.calculateScore(mergedObject);
      this.fsScoreObtained.setValue(finalScore);
      this.setOverallEvaluation(finalScore);
    })
  }

  private calculateScore(scoringForm: IScoringFields) {
    return Object.values(scoringForm).reduce((prev, curr) => {
      return parseInt(prev) + parseInt(curr);
    })
  }

  private setOverallEvaluation(score: number) {
    let category = '';
    switch (true) {
      case (score >= 17 && score <= 32):
        category = 'fair';
        break;
      case (score >= 33 && score <= 48):
        category = 'average';
        break;
      case (score >= 49 && score <= 64):
        category = 'good';
        break;
      default:
        category = ''
        break;
    }
    this.fsOverallEvaluation.setValue(category)
  }

  // onFormValuesChanged() {
  //   for (const field in this.formErrors) {
  //     if (!this.formErrors.hasOwnProperty(field)) {
  //       continue;
  //     }

  //     this.formErrors[field] = {};
  //     const control = this.recruitmentForm.get(field);

  //     if (control && control.dirty && !control.valid) {
  //       this.formErrors[field] = control.errors;
  //     }
  //   }
  // }

  async addRecruitment() {
    const values = this.recruitmentForm.value;
    console.log(values);
    const candidateInformation: ICandidate = {
      "name": values.candidateInformation.name,
      "postAppliedFor": values.candidateInformation.postAppliedFor,
      "picture": values.candidateInformation.picture,
      "cv": values.candidateInformation.cv
    }
    const interviewerAssesment: IInterviewerAssessment = {
      "education": values.interviewerAssesment.education,
      "jobPersistance": values.interviewerAssesment.jobPersistance,
      "jobExpreience": values.interviewerAssesment.jobExpreience
    }
    const personalAndTechnicalTraits: IPersonalAndTechnicalTraits = {
      "appearance": values.personalAndTechnicalTraits.appearance,
      "communicationSkills": values.personalAndTechnicalTraits.communicationSkills,
      "programmingSkills": values.personalAndTechnicalTraits.programmingSkills,
      "oopConcepts": values.personalAndTechnicalTraits.oopConcepts,
      "dataStructureConcepts": values.personalAndTechnicalTraits.dataStructureConcepts,
      "algorithms": values.personalAndTechnicalTraits.algorithms,
      "designPattern": values.personalAndTechnicalTraits.designPattern,
      "programmingLanguageSkills": values.personalAndTechnicalTraits.programmingLanguageSkills,
      "analyticalSkills": values.personalAndTechnicalTraits.analyticalSkills,
      "understandingOfdevLifeCycle": values.personalAndTechnicalTraits.understandingOfdevLifeCycle,
      "teamPlayerCapability": values.personalAndTechnicalTraits.teamPlayerCapability,
      "teamLeadCapability": values.personalAndTechnicalTraits.teamLeadCapability,
      "suitabilityForAppliedPost": values.personalAndTechnicalTraits.suitabilityForAppliedPost,
    }
    const finalScoring: IFinalScoring = {
      "scoreObtained": values.finalScoring.scoreObtained,
      "overallEvaluation": values.finalScoring.overallEvaluation
    }
    const interviewer: IInterviewer = {
      "name": values.interviewer.name,
      "designation": values.interviewer.designation,
      "recommendation": values.interviewer.recommendation,
      "comments": values.interviewer.comments
    }
    const hiringAuthorityRemarks: IHiringAuthorityRemarks = {
      "proposedDesignation": values.hiringAuthorityRemarks.proposedDesignation,
      "currentSalary": values.hiringAuthorityRemarks.noticePeriod,
      "expectedSalary": values.hiringAuthorityRemarks.currentSalary,
      "noticePeriod": values.hiringAuthorityRemarks.expectedSalary,
      "otherBenifits": values.hiringAuthorityRemarks.otherBenifits,
      "location": values.hiringAuthorityRemarks.location,
      "date": values.hiringAuthorityRemarks.date
    }
    const payload: IRecruitmentForm = {
      candidateInformation,
      interviewerAssesment,
      personalAndTechnicalTraits,
      finalScoring,
      interviewer,
      hiringAuthorityRemarks
    }
    if (this.isNewForm) {
      await this.recruitmentService.addRecruitment(payload).subscribe(res => {
        console.log(res, this.isNewForm);
        this.snackBar.open('Recruitment Added Successfully!!', '', { duration: 3000, panelClass: 'bg-success' });
      });
    } else {
      payload._id = this.candidateId;
      await this.recruitmentService.editRecruitment(payload).subscribe(res => {
        console.log(res, this.isNewForm);
        this.snackBar.open('Recruitment Updated Successfully!!', '', { duration: 3000, panelClass: 'bg-info' });
      })
    }
    this.recruitmentForm.reset();
    this.router.navigate(['/recruitments']);
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

    // const formData = new FormData();
    // formData.append('file', event.target.files[0]);

    // console.log(formData);

    this.recruitmentService.uploadCadidateImage(event.target.files).subscribe(res => {
      console.log(res);
    })

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

  get ciName() {
    return this.recruitmentForm.controls.candidateInformation.get("name");
  }
  get ciPostAppliedFor() {
    return this.recruitmentForm.controls.candidateInformation.get("postAppliedFor");
  }
  get ciPicture() {
    return this.recruitmentForm.controls.candidateInformation.get("Picture");
  }
  get ciCv() {
    return this.recruitmentForm.controls.candidateInformation.get("cv");
  }
  get iaEducation() {
    return this.recruitmentForm.controls.interviewerAssesment.get("education");
  }
  get iaJobPersistance() {
    return this.recruitmentForm.controls.interviewerAssesment.get("jobPersistance");
  }
  get iaJobExpreience() {
    return this.recruitmentForm.controls.interviewerAssesment.get("jobExpreience");
  }
  get ptAppearance() {
    return this.recruitmentForm.controls.personalAndTechnicalTraits.get("appearance");
  }
  get ptCommunicationSkills() {
    return this.recruitmentForm.controls.personalAndTechnicalTraits.get("communicationSkills");
  }
  get ptProgrammingSkills() {
    return this.recruitmentForm.controls.personalAndTechnicalTraits.get("programmingSkills");
  }
  get ptOopConcepts() {
    return this.recruitmentForm.controls.personalAndTechnicalTraits.get("oopConcepts");
  }
  get ptDataStructureConcepts() {
    return this.recruitmentForm.controls.personalAndTechnicalTraits.get("dataStructureConcepts");
  }
  get ptAlgorithms() {
    return this.recruitmentForm.controls.personalAndTechnicalTraits.get("algorithms");
  }
  get ptDesignPattern() {
    return this.recruitmentForm.controls.personalAndTechnicalTraits.get("designPattern");
  }
  get ptProgrammingLanguageSkills() {
    return this.recruitmentForm.controls.personalAndTechnicalTraits.get("programmingLanguageSkills");
  }
  get ptAnalyticalSkills() {
    return this.recruitmentForm.controls.personalAndTechnicalTraits.get("analyticalSkills");
  }
  get ptUnderstandingOfdevLifeCycle() {
    return this.recruitmentForm.controls.personalAndTechnicalTraits.get("understandingOfdevLifeCycle");
  }
  get ptTeamPlayerCapability() {
    return this.recruitmentForm.controls.personalAndTechnicalTraits.get("teamPlayerCapability");
  }
  get ptTeamLeadCapability() {
    return this.recruitmentForm.controls.personalAndTechnicalTraits.get("teamLeadCapability");
  }
  get ptSuitabilityForAppliedPost() {
    return this.recruitmentForm.controls.personalAndTechnicalTraits.get("suitabilityForAppliedPost");
  }
  get fsScoreObtained() {
    return this.recruitmentForm.controls.finalScoring.get("scoreObtained");
  }
  get fsOverallEvaluation() {
    return this.recruitmentForm.controls.finalScoring.get("overallEvaluation");
  }
  get iName() {
    return this.recruitmentForm.controls.interviewer.get("name");
  }
  get iDesignation() {
    return this.recruitmentForm.controls.interviewer.get("designation");
  }
  get iRecommendation() {
    return this.recruitmentForm.controls.interviewer.get("recommendation");
  }
  get iComments() {
    return this.recruitmentForm.controls.interviewer.get("comments");
  } interviewer
  get harProposedDesignation() {
    return this.recruitmentForm.controls.hiringAuthorityRemarks.get("proposedDesignation");
  }
  get harNoticePeriod() {
    return this.recruitmentForm.controls.hiringAuthorityRemarks.get("noticePeriod");
  }
  get harCurrentSalary() {
    return this.recruitmentForm.controls.hiringAuthorityRemarks.get("currentSalary");
  }
  get harExpectedSalary() {
    return this.recruitmentForm.controls.hiringAuthorityRemarks.get("expectedSalary");
  }
  get harOtherBenifits() {
    return this.recruitmentForm.controls.hiringAuthorityRemarks.get("otherBenifits");
  }
  get harLocation() {
    return this.recruitmentForm.controls.hiringAuthorityRemarks.get("location");
  }
  get harDate() {
    return this.recruitmentForm.controls.hiringAuthorityRemarks.get("date");
  }
  get harHiringAuthoritySignature() {
    return this.recruitmentForm.controls.hiringAuthorityRemarks
  }

}
