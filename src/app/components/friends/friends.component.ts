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

  public allUsers?: any[];
  public friends?: any;
  public indexOfUser: number = 0;
  public user: any;
  public searchUser = new FormControl('');

  constructor(private auth: AuthService,
              private afStore: AngularFirestore) {
  }

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe(user => {
      this.user = user?.email;
      this.getFriends();
    });
    this.afStore.collection('/friends/').get().subscribe(snapshot => {
      this.allUsers = snapshot.docs.map(doc => doc.data());
      console.log(this.allUsers)
    });
  }

  getFriends() {
    this.afStore.collection('/users/').doc(this.user).get().subscribe(snapshot => {
      this.friends = snapshot.data();
      this.friends = this.friends.friends;
    })
  }

  searchUsers() {
    const search = this.searchUser.value;
    this.indexOfUser = this.allUsers!.findIndex((element) => element.email === search);
  }

  addFriend(userEmail: string | null) {
    if(this.friends.includes(userEmail)) {
      return null;
    }

    this.afStore.collection('/users/').doc(this.user).update({
      friends: arrayUnion(userEmail)
    }).then(() => console.log(`'${userEmail}' was added to your friends.`))
    this.getFriends();
    return;
  }

  deleteFriend(friend: string) {
    this.afStore.collection('/users/').doc(this.user).update({
      friends: arrayRemove(friend)
    }).then(() => console.log(`'${friend}' was removed from your friends.`));
    this.getFriends();
  }

}

