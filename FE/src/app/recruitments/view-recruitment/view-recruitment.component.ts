import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

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
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private router: Router, private recruitmentService: RecruitmentsService, private snackBar: MatSnackBar, private route: ActivatedRoute) {
    this.route.params.subscribe((val) => {
      //console.log('activatedRoute')
      setTimeout(() => {
        this.getAllRecruitments();
      }, 0);
    })
  }

  ngOnInit() {
    this.getAllRecruitments();
    this.displayedColumns = ['candidateName', 'candidateCv', 'interviewerName', 'interviewerDesignation', 'interviewDate', 'action'];
  }

  getAllRecruitments() {
    this.recruitmentService.getAllRecruitments().subscribe(recruitmentRecords => {
      this.recruitments = recruitmentRecords;
      this.dataSource = new MatTableDataSource(this.recruitments);
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'candidateInformation' ? currentTerm + data.candidateInformation.name : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        // Transform the filter by converting it to lowercase and removing whitespace.
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };
      this.dataSource.paginator = this.paginator;
    });
  }

  downloadCv(recruitmentFormDetails) {
    console.log(recruitmentFormDetails);
    const payload = {
      id: "5d8077090fd08d3e84b7e3ae",
      candidateName: "Safi Ullah"
    }
    this.recruitmentService.getCandidateCv(payload);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editRecruitment(recruitment) {
    this.router.navigateByUrl('recruitment/form');
    this.recruitmentService.change_recruitment(recruitment);
  }

  deleteRecruitment(recruitment) {
    this.recruitmentService.deleteRecruitment(recruitment._id).subscribe(res => {
      this.getAllRecruitments();
    }, error => {
    })
  }



}
