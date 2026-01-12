import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token$ = new BehaviorSubject<string | null>(localStorage.getItem('auth_token'));
  tokenChanges = this.token$.asObservable();

  constructor(private afAuth: AngularFireAuth) {
    // keep token in sync with Firebase Auth state
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        user.getIdToken().then(token => {
          localStorage.setItem('auth_token', token);
          this.token$.next(token);
        }).catch(() => {
          localStorage.removeItem('auth_token');
          this.token$.next(null);
        });
      } else {
        localStorage.removeItem('auth_token');
        this.token$.next(null);
      }
    });
  }

  signInWithEmailAndPassword(email: string, password: string) {
    // return a promise same as before but also store token
    return this.afAuth.signInWithEmailAndPassword(email, password).then(async cred => {
      if (cred.user) {
        const token = await cred.user.getIdToken();
        localStorage.setItem('auth_token', token);
        this.token$.next(token);
      }
      return cred;
    });
  }

  getToken(): string | null {
    return this.token$.value;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  signOut() {
    // clear token locally and sign out
    localStorage.removeItem('auth_token');
    this.token$.next(null);
    return this.afAuth.signOut();
  }
}
