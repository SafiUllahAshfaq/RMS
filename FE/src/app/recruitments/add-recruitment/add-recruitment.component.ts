import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recruitment',
  templateUrl: './add-recruitment.component.html',
  styleUrls: ['./add-recruitment.component.scss']
})
export class AddRecruitmentComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder,private snackBar: MatSnackBar) {

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
  }

  recruitmentForm: FormGroup;
  formErrors: any;

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
  }

}
