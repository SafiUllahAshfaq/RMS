import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Saad Sohail', weight: 'Siddique Trade Center', symbol: 'Saad_Resume.pdf'},
  {position: 2, name: 'Waleed Ali', weight: 'Siddique Trade Center', symbol: 'Waleed_Resume.pdf'},
  {position: 3, name: 'SaifUllah', weight: 'Siddique Trade Center', symbol: 'SaifUllah_Resume.pdf'},
  {position: 4, name: 'Saad Rehman', weight: 'Siddique Trade Center', symbol: 'SaadRehman_Resume.pdf'}
];

@Component({
  selector: 'app-view-recruitment',
  templateUrl: './view-recruitment.component.html',
  styleUrls: ['./view-recruitment.component.scss']
})
export class ViewRecruitmentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
  
  
}
