import { Component, OnInit} from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http'
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { roles } from 'src/app/model/users';
import { waitForAsync } from '@angular/core/testing';
import { User } from 'firebase/auth';
import { combineLatest, forkJoin, merge, mergeMap, Observable, of, switchMap, tap, map } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-my-container',
  templateUrl: './my-container.component.html',
  styleUrls: ['./my-container.component.css']
})
export class MyContainerComponent  {


  public roleNameColor: Observable<any> | undefined;
  public userData: any;
  
   public userObs: any;
  

  useeer:any;

  constructor(public authService: AuthService,public userService: UserService) {
    // this.userObs = this.authService.userObs;
    if(this.authService.isLoggedIn && this.authService.userObs !== null){
      this.authService.userObs.subscribe(res =>{
        this.userObs = res.role;
      })
    }
    
    }

 
}
