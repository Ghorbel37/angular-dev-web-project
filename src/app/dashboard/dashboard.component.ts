import { Component } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { EventService } from 'src/services/event.service';
import { MemberService } from 'src/services/member.service';
import { PublicationService } from 'src/services/publication.service';
import { ToolService } from 'src/services/tool.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  Nb_Members: number = 0;
  Nb_Events: number = 0;
  Nb_Pubs: number = 0;
  Nb_Tools: number = 0;

  // raw data arrays
  members: any[] = [];
  events: any[] = [];
  publications: any[] = [];
  tools: any[] = [];

  // Charts
  barLabels: string[] = ['Membres', 'Evenements', 'Publications', 'Outils'];
  barData: ChartDataset[] = [ { label: 'Counts', data: [0, 0, 0, 0], backgroundColor: ['#3f51b5', '#4caf50', '#ff9800', '#9c27b0'] } ];

  memberTypeLabels: string[] = ['Enseignant', 'Etudiant'];
  memberTypeData: ChartDataset[] = [ { data: [0, 0], label: 'Membres par type', backgroundColor: ['#2196f3', '#ff5722'] } ];

  publicationsLabels: string[] = []; // years
  publicationsData: ChartDataset[] = [ { data: [], label: 'Publications au cours des années', borderColor: '#3f51b5', backgroundColor: 'rgba(63,81,181,0.2)', fill: true } ];

  publicationTypeLabels: string[] = [];
  publicationTypeData: ChartDataset[] = [ { data: [], label: 'Publications par type', backgroundColor: [] } ];

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true
      }
    }
  };

  constructor(private memberService: MemberService, private eventService: EventService, private publicationService: PublicationService, private toolService: ToolService) {
    this.memberService.getAllMembers().subscribe((members) => {
      this.members = members || [];
      this.Nb_Members = this.members.length;
      this.updateCharts();
    });

    this.eventService.getAllEvents().subscribe((events) => {
      this.events = events || [];
      this.Nb_Events = this.events.length;
      this.updateCharts();
    });

    this.publicationService.getAllPublications().subscribe((publications) => {
      this.publications = publications || [];
      this.Nb_Pubs = this.publications.length;
      this.updateCharts();
    });

    this.toolService.getAllTools().subscribe((tools) => {
      this.tools = tools || [];
      this.Nb_Tools = this.tools.length;
      this.updateCharts();
    });
  }

  private updateCharts() {
    // update bar chart counts
    this.barData = [ { label: 'Nombre', data: [this.Nb_Members, this.Nb_Events, this.Nb_Pubs, this.Nb_Tools] } ];

    // member types distribution
    const enseignants = this.members.filter(m => (m.type || '').toLowerCase() === 'enseignant').length;
    const etudiants = this.members.filter(m => (m.type || '').toLowerCase() === 'etudiant').length;
    const others = this.members.length - enseignants - etudiants;
    this.memberTypeData = [ { data: [enseignants, etudiants], label: 'Membres par type' } ];

    // publications per year
    const countsByYear: Record<string, number> = {};
    this.publications.forEach(p => {
      const year = p.dateApparition ? new Date(p.dateApparition).getFullYear() : 'Unknown';
      countsByYear[year] = (countsByYear[year] || 0) + 1;
    });
    const years = Object.keys(countsByYear).sort();
    this.publicationsLabels = years;
    this.publicationsData = [{ data: years.map(y => countsByYear[y]), label: 'Publications au cours des années' }];

    // publications by type
    const countsByType: Record<string, number> = {};
    this.publications.forEach(p => {
      const t = p.type || 'Unknown';
      countsByType[t] = (countsByType[t] || 0) + 1;
    });
    const types = Object.keys(countsByType).sort();
    this.publicationTypeLabels = types;
    const palette = ['#f44336', '#e91e63', '#9c27b0', '#2196f3', '#03a9f4', '#4caf50', '#ff9800', '#795548', '#607d8b'];
    const bg = types.map((_, i) => palette[i % palette.length]);
    this.publicationTypeData = [{ data: types.map(t => countsByType[t]), label: 'Publications par type', backgroundColor: bg }];
  }
}
