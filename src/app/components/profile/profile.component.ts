import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userInfoForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl({value: '', disabled: true}),
    age: new FormControl('', Validators.required)
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

  constructor(private auth: AuthService,
              private afStore: AngularFirestore) { }

  ngOnInit() {
    this.auth.getCurrentUser().subscribe(user => {

      this.afStore.doc('/users/' + user?.email).get().subscribe(snapshot => {
        const userInfo: any = snapshot.data();

        this.userInfoForm.controls['username'].setValue(userInfo.username);
        this.userInfoForm.controls['email'].setValue(userInfo.email);
        this.userInfoForm.controls['age'].setValue(userInfo.age);
      })
    })
  }

  getErrorMessage() {
    if (this.username?.hasError('required') || this.age?.hasError('required')) {
      return 'You must enter a value';
    }

    return;
  }

  onSubmit() {
    this.afStore.doc('/users/' + this.email).update({
      username: this.username,
      age: this.age
    })
  }
}
