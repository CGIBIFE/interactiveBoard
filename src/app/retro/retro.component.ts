import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retro',
  templateUrl: './retro.component.html',
  styleUrls: ['./retro.component.scss']
})
export class RetroComponent implements OnInit {

  constructor() { }

  columns: any[] = [];
  columnName: string;
  enableAdd = false;
   ngOnInit() {
  }
  addColumn = (e) => {
     this.columns.push(e.target.value);
    this.columnName = '';
    this.enableAdd = false;
  }
  showAddButton = () => {
     this.enableAdd = true;
  }

}
