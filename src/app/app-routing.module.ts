import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberComponent } from './member/member.component';
import { LoginComponent } from './login/login.component';
import { EventComponent } from './event/event.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'create', pathMatch: 'full', component: MemberFormComponent },
  { path: 'edit/:id', pathMatch: 'full', component: MemberFormComponent },
  { path: 'member', pathMatch: 'full', component: MemberComponent },
  { path: 'events', pathMatch: 'full', component: EventComponent },
  { path: 'dashboard', pathMatch: 'full', component: DashboardComponent },
  { path: '', component: LoginComponent },
  { path: '**', component: MemberComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
