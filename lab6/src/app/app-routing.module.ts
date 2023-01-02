import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTripComponent } from './components/add-trip/add-trip.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import {AuthGuard} from './shared/guard/auth.guard';
import { AdminGuard } from './shared/guard/admin.guard';
const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'sign-in', component: SignInComponent},
  { path: 'home', component: HomeComponent},
  { path: 'trip-list', component: TripListComponent},
  { path: 'add-trip', component: AddTripComponent},
  {path:'admin', component: AdminComponent, canActivate: [AdminGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
