import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MemberService } from 'src/services/member.service';
import { Publication } from 'src/models/Publication';
import { MatTableDataSource } from '@angular/material/table';
import { PublicationService } from 'src/services/publication.service';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-member-publications-modal',
  templateUrl: './member-publications-modal.component.html',
  styleUrls: ['./member-publications-modal.component.css']
})
export class MemberPublicationsModalComponent implements OnInit {
  memberId!: string;
  memberName: string = '';
  dataSource: MatTableDataSource<Publication> = new MatTableDataSource();
  displayedColumns: string[] = ['titre','type','dateApparition','action'];

  // existing publications palette
  availablePublications: Publication[] = [];
  selectedExistingPublicationId: number | null = null;

  // UI flags
  isLoading = false;      // when fetching lists
  isProcessing = false;   // when attach/remove is in-flight

  constructor(
    private dialogRef: MatDialogRef<MemberPublicationsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private memberService: MemberService,
    private publicationService: PublicationService,
    private router: Router
  ){
    this.memberId = data?.id;
  }

  ngOnInit(){
    this.refresh();
  }

  /**
   * Atomic refresh: fetch member (for name), member publications and all publications
   * in a single combined request; update both lists together to avoid transient mismatch.
   */
  refresh(){
    if (!this.memberId) return;
    this.isLoading = true;

    const member$ = this.memberService.getMemberById(this.memberId);
    const memberPubs$ = this.memberService.getMemberPublications(this.memberId);
    const allPubs$ = this.publicationService.getAllPublications();

    forkJoin([member$, memberPubs$, allPubs$])
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(([member, memberPubs, allPubs]) => {
        this.memberName = (member as any)?.nom + ' ' + (member as any)?.prenom;
        const assigned = memberPubs ?? [];
        this.dataSource.data = assigned;
        // compute available as allPubs minus assigned
        const assignedIds = new Set<number>(assigned.map(a => a.id));
        this.availablePublications = (allPubs ?? []).filter(p => !assignedIds.has(p.id));
        // reset selection if not available
        if (this.selectedExistingPublicationId && !this.availablePublications.some(p => p.id === this.selectedExistingPublicationId)) {
          this.selectedExistingPublicationId = null;
        }
      }, err => {
        console.error('Failed to refresh publications', err);
      });
  }

  attachExistingPublication(){
    if (!this.selectedExistingPublicationId) return;
    const pubId = String(this.selectedExistingPublicationId);
    this.isProcessing = true;
    this.memberService.addPublicationToMember(this.memberId, pubId)
      .pipe(finalize(() => this.isProcessing = false))
      .subscribe(() => {
        // atomic refresh after server confirms
        this.refresh();
      });
  }

  // Redirect to articles list for creating/managing publications
  gotoArticles(){
    this.dialogRef.close();
    this.router.navigate(['/articles']);
  }

  deletePublication(id: any){
    this.isProcessing = true;
    this.memberService.removePublicationFromMember(this.memberId, String(id))
      .pipe(finalize(() => this.isProcessing = false))
      .subscribe(() => {
        // atomic refresh after removal
        this.refresh();
      });
  }

  close(){
    this.dialogRef.close();
  }
}

