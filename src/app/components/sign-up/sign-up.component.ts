import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { HotToastService } from "@ngneat/hot-toast";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/compat/firestore";

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if(password && confirmPassword && password !== confirmPassword) {
      return {
        passwordsDontMatch: true
      }
    }

    return null;
  };
}
export function ageValidator(reg: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if(reg.test(control.value)) {
      return {
        ageIsNotDigits: true
      }
    }

    return null
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signUpForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email ,Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', Validators.required),
    age: new FormControl('', [Validators.required, Validators.min(16), Validators.max(99), ageValidator(/\D/g)])
  }, { validators: passwordMatchValidator() })

  constructor(private auth: AuthService,
              private toast: HotToastService,
              private router: Router,
              private firestore: AngularFirestore) { }

  get username() {
    return this.signUpForm.get('username');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get age() {
    return this.signUpForm.get('age');
  }

  getErrorMessage() {
    if (this.email?.hasError('required')
      || this.password?.hasError('required')
      || this.username?.hasError('required')
      || this.confirmPassword?.hasError('required')
      || this.age?.hasError('required')) {

        return 'You must enter a value';

    }

    return this.email?.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    if(this.signUpForm.valid) {
      const { username, email, password, age } = this.signUpForm.value;

      this.firestore.doc('/users/' + email).set({
          email: email,
          friends: [],
          games: [],
          password: password,
          username: username,
          age: age
        })

      this.firestore.doc('/friends/' + email).set({
        email: email,
        username: username
      })

      this.auth.sighUp(username, email, password).pipe(
        this.toast.observe({
          success: 'Congrats! You are all signed up!',
          loading: 'Signing in',
          error: ({ message }) => `${message}`
        })
      ).subscribe(() => {
        this.router.navigate(['/profile']);
      });
    }
  }

}
