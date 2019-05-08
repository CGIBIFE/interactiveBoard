import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../../service/socket.client';
import { CookieManager } from '../../service/cookie.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  room: string;
  isAdmin: Boolean;
  constructor(private route: ActivatedRoute, public socketService: SocketService, private cookieManager: CookieManager) { }

  ngOnInit() {
    this.socketService.userJoined().subscribe((name: string) => {
      console.log(name);
    });
    this.route.params.subscribe(params => {
      this.room = params['name'].replace(/_/g, ' ');
    });
    console.log(this.cookieManager.readCookie())
    this.isAdmin = this.cookieManager.readCookie().isAdmin;
  }
  ngOnDestroy(): void {
    this.cookieManager.clearCookies();
  }
}
