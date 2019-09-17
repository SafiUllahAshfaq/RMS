import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { RecruitmentsService } from "../../services/recruitments.service";
import { IRecruitmentForm } from '../../models/interface';

export interface PeriodicElement {
  sno: number;
  candidateName: string;
  postAppliedFor: string;
  candidateLocation: string;
  interviewerName: string;
  candiateCv: string;
}

@Component({
  selector: 'app-view-recruitment',
  templateUrl: './view-recruitment.component.html',
  styleUrls: ['./view-recruitment.component.scss']
})
export class ViewRecruitmentComponent implements OnInit {
  recruitments: [IRecruitmentForm];
  dataSource: any;
  displayedColumns: string[];
  constructor(private router: Router, private recruitmentService: RecruitmentsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllRecruitments();
    this.displayedColumns = ['candidateName', 'candiateCv', 'interviewerName', 'interviewerDesignation', 'interviewDate', 'action'];
  }

  getAllRecruitments() {
    this.recruitmentService.getAllRecruitments().subscribe(recruitmentRecords => {
      this.recruitments = recruitmentRecords;
      this.dataSource = new MatTableDataSource(this.recruitments);
    });
  }


  applyFilter(filterValue: string) {
    console.log(filterValue.trim().toLowerCase());
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editRecruitment(recruitment) {
    this.router.navigateByUrl('recruitment/form');
    this.recruitmentService.change_recruitment(recruitment);
  }

  deleteRecruitment(recruitment) {
    console.log(recruitment);
    //this.router.navigateByUrl('recruitments');
    // this.departmentService.deleteDepartment(dep)
    //   .subscribe(result => {
    //     if (!result.error) {
    //       if (result.affectedRows != 0) {

    //         let id = dep.ORG_ID;
    //         let index = this.departments.findIndex(function (obj) {
    //           return obj.ORG_ID == id;
    //         });

    //         if (index !== -1) {
    //           this.departments.splice(index, 1);
    //         }

    //         let message = 'Department deleted successfully';
    //         this.snackBar.open(message, '', {
    //           duration: 3000
    //         });
    //       }
    //       else {
    //         let message = 'Delete dependencies of this department first';
    //         this.snackBar.open(message, '', {
    //           duration: 3000
    //         });
    //       }
    //     }
    //     else {
    //       let message = "Server Error. Try Again Later";
    //       this.snackBar.open(message, '', {
    //         duration: 3000
    //       });
    //     }
    //   }, error => {
    //     let message = "Server Error. Try Again Later";
    //     this.snackBar.open(message, '', {
    //       duration: 3000
    //     });
    // });
  }



}
