import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../service/socket.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-retro',
    templateUrl: './retro.component.html',
    styleUrls: ['./retro.component.scss']
})
export class RetroComponent implements OnInit {

    constructor(public socket: SocketService, public router: Router, private route: ActivatedRoute) {
    }

    isAdmin: Boolean = false;
    columns: any[] = [];
    columnName: string;
    card: string;
    channelName: string;
    name: string;
    enableAdd = false;
    connected: Boolean;
    showAddCard: Boolean = true;
    action: string;

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.action = params.action;
            this.channelName = params.channel || '';
        });

        this.socket.userJoined().subscribe( (user: string) => {
            this.socket.sendBoardStatus(this.columns, this.channelName);
        });

        this.socket.getBoardUpdate().subscribe(update => {
            this.columns = update;
        });

    }

    addColumn = (e) => {
        this.columns.push({name: e.target.value, cards: []});
        this.columnName = '';
        this.enableAdd = false;
        this.socket.sendBoardStatus(this.columns, this.channelName);
    }

    showAddButton = () => {
        this.enableAdd = true;
    }

    create = () => {
        this.socket.createRoom(this.channelName);
        this.isAdmin = true;
        sessionStorage.setItem('retroDetails', `{"channel": ${this.channelName}, "admin":true,"name":${this.name}`);
        this.router.navigate(['/retro', 'join', {channel: this.channelName}]);
        this.connected = true;
    }

    join = () => {
        this.socket.joinRoom({channel: this.channelName, name: this.name});
        sessionStorage.setItem('retroDetails', `{"channel": ${this.channelName}, "admin":false,"name":${this.name}`);
        this.connected = true;
    }

    removeColumn = (name) => {
        this.columns = this.columns.filter(column => column !== name);
        this.socket.sendBoardStatus(this.columns, this.channelName);
    }

    addCard = (column) => {
        this.columns.find(col => col.name === column && col.cards.push(this.card));
        this.card = '';
        this.socket.sendBoardStatus(this.columns, this.channelName);
    }

    allDrop = (e) => {
        e.preventDefault();
    }

    drop = (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text');
        console.log('data' + data);
        e.target.appendChild(document.getElementById(data));
    }

    drag = (e) => {
        e.preventDefault();
        console.log('id' + e.target.id);
        this.showAddCard = false;
        e.dataTransfer.setData('text', e.target.id);

    }

    dragOver = (e) => {
        e.preventDefault();
        this.showAddCard = true;
    }

}
