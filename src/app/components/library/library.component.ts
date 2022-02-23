import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  public user: any;
  public games?: any;
  public allGames?: any[];
  public localGames: any[] = [];
  private indexesOfGames: number[] = [];
  public spinner: boolean = false;

  constructor(private auth: AuthService,
              private afStore: AngularFirestore) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.spinner = true
    }, 1000);

    this.auth.getCurrentUser().subscribe(user => {
      this.user = user?.email;
      this.getGames();
    });
    this.afStore.collection('/games/').get().subscribe(snapshot => {
      this.allGames = snapshot.docs.map(doc => doc.data());
    });
  }

  getGames() {
    this.afStore.collection('/users/').doc(this.user).get().subscribe(snapshot => {
      this.games = snapshot.data();
      this.games = this.games.games;

      this.indexesOfGames = this.getAllIndexes(this.games, this.allGames);
      for(let i = 0; i < this.indexesOfGames!.length; i++) {
        this.localGames.push(this.allGames![this.indexesOfGames![i]]);
      }
    })
  }

  getAllIndexes(val: [], arr?: any[]) {
    let indexes = [];
    for(let i = 0; i < arr!.length; i++){
      for(let j = 0; j < val.length; j++) {
        if(arr![i].title.includes(val[j])) {
          indexes.push(i);
        }
      }
    }

    return (indexes);
  }

}
