import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatSnackBar } from '@angular/material';
import {Router} from '@angular/router';

import { RecruitmentsService } from "../../services/recruitments.service";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
  extra: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Saad Sohail', weight: 'Siddique Trade Center', symbol: 'Saad_Resume.pdf', extra:"nsankna"},
  {position: 2, name: 'Waleed Ali', weight: 'Siddique Trade Center', symbol: 'Waleed_Resume.pdf', extra:"nsankna"},
  {position: 3, name: 'SaifUllah', weight: 'Siddique Trade Center', symbol: 'SaifUllah_Resume.pdf', extra:"nsankna"},
  {position: 4, name: 'Saad Rehman', weight: 'Siddique Trade Center', symbol: 'SaadRehman_Resume.pdf', extra:"nsankna"}
];

@Component({
  selector: 'app-view-recruitment',
  templateUrl: './view-recruitment.component.html',
  styleUrls: ['./view-recruitment.component.scss']
})
export class ViewRecruitmentComponent implements OnInit {

  constructor(private router: Router, private recruitmentService: RecruitmentsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editRecruitment(element){
    this.router.navigateByUrl('recruitment/form');
  }

  deleteRecruitment(element){
    console.log(element);
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
