import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRecruitmentComponent } from './recruitments/add-recruitment/add-recruitment.component';
import { ViewRecruitmentComponent } from './recruitments/view-recruitment/view-recruitment.component';

const routes: Routes = [
  {
    path: 'recruitment/form',
    component: AddRecruitmentComponent
  },
  {
    path: 'recruitments',
    component: ViewRecruitmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
