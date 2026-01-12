import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Evnt } from 'src/models/Event';
import { EventService } from 'src/services/event.service';
import { EventModalComponent } from '../event-modal/event-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements AfterViewInit{
  dataSource: MatTableDataSource<Evnt>= new MatTableDataSource();
  displayedColumns: string[] = ['id', 'title', 'dateDebut','dateFin', 'location', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private eventService: EventService, private dialog: MatDialog) {
    this.eventService.getAllEvents().subscribe(data => {
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
        this.eventService.saveEvent(EvtRecupere).subscribe(()=>{
          this.eventService.getAllEvents().subscribe(data => {
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

  deleteEvent(id: any) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '220px',
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventService.deleteEvent(id).subscribe(() => {
          this.eventService.getAllEvents().subscribe(data => {
            this.dataSource.data = data;
          });
        });
      }
    });
  }

  openEditEventModal(idEvent: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = idEvent;
    let dialogRef = this.dialog.open(EventModalComponent, dialogConfig).afterClosed().subscribe(EvtRecupere => {
      if (EvtRecupere) {
        this.eventService.updateEvent(idEvent, EvtRecupere).subscribe(()=>{
          this.eventService.getAllEvents().subscribe(data => {
            this.dataSource.data = data;
          });
        });
      }
    });
  }
}
