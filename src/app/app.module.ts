import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { environment } from "../environments/environment";
import { AuthService } from "./services/auth.service";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FriendsComponent } from './components/friends/friends.component';
import { GamesComponent } from './components/games/games.component';
import { LibraryComponent } from './components/library/library.component';
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { HotToastModule } from '@ngneat/hot-toast';
import { MatCardModule } from "@angular/material/card";
import { MatSliderModule } from "@angular/material/slider";
import { MatCheckboxModule } from "@angular/material/checkbox";

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SignInComponent,
    SignUpComponent,
    ProfileComponent,
    FriendsComponent,
    GamesComponent,
    LibraryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSliderModule,
    MatCheckboxModule,
    HotToastModule.forRoot(),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
