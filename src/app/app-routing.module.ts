import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GamesComponent } from "./components/games/games.component";
import { FriendsComponent } from "./components/friends/friends.component";
import { LibraryComponent } from "./components/library/library.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { canActivate ,redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/auth-guard";

const redirectToLogin = () => redirectUnauthorizedTo(['signin']);
const redirectToProfile = () => redirectLoggedInTo(['profile'])

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'games', component: GamesComponent, ...canActivate(redirectToLogin) },
  { path: 'signin', component: SignInComponent, ...canActivate(redirectToProfile) },
  { path: 'signup', component: SignUpComponent, ...canActivate(redirectToProfile) },
  { path: 'library', component: LibraryComponent, ...canActivate(redirectToLogin) },
  { path: 'friends', component: FriendsComponent, ...canActivate(redirectToLogin) },
  { path: 'profile', component: ProfileComponent, ...canActivate(redirectToLogin) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
