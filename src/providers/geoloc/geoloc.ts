
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class GeolocProvider {
  public lati:number;
  public longi:number;

  constructor(public geolocation : Geolocation) 
  {
    //console.log('Hello GeolocProvider Provider');
    this.GetCoordinates();
  }

  GetCoordinates()
  {
    this.geolocation.getCurrentPosition().then((resp) => {
       this.lati = resp.coords.latitude;
       this.longi = resp.coords.longitude;
      console.log(resp.coords);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  public GetLatitude() : number
  {
    
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp.coords);
      this.lati = resp.coords.latitude;
     }).catch((error) => {
       console.log('Error getting location', error);
       return this.lati;
     });

     return this.lati;
  }

  public GetLongitude() : number
  {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp.coords);
      return resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
       return 0;
     });

     return 0;
  }
}
