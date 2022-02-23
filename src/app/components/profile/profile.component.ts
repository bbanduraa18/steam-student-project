import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private currentUsername: string = '';
  private currentAge: number = 0;
  public spinner: boolean = false;

  userInfoForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl({value: '', disabled: true}),
    age: new FormControl('', [Validators.required, Validators.min(16), Validators.max(99), ageValidator(/\D/g)])
  })

  get username() {
    return this.userInfoForm.get('username')?.value;
  }

  get email() {
    return this.userInfoForm.get('email')?.value;
  }

  get age() {
    return this.userInfoForm.get('age')?.value;
  }

  get ageForError() {
    return this.userInfoForm.get('age');
  }

  get usernameForError() {
    return this.userInfoForm.get('username');
  }

  constructor(private auth: AuthService,
              private afStore: AngularFirestore) { }

  ngOnInit() {
    window.addEventListener('keydown', (e) => {
      if(e.key === 'Enter') e.preventDefault()
    });
    window.addEventListener('keyup', (e) => {
      if(e.key === 'Enter') e.preventDefault()
    });
    
    setTimeout(() => {
      this.spinner = true
    }, 1000);

    this.auth.getCurrentUser().subscribe(user => {

      this.afStore.doc('/users/' + user?.email).get().subscribe(snapshot => {
        const userInfo: any = snapshot.data();

        this.currentUsername = userInfo.username;
        this.currentAge = userInfo.age;

        this.userInfoForm.controls['username'].setValue(userInfo.username);
        this.userInfoForm.controls['email'].setValue(userInfo.email);
        this.userInfoForm.controls['age'].setValue(userInfo.age);
      })
    });
  }

  onSubmit() {
    if(this.currentUsername !== this.username && this.currentAge !== this.age) {
      this.afStore.doc('/users/' + this.email).update({
        username: this.username,
        age: this.age
      }).then(() => {
        window.location.reload();
      });
    } else if(this.currentUsername !== this.username) {
      this.afStore.doc('/users/' + this.email).update({
        username: this.username
      }).then(() => {
        window.location.reload();
      });
    } else if (this.currentAge !== this.age) {
      this.afStore.doc('/users/' + this.email).update({
        age: this.age
      }).then(() => {
        window.location.reload();
      });
    }


  }
}
