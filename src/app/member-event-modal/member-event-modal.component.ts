import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MemberService } from 'src/services/member.service';
import { Evnt } from 'src/models/Event';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from 'src/services/event.service';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-member-event-modal',
  templateUrl: './member-event-modal.component.html',
  styleUrls: ['./member-event-modal.component.css']
})
export class MemberEventModalComponent implements OnInit {
  memberId!: string;
  memberName: string = '';
  dataSource: MatTableDataSource<Evnt> = new MatTableDataSource();
  displayedColumns: string[] = ['title','dateDebut','location','action'];

  // existing events palette
  availableEvents: Evnt[] = [];
  selectedExistingEventId: number | null = null;

  // UI flags
  isLoading = false;
  isProcessing = false;

  constructor(
    private dialogRef: MatDialogRef<MemberEventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private memberService: MemberService,
    private eventService: EventService,
    private router: Router
  ){
    this.memberId = data?.id;
  }

  ngOnInit(){
    this.refresh();
  }

  refresh(){
    if (!this.memberId) return;
    this.isLoading = true;

    const member$ = this.memberService.getMemberById(this.memberId);
    const memberEvents$ = this.memberService.getMemberEvents(this.memberId);
    const allEvents$ = this.eventService.getAllEvents();

    forkJoin([member$, memberEvents$, allEvents$])
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(([member, memberEvents, allEvents]) => {
        this.memberName = (member as any)?.nom + ' ' + (member as any)?.prenom;
        const assigned = memberEvents ?? [];
        this.dataSource.data = assigned;
        const assignedIds = new Set<number>(assigned.map(a => a.id as any));
        this.availableEvents = (allEvents ?? []).filter(p => !assignedIds.has((p as any).id));
        if (this.selectedExistingEventId && !this.availableEvents.some(p => (p as any).id === this.selectedExistingEventId)) {
          this.selectedExistingEventId = null;
        }
      }, err => console.error('Failed to refresh events', err));
  }

  attachExistingEvent(){
    if (!this.selectedExistingEventId) return;
    const id = String(this.selectedExistingEventId);
    this.isProcessing = true;
    this.memberService.addEventToMember(this.memberId, id)
      .pipe(finalize(() => this.isProcessing = false))
      .subscribe(() => this.refresh());
  }

  gotoEvents(){
    this.dialogRef.close();
    this.router.navigate(['/events']);
  }

  deleteEvent(id: any){
    this.isProcessing = true;
    this.memberService.removeEventFromMember(this.memberId, String(id))
      .pipe(finalize(() => this.isProcessing = false))
      .subscribe(() => this.refresh());
  }

  close(){
    this.dialogRef.close();
  }
}
