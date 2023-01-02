import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { Users } from 'src/app/model/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private db: AngularFireDatabase) {
  
  }



  getUserById(uid: string) : Observable<any> {
   return this.db.object('users/' + uid).valueChanges()!;
  }
  
}
