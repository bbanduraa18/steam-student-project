import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn: boolean;

  constructor(private AngularFireAuth: AngularFireAuth) {
    this.isLoggedIn = false;
  }

  signIn(email: string, password: string) {
    this.AngularFireAuth.signInWithEmailAndPassword(email, password)
      .then(r => console.log(r));

    this.isLoggedIn = true;
  }

  signUp(email: string, password: string) {
    this.AngularFireAuth.createUserWithEmailAndPassword(email, password)
      .then(r => console.log(r))
  }

}
