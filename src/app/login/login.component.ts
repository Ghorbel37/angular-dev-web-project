import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router : Router) { }

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  login() {
    this.authService.signInWithEmailAndPassword(this.email, this.password).then(() => {
      this.router.navigate(['/member']);
      this.errorMessage = '';
    }).catch((error) => {
      this.errorMessage = error.message;
    });
  }
}
