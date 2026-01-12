import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MemberService } from 'src/services/member.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  //1. (1)appeler la methode getAllMembers du service MemberService
  // et attendre le resultat(4)
  // resultat => datasource
  constructor(private memberService: MemberService, private dialog: MatDialog) { }

  dataSource : any[] = [];
  displayedColumns: string[] = ['id', 'cin', 'name', 'type', 'cv', 'createdDate', 'action'];

  ngOnInit(){
    this.memberService.getAllMembers().subscribe((res)=>{
      this.dataSource=res;
    })
  }

  delete(id : string){
    // 1. Lancer la boite
    let dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
      height: '220px',
      width: '300px'
    })
    // 2. Attendre le resultat de user
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        // user clicked yes
        this.memberService.deleteMember(id)
        .subscribe(()=>{
          this.memberService.getAllMembers().subscribe((res)=>{
            this.dataSource=res;
          })
        })
      }
    })
  }  
}
