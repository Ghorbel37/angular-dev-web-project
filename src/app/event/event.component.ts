import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Evnt } from 'src/models/Event';
import { EventService } from 'src/services/event.service';
import { EventModalComponent } from '../event-modal/event-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements AfterViewInit{
  dataSource: MatTableDataSource<Evnt>= new MatTableDataSource();
  displayedColumns: string[] = ['id', 'title', 'date', 'location'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private es: EventService, private dialog: MatDialog) {
    this.es.getAllEvents().subscribe(data => {
      this.dataSource.data = data;
    });
   }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openAddEventModal() {
    //Lancer la boite event-modal
    this.dialog.open(EventModalComponent).afterClosed().subscribe(EvtRecupere => {
      if (EvtRecupere) {
        this.es.saveEvent(EvtRecupere).subscribe(()=>{
          this.es.getAllEvents().subscribe(data => {
            this.dataSource.data = data;
          });
        });
      }
    });
  }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
