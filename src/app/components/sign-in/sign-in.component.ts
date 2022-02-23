import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { HotToastService } from "@ngneat/hot-toast";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public spinner: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  constructor(private auth: AuthService,
              private router: Router,
              private toast: HotToastService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.spinner = true
    }, 1000)
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
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
