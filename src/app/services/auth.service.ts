import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  authState,
  updateProfile
} from "@angular/fire/auth";
import {from, switchMap} from "rxjs";

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

  sighUp(username: string, email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(({ user }) => updateProfile(user, { displayName: username }))
    )
  }

  logOut() {
    return from(this.auth.signOut());
  }

}
