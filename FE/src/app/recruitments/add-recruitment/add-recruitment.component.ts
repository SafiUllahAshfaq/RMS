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

  constructor(private router: Router, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {

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
      relevantJobExperience: ['0', [Validators.required]],
      appearance: ['0', [Validators.required]],
      communicationSkills: ['0', [Validators.required]],
      basicProgrammingSkills: ['0', [Validators.required]],
      objectOrientedConcepts: ['0', [Validators.required]],
      dataStructureConcepts: ['0', [Validators.required]],
      algorithm: ['0', [Validators.required]],
      designPattern: ['0', [Validators.required]],
      programingLanguageSkills: ['0', [Validators.required]],
      analyticalSkills: ['0', [Validators.required]],
      understandingOfDevLifeCycle: ['0', [Validators.required]],
      teamPlayerCapability: ['0', [Validators.required]],
      teamLeadCapability: ['0', [Validators.required]],
      suitabilityForPositionApplied: ['0', [Validators.required]],
      scoreObtained: ['', [Validators.required, Validators.pattern('^[0-9-]*$'), Validators.maxLength(50)]],
      overallEvaluation: ['0', [Validators.required]],
      interviewerComments: ['Has potential to learn and adapt rapidly.', [Validators.required, Validators.maxLength(500)]],
      interviewerName: ['Fahid Sami', [Validators.required, Validators.maxLength(50)]],
      interviewerDesignation: ['Project Manager', [Validators.required, Validators.maxLength(50)]],
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

  addRecruitment() {
    console.log(this.recruitmentForm.value);
  }

}
