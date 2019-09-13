import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor( private router: Router, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.formErrors = {
      name: {},
      address: {},
      city: {},
      country: {},
      contact: {},
      url: {},
      contact_person_name: {},
      contact_person_number: {},
      parent_org: {}
    };
  }

  ngOnInit(){

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      city: ['', [Validators.required, Validators.pattern('^[a-zA-Z- ]*$'), Validators.maxLength(50)]],
      country: ['', [Validators.required, Validators.pattern('^[a-zA-Z- ]*$'), Validators.maxLength(50)]],
      contact: ['', [Validators.required, Validators.pattern('^[0-9-]*$'), Validators.maxLength(50)]],
      url: ['', [Validators.required,]],
      contact_person_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z- ]*$'), Validators.maxLength(50)]],
      contact_person_number: ['', [Validators.required, Validators.pattern('^[0-9-]*$'), Validators.maxLength(50)]],
      parent_org: ['', Validators.required]
    });

    this.form.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });
  }

  organization: any = {};
  title = 'rms';
  form: FormGroup;
  formErrors: any;

  onFormValuesChanged() {
    for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) {
        continue;
      }

      this.formErrors[field] = {};
      const control = this.form.get(field);

      if (control && control.dirty && !control.valid) {
        this.formErrors[field] = control.errors;
      }
    }
  }
}
