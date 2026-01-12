import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToolService } from 'src/services/tool.service';

@Component({
  selector: 'app-tool-modal',
  templateUrl: './tool-modal.component.html',
  styleUrls: ['./tool-modal.component.css']
})
export class ToolModalComponent {
  form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ToolModalComponent>,
    private toolService: ToolService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data) {
        this.toolService.getToolById(data).subscribe(toolData => {
          this.form = new FormGroup({
            date: new FormControl(toolData.date),
            source: new FormControl(toolData.source),
          });
        });
      } else {
        this.form = new FormGroup({
          date: new FormControl(null),
          source: new FormControl(null),
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

