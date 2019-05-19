import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParticipantComponent } from './participant/participant.component';
import { HomeComponent } from './home/home.component';
import { CreatorComponent } from './creator/creator.component';
import { CommonFormComponent } from './common-form/common-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LinkComponent } from './link/link.component';
import { SocketService } from '../service/socket.client';
import { CookieManager } from '../service/cookie.service';
import { RoomComponent } from './room/room.component';
import { RoomGuardClass } from './roomGuard.class';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RetroComponent } from './retro/retro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule
} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [
    AppComponent,
    ParticipantComponent,
    HomeComponent,
    CreatorComponent,
    CommonFormComponent,
    LinkComponent,
    RoomComponent,
    DashboardComponent,
    RetroComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatDividerModule,
        DragDropModule,
        MatBadgeModule,
    ],
  providers: [SocketService, CookieManager, RoomGuardClass],
  bootstrap: [AppComponent]
})
export class AppModule { }
