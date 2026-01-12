import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PublicationService } from 'src/services/publication.service';

@Component({
  selector: 'app-publication-modal',
  templateUrl: './publication-modal.component.html',
  styleUrls: ['./publication-modal.component.css']
})
export class PublicationModalComponent {
  form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<PublicationModalComponent>,
    private publicationService: PublicationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data) {
        this.publicationService.getPublicationById(data).subscribe(pubData => {
          this.form = new FormGroup({
            titre: new FormControl(pubData.titre),
            type: new FormControl(pubData.type),
            dateApparition: new FormControl(pubData.dateApparition),
            lien: new FormControl(pubData.lien),
            sourcePdf: new FormControl(pubData.sourcePdf),
          });
        });
      } else {
        this.form = new FormGroup({
          titre: new FormControl(null),
          type: new FormControl(null),
          dateApparition: new FormControl(null),
          lien: new FormControl(null),
          sourcePdf: new FormControl(null),
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

