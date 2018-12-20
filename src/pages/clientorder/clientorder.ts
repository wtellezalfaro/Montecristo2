import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeolocProvider } from '../../providers/geoloc/geoloc';
import { Geolocation } from '@ionic-native/geolocation';
import {Observable} from 'rxjs/Observable';
import { Platform } from 'ionic-angular';
/**
 * Generated class for the ClientorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clientorder',
  templateUrl: 'clientorder.html',
})
export class ClientorderPage {
  public lat: number;
  public lng: number;
  item: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) 
  {
    this.item = navParams.get('item');
    this.lat = this.item.ClientLatitude;
    this.lng = this.item.ClientLongitude;

    //console.log(this.lat);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ClientorderPage');
  }

}
