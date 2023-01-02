import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// routing
import { AppRoutingModule } from './app-routing.module';

// myComponents
import { AppComponent } from './app.component';
import { MyContainerComponent } from './components/my-container/my-container.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { AddTripComponent } from './components/add-trip/add-trip.component';
import { HomeComponent } from './components/home/home.component';

// firebase and auth
import { AngularFireModule } from '@angular/fire/compat/'
import { AngularFireDatabaseModule} from '@angular/fire/compat/database'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AdminComponent } from './components/admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'

@NgModule({
  declarations: [
    AppComponent,
    MyContainerComponent,
    TripListComponent,
    AddTripComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    AdminComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [MyContainerComponent]
})
export class AppModule { }
