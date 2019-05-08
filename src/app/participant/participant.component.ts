import {Component, OnInit} from '@angular/core';
import { SocketService } from '../../service/socket.client';
import {Router} from '@angular/router';
import { CookieManager } from '../../service/cookie.service';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit {

  channelName: string;
  constructor(private socket: SocketService, public router: Router, private cookieManager: CookieManager) { }

  ngOnInit() {
  }

  submit = (value: any) => {
   this.cookieManager.clearCookies();
    this.channelName = value.channel;
    if (/\s/.test(this.channelName)) {
      this.channelName = this.channelName.replace(/\s/g, '_');
    }
    this.router.navigate(['room', this.channelName]);
    this.socket.joinRoom({channel: this.channelName, name: value.name});
    this.cookieManager.setCookie({name: value.name, channel: this.channelName, isAdmin: false});
  }
}
