import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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
    private dialog: MatDialog) {
    this.form = new FormGroup({
      title: new FormControl(null),
      dateDebut: new FormControl(null),
      dateFin: new FormControl(null),
      location: new FormControl(null),
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
