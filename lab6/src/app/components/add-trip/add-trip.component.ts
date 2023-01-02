import { Component, EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Trip } from '../../model/trip';
import { TripsDataService } from '../../shared/services/trips-data.service';
@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent {

  constructor(private tripService: TripsDataService){}

  addTrip(form:NgForm){
    let newTrip:Trip = form.value;
    newTrip.available = newTrip.capacity;
    this.tripService.addTrip(newTrip);
    form.reset();
  }
}
