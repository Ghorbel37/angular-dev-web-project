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
  constructor(private memberService: MemberService, private router: Router, private activatedRoute: ActivatedRoute) { }

  form!: FormGroup
  existingPhoto: string | null = null;
  newPhotoSelected: boolean = false

  get previewPhotoUrl(): string | null {
    const b64 = this.form?.get('photo')?.value ?? this.existingPhoto;
    return b64 ? 'data:image/*;base64,' + b64 : null;
  }

  ngOnInit(){
    const idCurrent = this.activatedRoute.snapshot.params['id'];

    // initialize default form (create mode)
    this.form = new FormGroup({
      type: new FormControl(null, [Validators.required]),
      cin: new FormControl(null, [Validators.required]),
      nom: new FormControl(null, [Validators.required]),
      prenom: new FormControl(null),
      dateCreated: new FormControl(null),
      photo: new FormControl(null),
      cv: new FormControl(null),
      email: new FormControl(null, [Validators.email]),
      password: new FormControl(null),

      // enseignant fields
      grade: new FormControl(null),
      etablissement: new FormControl(null),

      // etudiant fields
      dateInscription: new FormControl(null),
      diplome: new FormControl(null)
    });

    if (idCurrent) {
      this.memberService.getMemberById(idCurrent).subscribe((resMember) => {
        const detectedType: string = resMember.type ?? 'Etudiant';

        // populate form with existing values
        this.form.patchValue({
          type: detectedType,
          cin: resMember.cin,
          nom: resMember.nom,
          prenom: resMember.prenom,
          dateCreated: resMember.dateCreated ? new Date(resMember.dateCreated) : null,
          cv: resMember.cv,
          email: resMember.email
        });

          // save existing photo for preview and to avoid overwriting it unless user selects a new image
          this.existingPhoto = resMember.photo ?? null;
        this.form.get('type')?.disable();
      });
    }
  }
  
  onFileChange(event: any){
    const file = event.target.files && event.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = () => {
        // Remove data:*/*;base64 prefix
        const base64 = (reader.result as string).split(',')[1];
        this.form.patchValue({ photo: base64 });
        this.newPhotoSelected = true;
      }
      reader.readAsDataURL(file);
    }
  }

  removeSelectedPhoto(){
    // Clear newly selected photo, revert preview to existingPhoto if available
    this.form.patchValue({ photo: null });
    this.newPhotoSelected = false;
  }

  sub() {
    if (this.form.valid) {
      let idCurrent = this.activatedRoute.snapshot.params['id'];
      // Prepare payload
      const payload: any = { ...this.form.value };

      // convert Date to ISO string if present
      if (payload.dateCreated instanceof Date) payload.dateCreated = payload.dateCreated.toISOString().split('T')[0];
      if (payload.dateInscription instanceof Date) payload.dateInscription = payload.dateInscription.toISOString().split('T')[0];


      // Ensure disabled 'type' is included (disabled controls are not in form.value)
      payload.type = payload.type ?? this.form.get('type')?.value;

      // Only keep relevant subtype fields for clarity (case-insensitive)
      const t = (payload.type || '').toLowerCase();
      if (t === 'enseignant') {
        delete payload.dateInscription;
        delete payload.diplome;
      } else if (t === 'etudiant') {
        delete payload.grade;
        delete payload.etablissement;
      }

      // Photo handling: only change photo when user selected a new one.
      if (idCurrent) {
        // update: include photo only if user selected a new image; otherwise omit so backend keeps existing
        if (this.newPhotoSelected) {
          payload.photo = this.form.get('photo')?.value;
        } else {
          delete payload.photo;
        }
      } else {
        // create: include photo only if present
        if (this.form.get('photo')?.value) payload.photo = this.form.get('photo')?.value;
        else delete payload.photo;
      }

      // On update, don't send empty password
      if (idCurrent && !payload.password) delete payload.password;

      if (idCurrent) {
        this.memberService.updateMember(idCurrent, payload).subscribe(() => {
          this.router.navigate(['members']);
        })
      } else {
        this.memberService.saveMember(payload).subscribe(() => {
          this.router.navigate(['members']);
        });
      }
    }
  }
}
