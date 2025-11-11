import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {

  //Injection de dependances
  constructor(private memberService: MemberService, private router: Router) { }

  //Declaration de form
  form!: FormGroup
  //Initialisation de form
  ngOnInit(){
    this.form= new FormGroup({
      cin: new FormControl(null, [Validators.required]),
      name: new FormControl(null),
      cv: new FormControl(null),
      type: new FormControl(null),
      createdDate: new FormControl(null)
    })
  }
  //Recuperation des donnees
  sub() {
    if (this.form.valid){
      this.memberService.saveMember(this.form.value)
      .subscribe(()=> {
        this.router.navigate(['']);
      });
    }
  }  
}
