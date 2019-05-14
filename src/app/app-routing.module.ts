import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParticipantComponent } from './participant/participant.component';
import { HomeComponent } from './home/home.component';
import { CreatorComponent } from './creator/creator.component';
import { RoomComponent } from './room/room.component';
import {RoomGuardClass} from './roomGuard.class';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RetroComponent} from './retro/retro.component';

const routes: Routes = [
  {path: 'join', component: ParticipantComponent},
  {path: '', component: DashboardComponent},
  {path: 'home', component: HomeComponent},
  {path: 'create', component: CreatorComponent},
  {path: 'room/:name', component: RoomComponent, canDeactivate: [RoomGuardClass]},
  {path: 'retro', component: RetroComponent, canDeactivate: [RoomGuardClass]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
