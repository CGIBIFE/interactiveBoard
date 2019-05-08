import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParticipantComponent } from './participant/participant.component';
import { HomeComponent } from './home/home.component';
import { CreatorComponent } from './creator/creator.component';
import { CommonFormComponent } from './common-form/common-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { LinkComponent } from './link/link.component';
import { SocketService } from '../service/socket.client';
import { CookieManager } from '../service/cookie.service';
import { RoomComponent } from './room/room.component';
@NgModule({
  declarations: [
    AppComponent,
    ParticipantComponent,
    HomeComponent,
    CreatorComponent,
    CommonFormComponent,
    LinkComponent,
    RoomComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
  providers: [SocketService, CookieManager],
  bootstrap: [AppComponent]
})
export class AppModule { }
