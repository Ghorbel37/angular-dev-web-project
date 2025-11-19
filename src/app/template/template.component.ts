import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {
  constructor(private as: AuthService, private router: Router) { }

  logout() {
    this.as.signOut().then(() => {
      this.router.navigate(['']);
    });
  }
}
