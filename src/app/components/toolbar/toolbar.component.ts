import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(public auth: AuthService, private router: Router) { }

  logOut() {
    this.auth.logOut().subscribe(() => {
      this.router.navigate(['']);
    });
  }

}
