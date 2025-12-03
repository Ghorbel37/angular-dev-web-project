import { Component } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { EventService } from 'src/services/event.service';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  Nb_Members: number = 0;
  Nb_Events: number = 0;
  Nb_Articles: number = 0;
  Nb_Pubs: number = 0;

    chartData: ChartDataset[] = [
    {
      // ⤵️ Add these
      label: '$ in millions',
      data: [ 1551, 1688, 1800, 1895, 2124, 2124 ]
    }
  ];
  chartLabels: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  chartOptions: ChartOptions = {};

  constructor(private memberService: MemberService, private eventService: EventService) {
    this.memberService.getAllMembers().subscribe((members) => {
      this.Nb_Members = members.length;
    });

    this.eventService.getAllEvents().subscribe((events) => {
      this.Nb_Events = events.length;
    });
  }
}
