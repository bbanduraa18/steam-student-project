import { Component, Input } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  @Input()
  error?: string | null;

  email = new FormControl('', [Validators.required, Validators.email]);
  password =  new FormControl('');

  constructor(private AuthService : AuthService, private route: Router) {
  }

  getErrorMessage() {
    if (this.email.hasError('required') || this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit(): void {
    this.AuthService.signIn(this.email.value, this.password.value)
    this.route.navigate(['/games'])
    console.log('welcome home!');
  }

}
