import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// import { FuseModule } from '@fuse/fuse.module';
// import { FuseSharedModule } from '@fuse/shared.module';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import {
  MatButtonModule, MatNativeDateModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatSelectModule, MatStepperModule, MatRadioModule, MatTableDataSource, MatTableModule
} from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDialogModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PipesModule } from "./shared/pipes/pipes.module";
import { RecruitmentsService } from './services/recruitments.service';

import { AddRecruitmentComponent } from './recruitments/add-recruitment/add-recruitment.component';
import { ViewRecruitmentComponent } from './recruitments/view-recruitment/view-recruitment.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddRecruitmentComponent,
    ViewRecruitmentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PipesModule,
    MatSnackBarModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxDatatableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    SlimLoadingBarModule
  ],
  providers: [
    RecruitmentsService,
    MatDatepickerModule,],
  bootstrap: [AppComponent]
})
export class AppModule { }
