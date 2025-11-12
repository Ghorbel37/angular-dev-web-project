import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {

  //Injection de dependances
  constructor(private memberService: MemberService, private router: Router, private activatedRoute: ActivatedRoute) { }

  //Declaration de form
  form!: FormGroup
  //Initialisation de form
  ngOnInit(){
    // 1. Recuperer la route active
    let idCurrent = this.activatedRoute.snapshot.params['id'];
    // 2. Chercher id
    // 3. Si id existe, appeler la methode getMemberById
    if (idCurrent) {
      this.memberService.getMemberById(idCurrent).subscribe((resMember) => {
        //4. Initialiser le form avec les donnees recuperees
        this.form = new FormGroup({
          cin: new FormControl(resMember.cin, [Validators.required]),
          name: new FormControl(resMember.name),
          cv: new FormControl(resMember.cv),
          type: new FormControl(resMember.type),
          createdDate: new FormControl(resMember.createdDate)
        })
      })
    } else {
      // Else je suis dans create
      this.form = new FormGroup({
        cin: new FormControl(null, [Validators.required]),
        name: new FormControl(null),
        cv: new FormControl(null),
        type: new FormControl(null),
        createdDate: new FormControl(null)
      })
    }
  }
  
  //Sauvegarde des donnees
  sub() {
    if (this.form.valid) {
      let idCurrent = this.activatedRoute.snapshot.params['id'];
      if (idCurrent) {
        this.memberService.updateMember(idCurrent, this.form.value).subscribe(() => {
          this.router.navigate(['']);
        })
      } else {
        this.memberService.saveMember(this.form.value).subscribe(() => {
          this.router.navigate(['']);
        });
      }
    }
  }
}
