import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  Nb_Members: number = 0;
  Nb_Events: number = 0;
  Nb_Articles: number = 120;
  Nb_Pubs: number = 50;
}
