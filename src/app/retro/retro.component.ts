import { Component, OnInit } from '@angular/core';
import {SocketService} from '../../service/socket.client';

@Component({
  selector: 'app-retro',
  templateUrl: './retro.component.html',
  styleUrls: ['./retro.component.scss']
})
export class RetroComponent implements OnInit {

  constructor(public socket: SocketService) { }

  isAdmin: Boolean = false;
  columns: any[] = [];
  columnName: string;
  channelName: string;
  name: string;
  enableAdd = false;
  connected: Boolean;

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

  create = () => {
     this.socket.createRoom(this.channelName);
     this.connected = true;
     this.isAdmin = true;
     sessionStorage.setItem('retroDetails', `{"channel": ${this.channelName}, "admin":true,"name":${this.name}`);
  }

  removeColumn = (name) => {
    this.columns = this.columns.find(column => column !== name );
  }

}
