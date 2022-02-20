import { Injectable } from '@angular/core';
import {Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, authState} from "@angular/fire/auth";
import { from } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn: boolean;
  currentUser$ = authState(this.auth)

  constructor(private auth: Auth) {
    this.isLoggedIn = false;
  }

  signIn(email: string, password: string) {
    this.isLoggedIn = true;
    return from(signInWithEmailAndPassword(this.auth, email, password))
  }

  logOut() {
    return from(this.auth.signOut());
  }

}
