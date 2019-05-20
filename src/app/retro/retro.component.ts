import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../service/socket.client';
import {ActivatedRoute, Router} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {FormControl, FormGroup} from '@angular/forms';
import {toPng} from 'html-to-image';
import download from 'downloadjs';

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
   joinForm = new FormGroup({
        name: new FormControl(),
    });
    createForm = new FormGroup({
        retroName: new FormControl(),
        name: new FormControl(),
    });

    createColumnForm = new FormGroup({
        column: new FormControl(),
    });

    columnField = new FormControl('', [
    ]);


    createCardForm = new FormGroup({
        card: new FormControl(),
    });

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
        this.columns = this.columns.filter(column => column.name !== name);
        this.socket.sendBoardStatus(this.columns, this.channelName);
    }

    addCard = (column, e) => {
        this.columns.find(col => col.name === column && col.cards.push({content: e.target.value, by: this.name, id: Math.random()}));
        this.createCardForm.reset();
        this.socket.sendBoardStatus(this.columns, this.channelName);
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }
        this.socket.sendBoardStatus(this.columns, this.channelName);
    }

    downloadCopy = () => {
        toPng(document.getElementById('retroBoard'))
            .then( (dataUrl) => {
                download(dataUrl, this.channelName);
            });

    }

    removeCard = (columnName, id) => {
        // tslint:disable-next-line:max-line-length
        this.columns.find(column => column.name === columnName).cards = this.columns.find(column => column.name === columnName).cards.filter(card => card.id !== id)
       this.socket.sendBoardStatus(this.columns, this.channelName);
    }
}

