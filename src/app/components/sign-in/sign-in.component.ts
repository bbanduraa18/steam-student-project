import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { HotToastService } from "@ngneat/hot-toast";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private auth: AuthService,
              private router: Router,
              private toast: HotToastService) {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  getErrorMessage() {
    if (this.email?.hasError('required') || this.password?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email?.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    if(this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.auth.signIn(email, password).pipe(
        this.toast.observe({
          success: 'Logged in successfully',
          loading: 'Logging in...',
          error: ({ message }) => `${message}`
        })
      )
        .subscribe(() => {
        this.router.navigate(['/profile']);
      })
    }
  }

}
