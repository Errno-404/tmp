import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth-service.service';
import { UserService } from '../services/user.service';
import { roles } from 'src/app/model/users';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authservice: AuthService, private userService: UserService, private Router:Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(parseInt( state.url.charAt(15)) === roles.Admin)return true;
    return false;
      
}



}
