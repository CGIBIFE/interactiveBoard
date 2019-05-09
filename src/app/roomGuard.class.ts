import { Injectable } from '@angular/core';
import { Router, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Observable} from 'rxjs';

@Injectable()
export class RoomGuardClass implements CanDeactivate<any> {

    constructor(private router: Router) {
    }

    // tslint:disable-next-line:max-line-length
    canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return window.confirm('Are you sure you want leave the room');
    }
}
