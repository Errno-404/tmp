import { Injectable, NgZone } from '@angular/core';
import { User } from './user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs'; 
import { Users } from 'src/app/model/users';
import { UserService } from './user.service';
import { roles } from 'src/app/model/users';

// TODO poprawić

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  userObs: Observable<any> | null;
  constructor(public adb:AngularFireDatabase, public afAuth: AngularFireAuth, public router: Router, public ngZone: NgZone, private userService: UserService) {

    // wstawienie danych zalogowanego użytkownika do localStorage
    this.afAuth.authState.subscribe((user) => {
      if(user){
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      }
      else{
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }

     
    });

    this.userObs = this.afAuth.authState.pipe(switchMap(user =>{
      if(user === null || user === undefined) return of(null);
      return this.adb.object('users/' + user.uid).valueChanges();
    }))

   }

   // funkcja logująca użytkownika
   async SignIn(email: string, password:string){
    try {
       const result = await this.afAuth.signInWithEmailAndPassword(email, password);
       // this.SetUserData(result.user);
       this.afAuth.authState.subscribe((user) => {
         if (user) {
           this.router.navigate(['trip-list']);
         }
       });
     } catch (error) {
       window.alert(error);
     }
   }


   // funkcja rejestrująca nowego użytkownika
   async SignUp(email: string, password: string, name: string){
    try {
       const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
       this.SetUserData(result.user, name);
       result.user?.updateProfile({ displayName: "Test" });
     } catch (error) {
       window.alert(error);
     }
    
   }

   // funkcja pozwalająca na zresetowanie hasła
   async ForgotPassword(passwordResetEmail: string){
    try {
       await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
       window.alert('Password reset email sent, check your inbox');
     } catch (error) {
       window.alert(error);
     }
   }

   // funkcja zwraca informację, czy użytkownik jest zalogowany
   get isLoggedIn():boolean{
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
   }


   // funkcja wstawia do bazy danych
   SetUserData(user: any, name:string){
    const userRef : AngularFireObject<any> = this.adb.object('users/' + user.uid);


    // Podczas rejestracji tworzony jest użytkownik i zapisywany do obiektu users w bazie danych
    const newUser : Users ={
      uid: user.uid,
      username: name,
      role: [roles.Admin],
    }

    
    

    return userRef.set(newUser);
    
   }

   // funkcja wylogowująca użytkownika
   SignOut(){
     this.afAuth.signOut();
     localStorage.removeItem('user');
     this.router.navigate(['sign-in']);
   }

   ChangePersistance(id: string){

    console.log(id);
    let session = "";
    if(id === "0"){
      session = "local";
    }
    else if(id === "1"){
      session = "none";
    }
    else{
      session =  "session";
    }
    this.afAuth.setPersistence(session);
   }

   
}
