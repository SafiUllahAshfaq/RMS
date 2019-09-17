import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { RecruitmentsService } from '../../services/recruitments.service';

@Component({
  selector: 'app-add-recruitment',
  templateUrl: './add-recruitment.component.html',
  styleUrls: ['./add-recruitment.component.scss']
})
export class AddRecruitmentComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private _recruitment: RecruitmentsService) {

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
      hiringAuthoritySignature: [''],
    });
  }

  recruitmentForm: FormGroup;
  formErrors: any;
  resumeInfo: any = {};
  uploaded_files: any = [];
  resumeUploaded: boolean = false;
  imageUploaded: boolean = false;
  fileData: any;

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

  addRecruitment() {
    console.log(this.recruitmentForm.value);
    console.log(this.resumeInfo);

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

        this.uploaded_files = Object.assign([], event.target.files);
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

  uploadCadidateCv(cvFile) {
    this._recruitment.uploadCadidateCv(cvFile).subscribe(res => {
      console.log(res);
    })
  }

}
