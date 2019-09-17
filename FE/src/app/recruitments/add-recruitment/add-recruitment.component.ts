import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { RecruitmentsService } from "../../services/recruitments.service";

@Component({
  selector: 'app-add-recruitment',
  templateUrl: './add-recruitment.component.html',
  styleUrls: ['./add-recruitment.component.scss']
})
export class AddRecruitmentComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder,private snackBar: MatSnackBar,
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
      suitabilityForPositionApplied: {},
      scoreObtained:{},
      overallEvaluation:{},
      interviewerComments:{},
      interviewerName:{},
      interviewerDesignation: {},
      recommendation: {},
      proposedDesignation: {},
      salary:{},
      otherBenefits: {},
      location: {},
      date: {},
      hiringAuthoritySignature: {}
    
    };
   }

  ngOnInit() {
    this.recruitmentForm = this.formBuilder.group({
      candidateName: ['', [Validators.required, Validators.maxLength(50)]],
      candidatePosition: ['', [Validators.required, Validators.maxLength(50)]],
      relevantEducation: ['', [Validators.required]],
      relevantJobPersistance: ['', [Validators.required]],
      relevantJobExperience: ['', [Validators.required]],
      appearance: ['', [Validators.required]],
      communicationSkills: ['', [Validators.required]],
      basicProgrammingSkills: ['', [Validators.required]],
      objectOrientedConcepts: ['', [Validators.required]],
      dataStructureConcepts: ['', [Validators.required]],
      algorithm: ['', [Validators.required]],
      designPattern: ['', [Validators.required]],
      programingLanguageSkills: ['', [Validators.required]],
      analyticalSkills: ['', [Validators.required]],
      understandingOfDevLifeCycle: ['', [Validators.required]],
      teamPlayerCapability: ['', [Validators.required]],
      teamLeadCapability: ['', [Validators.required]],
      suitabilityForPositionApplied: ['', [Validators.required]],
      scoreObtained: ['', [Validators.required, Validators.pattern('^[0-9-]*$'), Validators.maxLength(50)]],
      overallEvaluation: ['', [Validators.required]],
      interviewerComments: ['', [Validators.required, Validators.maxLength(500)]],
      interviewerName: ['', [Validators.required, Validators.maxLength(50)]],
      interviewerDesignation: ['', [Validators.required, Validators.maxLength(50)]],
      recommendation: ['', [Validators.required]],
      proposedDesignation: ['', [Validators.required, Validators.maxLength(50)]],
      salary: [0, [Validators.required, Validators.pattern('^[0-9-]*$'), Validators.maxLength(50)]],
      otherBenefits: ['', [Validators.required, Validators.maxLength(500)]],
      location: ['', [Validators.required, Validators.maxLength(50)]],
      date: ['', [Validators.required, Validators.maxLength(50)]],
      hiringAuthoritySignature: [''],
    });

    if(!this.imageUploaded){
      this.imageInfo.USER_FILE_SRC = "assets/images/profile.jpg";
    }

    this.recruitmentService.selected_recruitment.subscribe(recruitment => {
      //this.recruitmentForm = recruitment;
      console.log(recruitment);
    });
  }

  recruitmentForm: FormGroup;
  formErrors: any;
  resumeInfo: any = {};
  imageInfo: any = {};
  uploaded_files: any = [];
  recruitmentSaved: boolean = false;
  resumeUploaded: boolean = false;
  imageUploaded: boolean = false;

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

  addRecruitment(){
    console.log(this.recruitmentForm.value);
    this.recruitmentSaved = true;
  }

  uploadFile(event) {
    if (event.target.files[0]) {
      let name_length = event.target.files[0].name.length;
      let file_size = event.target.files[0].size / 1000000;

      if (name_length <= 30 && file_size <= 50) {
        this.resumeUploaded = true;
        this.imageUploaded = false;

        this.resumeInfo.file_src = URL.createObjectURL(event.target.files[0]);
        this.resumeInfo.file_type = event.target.files[0].type;
        this.resumeInfo.file_name = event.target.files[0].name;
        this.resumeInfo.file_size = file_size;

        this.uploaded_files = Object.assign([], event.target.files);
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

}
