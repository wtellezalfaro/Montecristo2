import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GeolocProvider } from '../../providers/geoloc/geoloc';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public lat: number;
  public lng: number;

  constructor(public navCtrl: NavController,
              private geolocation : Geolocation) 
  {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
     console.log(resp.coords);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  ionViewDidLoad() {
    console.log("I'm alive!");
  }

  
}
