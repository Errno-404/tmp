import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth-service.service';
interface Persistance{
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})



export class AdminComponent {

  constructor(public authService:AuthService){

  }

  persistance: Persistance[] = [
    {value: 0, viewValue: 'Local'},
    {value: 1, viewValue: 'None'},
    {value: 2, viewValue: 'Session'},
  ];


  public option = "Local";

}
