import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  public friends?: any[];
  public searchUser = new FormControl('');

  constructor(private auth: AuthService,
              private afStore: AngularFirestore) {
  }

  ngOnInit(): void {
    this.getFriends()
  }

  getFriends() {
    this.auth.getCurrentUser().subscribe(user => {

      this.afStore.collection('/users/' + user?.email + '/friends/').get().subscribe(snapshot => {
        this.friends = snapshot.docs.map(doc => doc.data());
        console.log(this.friends)
      })
    });
  }

  addFriend() {
    this.auth.getCurrentUser().subscribe(user => {
      console.log(this.searchUser.value)

      this.afStore.doc('/users/' + user?.email + '/friends/' + this.searchUser.value).set({
        email: this.searchUser.value
      })
      this.getFriends()
    })
  }

}

