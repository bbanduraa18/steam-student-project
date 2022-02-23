import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'steam-student-project';

  ngOnInit() {
    window.addEventListener('keydown', (e) => {
      if(e.key === 'Enter') e.preventDefault()
    });
    window.addEventListener('keyup', (e) => {
      if(e.key === 'Enter') e.preventDefault()
    });
  }
}
