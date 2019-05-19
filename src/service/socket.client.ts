import * as io from 'socket.io-client';
import {observable, Observable} from 'rxjs';

export class SocketService {
    private socket;
    constructor() {
        this.socket = io('http://localhost:3000', {transports: ['websocket']});
    }

    public createRoom(name) {
        this.socket.emit('create', name);
    }

    public joinRoom(details) {
        this.socket.emit('join', details);
    }

    public getUpdate() {

    }

    public userJoined() {
        return Observable.create((observer) => {
            this.socket.on('userJoined', (user) => {
                observer.next(user);
            });
        });

    }

    public adminLeft(name) {
        this.socket.emit('adminLeft', {channel: name});
    }

    public userLeft(userName, channel) {
        console.log(`${userName} left from ${channel}`);
        this.socket.emit('userLeft', {userName, channel});
    }

    public adminStatus() {
        return Observable.create((observer) => {
            this.socket.on('adminLeft', () => {
                observer.next();
            });
        });
    }
    public userStatus() {
        return Observable.create((observer) => {
            this.socket.on('userLeft', (userInfo) => {
                observer.next(userInfo);
            });
        });
    }

    public sendQuestion(channel, question, answer, id) {
        this.socket.emit('sendQuestion', {channel, question, answer, id});
    }

    public getQuestion() {
        return Observable.create((observer) => {
            this.socket.on('receiveQuestion', (questionAnswers) => {
                observer.next(questionAnswers);
            });
        });
    }
    public checkAnswer() {
        return Observable.create((observer) => {
            this.socket.on('checkAnswer', (answer) => {
                observer.next(answer);
            });
        });
    }
    public submitAnswer(channel, answer, user, question) {
        this.socket.emit('submitAnswer', {channel, answer, user, question});
    }

    public endChannel(channel, users) {
        this.socket.emit('endChannel', {channel, users});
    }

    public channelStatus() {
        return Observable.create((observer) => {
            this.socket.on('channelEnded', (users) => {
                observer.next(users);
            });
        });
    }
    public getBoardUpdate() {
        return Observable.create((observer) => {
            this.socket.on('getUpdate', (update) => {
                observer.next(update);
            });
        });
    }
    public sendBoardStatus(columns, channel) {
        this.socket.emit('sendUpdate', {columns, channel});
    }
}
