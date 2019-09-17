import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PipesModule } from "../shared/pipes/pipes.module";

import { AddRecruitmentComponent } from './add-recruitment/add-recruitment.component';
import { ViewRecruitmentComponent } from './view-recruitment/view-recruitment.component';

@NgModule({
  declarations: [
    AddRecruitmentComponent,
    ViewRecruitmentComponent
  ],
  imports: [
    BrowserModule,
    PipesModule
  ],
  providers: [],
  bootstrap: []
})
export class RecruitmentModule { }
