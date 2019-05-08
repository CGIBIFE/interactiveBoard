import * as io from 'socket.io-client';
import {Observable} from 'rxjs';

export class SocketService {
    private socket;
    constructor() {
        this.socket = io('http://localhost:3000');
    }

    public createRoom(name) {
        this.socket.emit('create', name);
    }

    public joinRoom(details) {
        this.socket.emit('join', details);
    }

    public userJoined() {
        return Observable.create((observer) => {
            this.socket.on('userJoined', (user) => {
                observer.next(user);
            });
        });

    }
}
