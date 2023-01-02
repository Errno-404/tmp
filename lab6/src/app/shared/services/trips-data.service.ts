import { Injectable } from '@angular/core';
// import tripsData from '../../assets/trips.json';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Trip } from '../../model/trip'

@Injectable({
  providedIn: 'root'
})
export class TripsDataService {

  tripsRef: AngularFireList<any>;

  // remember to use async pipe!!
  trips: Observable<Trip[]>;


  constructor(db: AngularFireDatabase) {
    this.tripsRef = db.list('trips');
    this.trips = this.tripsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    )

  }

  getTrips() {
    return this.trips;
  }

  // must receive Trip type!
  addTrip(trip: Trip) {
    this.tripsRef.push(trip);
  }

  // must receive key of type string and Trip type!
  updateTrip(key: string, trip: Trip) {
    this.tripsRef.update(key, trip);
  }

  // must receive key of type string!
  removeTrip(key: string) {
    this.tripsRef.remove(key);
  }
}
