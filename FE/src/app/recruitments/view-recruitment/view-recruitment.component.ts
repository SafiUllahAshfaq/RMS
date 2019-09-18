import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
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
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router, private recruitmentService: RecruitmentsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllRecruitments();
    this.displayedColumns = ['candidateName', 'candidateCv', 'interviewerName', 'interviewerDesignation', 'interviewDate', 'action'];
  }

  getAllRecruitments() {
    this.recruitmentService.getAllRecruitments().subscribe(recruitmentRecords => {
      this.recruitments = recruitmentRecords;
      this.dataSource = new MatTableDataSource(this.recruitments);
      this.dataSource.paginator = this.paginator;
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
  }



}
