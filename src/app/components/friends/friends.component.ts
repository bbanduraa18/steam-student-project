import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FormControl } from "@angular/forms";
import { arrayRemove, arrayUnion } from "@angular/fire/firestore";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  public user: any;
  public friends?: any;
  public allUsers?: any[];
  public searchUser = new FormControl('');
  public searchedUser: any;
  private indexOfUser: number = 0;
  public userDoesntExist: boolean = false;
  public spinner: boolean = false;

  constructor(private auth: AuthService,
              private afStore: AngularFirestore) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.spinner = true
    }, 1000);

    this.auth.getCurrentUser().subscribe(user => {
      this.user = user?.email;
      this.getFriends();
    });
    this.afStore.collection('/friends/').get().subscribe(snapshot => {
      this.allUsers = snapshot.docs.map(doc => doc.data());
    });
  }

  getFriends() {
    this.afStore.collection('/users/').doc(this.user).get().subscribe(snapshot => {
      this.friends = snapshot.data();
      this.friends = this.friends.friends;
    })
  }

  search() {
    this.userDoesntExist = false;
    this.searchedUser = null;
    const search = this.searchUser.value;

    if(search === '') {
      return;
    }

    if(search === this.user) {
      this.userDoesntExist = true;
      this.searchedUser = 'user doesnt exist';
      return;
    }

    this.indexOfUser = this.allUsers!.findIndex((element) => element.email === search);

    if(this.indexOfUser < 0) {
      this.userDoesntExist = true;
      this.searchedUser = 'user doesnt exist';
    } else {
      this.searchedUser = this.allUsers?.[this.indexOfUser];
    }
  }

  cancel() {
    this.userDoesntExist = false;
    this.searchUser.setValue('');
    this.searchedUser = null;
  }

  addFriend(userEmail: string | null) {
    if(this.friends.includes(userEmail)) {
      return;
    }

    this.afStore.collection('/users/').doc(this.user).update({
      friends: arrayUnion(userEmail)
    }).then(() => this.getFriends());
    setTimeout(() => {
      console.log(`'${userEmail}' was added to your friends.`);
      this.searchUser.setValue('');
      this.searchedUser = null;
    }, 500)
  }

  deleteFriend(friend: string) {
    this.afStore.collection('/users/').doc(this.user).update({
      friends: arrayRemove(friend)
    }).then(() => this.getFriends());
    setTimeout(() => {
      console.log(`'${friend}' was removed from your friends.`)
      this.searchUser.setValue('');
      this.searchedUser = null;
    }, 500)
  }

}

