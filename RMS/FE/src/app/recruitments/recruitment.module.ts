import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AddRecruitmentComponent } from './add-recruitment/add-recruitment.component';
import { ViewRecruitmentComponent } from './view-recruitment/view-recruitment.component';
import { EditRecruitmentComponent } from './edit-recruitment/edit-recruitment.component';

@NgModule({
  declarations: [
    AddRecruitmentComponent,
    ViewRecruitmentComponent,
    EditRecruitmentComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: []
})
export class RecruitmentModule { }
