import { Component } from '@angular/core';
import { share } from 'rxjs';
import { TripsDataService } from '../../shared/services/trips-data.service';
import { Trip } from '../../model/trip';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})

export class TripListComponent {






  // To zostaje na pewno

  trips;
  tripsJson: Trip[] = [];
  countOfTrips = 0;
  available: number[] = [];
  minPrice = 0;
  maxPrice = 0;
  reservationCount = 0;

  // END


  formOpened = false;


  formName = '';
  formCountry = '';
  formStartDate = '';
  formEndDate = '';
  formPrice = 0;
  formCapacity = 0;
  formDescription = '';
  formImage = '';


  constructor(private tripService: TripsDataService) {

    this.trips = this.tripService.getTrips().pipe(share());

    this.trips.subscribe(res => {
      this.tripsJson = res;
      this.countOfTrips = res.length;
      this.available = new Array<number>(this.countOfTrips);

      for (let i = 0; i < this.countOfTrips; i++) {
        this.available[i] = res[i].available;
      }

      this.findMinPrice();
      this.findMaxPrice();



    });

  }


  findMinPrice() {

    this.minPrice = this.tripsJson[0].price;
    for (let i = 0; i < this.countOfTrips; i++) {
      if (this.tripsJson[i].price < this.minPrice) {
        this.minPrice = this.tripsJson[i].price;
      }
    }
  }

  findMaxPrice() {
    this.maxPrice = this.tripsJson[0].price;
    for (let i = 0; i < this.countOfTrips; i++) {
      if (this.tripsJson[i].price > this.maxPrice) {
        this.maxPrice = this.tripsJson[i].price;
      }
    }
  }


  // ------------------------------------------------------ OK -----------------------------------------------------------

  reserve(tripNo: number) {
    if (this.available[tripNo] > 0) {
      this.available[tripNo]--;
      this.reservationCount++;
    }
  }

  resign(tripNo: number) {
    if (this.available[tripNo] < this.tripsJson[tripNo].capacity) {
      this.available[tripNo]++;
      this.reservationCount--;
    }
  }

  // ------------------------------------------------------ OK -----------------------------------------------------------


  removeTrip(item: Trip, tripNo: number) {
    this.reservationCount = this.reservationCount - (this.tripsJson[tripNo].capacity - this.available[tripNo])
    this.tripService.removeTrip(item.key);
    this.findMinPrice();
    this.findMaxPrice();
    this.available.splice(tripNo, 1);
  }

  openForm() {
    this.formOpened = !this.formOpened;
  }

  
  

}
