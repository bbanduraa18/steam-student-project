import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FormControl } from "@angular/forms";
import {arrayUnion} from "@angular/fire/firestore";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  public user: any;
  public games?: any;
  public allGames?: any[];
  public searchGame = new FormControl('');
  public searchedGame: any;
  private indexOfGame: number = 0;
  public gameDoesntExist: boolean = false;
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
    })
  }

  search() {
    this.gameDoesntExist = false;
    this.searchedGame = null;
    const search = this.searchGame.value;

    if(search === '') {
      return;
    }

    this.indexOfGame = this.allGames!.findIndex((element) => element.title === search);

    if(this.indexOfGame < 0) {
      this.gameDoesntExist = true;
      this.searchedGame = 'user doesnt exist';
    } else {
      this.searchedGame = this.allGames?.[this.indexOfGame];
    }
  }

  cancel() {
    this.gameDoesntExist = false;
    this.searchGame.setValue('');
    this.searchedGame = null;
  }

  addGame(gameTitle: string | null) {
    if(this.games.includes(gameTitle)) {
      return;
    }

    this.afStore.collection('/users/').doc(this.user).update({
      games: arrayUnion(gameTitle)
    }).then(() => this.getGames());
    setTimeout(() => {
      console.log(`'${gameTitle}' was added to your library.`);
      this.searchGame.setValue('');
      this.searchedGame = null;
    }, 500)
  }

}
