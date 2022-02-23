import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  public spinner: boolean = false;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.spinner = true
    }, 1000)
  }

}
