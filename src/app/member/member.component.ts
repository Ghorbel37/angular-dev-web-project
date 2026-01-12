import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MemberService } from 'src/services/member.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Member } from 'src/models/Member';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements AfterViewInit {
  constructor(private memberService: MemberService, private dialog: MatDialog) { }

  dataSource: MatTableDataSource<Member> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'photo', 'cin', 'nom', 'prenom', 'type', 'dateCreated', 'email', 'cv', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadMembers();
  }

  private loadMembers(){
    this.memberService.getAllMembers().subscribe((res)=>{
      // backend provides explicit `type` (e.g., "Enseignant" / "Etudiant"); use it directly and default to 'Membre'
      const mapped = res.map((m: any) => ({ ...m, type: m.type ?? 'Membre' }));
      this.dataSource.data = mapped;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id : string){
    let dialogRef = this.dialog.open(ConfirmDialogComponent, { height: '220px', width: '300px' });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.memberService.deleteMember(id).subscribe(()=>{
          this.loadMembers();
        })
      }
    })
  }  
}
