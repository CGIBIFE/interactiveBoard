import { Component, OnInit, OnDestroy} from '@angular/core';
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
  users: any[] = [];

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, public socketService: SocketService, private cookieManager: CookieManager) {
  }
  ngOnInit() {
    this.socketService.userJoined().subscribe((name: string) => {
      this.users.push({name, 'score': 0});
    });
    this.route.params.subscribe(params => {
      this.room = params['name'].replace(/_/g, ' ');
    });

    this.isAdmin = Boolean(this.cookieManager.readCookie().userDetails.isAdmin);
  }

  ngOnDestroy(): void {
    this.cookieManager.clearCookies();
  }
}
