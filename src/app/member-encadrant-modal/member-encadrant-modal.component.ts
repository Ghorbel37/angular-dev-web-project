import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-member-encadrant-modal',
  templateUrl: './member-encadrant-modal.component.html',
  styleUrls: ['./member-encadrant-modal.component.css']
})
export class MemberEncadrantModalComponent implements OnInit {
  memberId!: string;
  student: any;
  enseignants: any[] = [];
  selectedEncadrantId: number | null = null;

  constructor(
    private dialogRef: MatDialogRef<MemberEncadrantModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private memberService: MemberService
  ){
    this.memberId = data?.id;
  }

  ngOnInit(){
    this.load();
  }

  load(){
    if (!this.memberId) return;
    // load student
    this.memberService.getMemberById(this.memberId).subscribe(s => {
      this.student = s;
      // encadrant may be a number (id) or an object { id }
      if (s?.encadrant) {
        if (typeof s.encadrant === 'number') {
          this.selectedEncadrantId = s.encadrant;
        } else if ((s.encadrant as any).id) {
          this.selectedEncadrantId = (s.encadrant as any).id;
        } else {
          this.selectedEncadrantId = null;
        }
      }
    });

    // load enseignants
    this.memberService.getAllMembers().subscribe(list => {
      this.enseignants = list.filter((m: any) => (m.type || '').toLowerCase() === 'enseignant');
    });
  }

  save(){
    if (!this.student) return;
    const updated = { ...this.student, encadrant: this.selectedEncadrantId ? { id: this.selectedEncadrantId } : null, type: 'Etudiant' };
    this.memberService.updateMember(this.memberId, updated).subscribe(()=> this.dialogRef.close(true));
  }

  close(){
    this.dialogRef.close();
  }
}

