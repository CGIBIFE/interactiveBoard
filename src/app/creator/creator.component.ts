import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../service/socket.client';
import {Router} from '@angular/router';
import {CookieManager} from '../../service/cookie.service';

@Component({
    selector: 'app-creator',
    templateUrl: './creator.component.html',
    styleUrls: ['./creator.component.scss']
})
export class CreatorComponent implements OnInit {
    channelName: string;

    constructor(private socketService: SocketService, public router: Router, private cookieManager: CookieManager) {
    }

    ngOnInit() {
    }

    submit = (value: any) => {
        this.cookieManager.clearCookies();
        this.channelName = value.channel;
        if (/\s/.test(this.channelName)) {
            this.channelName = this.channelName.replace(/\s/g, '_');
        }
        this.router.navigate(['room', this.channelName]);
        this.socketService.createRoom(this.channelName);
        this.cookieManager.setCookie({name: value.name, channel: this.channelName, isAdmin: true});
    };


}
