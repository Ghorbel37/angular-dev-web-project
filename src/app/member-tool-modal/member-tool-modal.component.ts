import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MemberService } from 'src/services/member.service';
import { Tool } from 'src/models/Tool';
import { MatTableDataSource } from '@angular/material/table';
import { ToolService } from 'src/services/tool.service';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-member-tool-modal',
  templateUrl: './member-tool-modal.component.html',
  styleUrls: ['./member-tool-modal.component.css']
})
export class MemberToolModalComponent implements OnInit {
  memberId!: string;
  memberName: string = '';
  dataSource: MatTableDataSource<Tool> = new MatTableDataSource();
  displayedColumns: string[] = ['source','date','action'];

  // existing tools palette
  availableTools: Tool[] = [];
  selectedExistingToolId: number | null = null;

  // UI flags
  isLoading = false;
  isProcessing = false;

  constructor(
    private dialogRef: MatDialogRef<MemberToolModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private memberService: MemberService,
    private toolService: ToolService,
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
    const memberTools$ = this.memberService.getMemberTools(this.memberId);
    const allTools$ = this.toolService.getAllTools();

    forkJoin([member$, memberTools$, allTools$])
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(([member, memberTools, allTools]) => {
        this.memberName = (member as any)?.nom + ' ' + (member as any)?.prenom;
        const assigned = memberTools ?? [];
        this.dataSource.data = assigned;
        const assignedIds = new Set<number>(assigned.map(a => a.id as any));
        this.availableTools = (allTools ?? []).filter(p => !assignedIds.has((p as any).id));
        if (this.selectedExistingToolId && !this.availableTools.some(p => (p as any).id === this.selectedExistingToolId)) {
          this.selectedExistingToolId = null;
        }
      }, err => console.error('Failed to refresh tools', err));
  }

  attachExistingTool(){
    if (!this.selectedExistingToolId) return;
    const id = String(this.selectedExistingToolId);
    this.isProcessing = true;
    this.memberService.addToolToMember(this.memberId, id)
      .pipe(finalize(() => this.isProcessing = false))
      .subscribe(() => this.refresh());
  }

  gotoTools(){
    this.dialogRef.close();
    this.router.navigate(['/tools']);
  }

  deleteTool(id: any){
    this.isProcessing = true;
    this.memberService.removeToolFromMember(this.memberId, String(id))
      .pipe(finalize(() => this.isProcessing = false))
      .subscribe(() => this.refresh());
  }

  close(){
    this.dialogRef.close();
  }
}
