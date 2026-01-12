import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberComponent } from './member/member.component';
import { LoginComponent } from './login/login.component';
import { EventComponent } from './event/event.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PublicationComponent } from './publication/publication.component';
import { ToolComponent } from './tool/tool.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'create', pathMatch: 'full', component: MemberFormComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', pathMatch: 'full', component: MemberFormComponent, canActivate: [AuthGuard] },
  { path: 'member', pathMatch: 'full', component: MemberComponent, canActivate: [AuthGuard] },
  { path: 'events', pathMatch: 'full', component: EventComponent, canActivate: [AuthGuard] },
  { path: 'articles', pathMatch: 'full', component: PublicationComponent, canActivate: [AuthGuard] },
  { path: 'tools', pathMatch: 'full', component: ToolComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', pathMatch: 'full', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: '**', component: MemberComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
