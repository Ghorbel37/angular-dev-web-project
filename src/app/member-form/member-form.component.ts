import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {

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
      console.log("Valid")
    }
    console.log(this.form)
  }  
}
