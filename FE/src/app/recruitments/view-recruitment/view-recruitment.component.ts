import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { RecruitmentsService } from "../../services/recruitments.service";
import { IRecruitmentForm } from '../../models/interface';

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

  downloadCv(recruitmentFormDetails) {
    console.log(recruitmentFormDetails);
    // const payload = {
    //   id: recruitmentFormDetails._id,
    //   candidateName: recruitmentFormDetails.candidateInformation.name
    // }
    const payload = {
      id: "5d8077090fd08d3e84b7e3ae",
      candidateName: "Safi Ullah"
    }
    this.recruitmentService.getCandidateCv(payload);
  }

  private downloadFile(data: Response) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
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
    this.recruitmentService.deleteRecruitment(recruitment._id).subscribe(res => {
      console.log(res);
      this.getAllRecruitments();
    }, error => {
      console.log(error);
    })
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
