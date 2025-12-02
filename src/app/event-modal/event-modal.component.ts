import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/services/event.service';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css']
})
export class EventModalComponent {

  form!: FormGroup;
  // description: string;

  constructor(
    private dialogRef: MatDialogRef<EventModalComponent>,
    private dialog: MatDialog,
    private eventService: EventService,
    @Inject(MAT_DIALOG_DATA) public data: any) //La boite accepte l'injection
    {
    if (data) {
      this.eventService.getEventById(data).subscribe(eventData => {
        this.form = new FormGroup({
          title: new FormControl(eventData.title),
          dateDebut: new FormControl(eventData.dateDebut),
          dateFin: new FormControl(eventData.dateFin),
          location: new FormControl(eventData.location),
        });
      });
    } else {
      this.form = new FormGroup({
        title: new FormControl(null),
        dateDebut: new FormControl(null),
        dateFin: new FormControl(null),
        location: new FormControl(null),
      });
    }
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
