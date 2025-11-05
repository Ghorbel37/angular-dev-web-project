import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  //1. (1)appeler la methode getAllMembers du service MemberService
  // et attendre le resultat(4)
  // resultat => datasource
  constructor(private memberService: MemberService) { }

  dataSource : any[] = [];

  ngOnInit(){
    this.memberService.getAllMembers().subscribe((res)=>{
      this.dataSource=res;
    })
  }
  
}
