import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  public spinner: boolean = false;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.spinner = true
    }, 1000)
  }

}
