import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GeolocProvider } from '../../providers/geoloc/geoloc';
import { Geolocation } from '@ionic-native/geolocation';
import { Prospeccion } from '../../models/prospeccion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the AssistancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-assistance',
  templateUrl: 'assistance.html'
})
export class AssistancePage {
  public UserId: string;
  public lat: number;
  public lng: number;

  constructor(public navCtrl: NavController,
              private geolocation: Geolocation,
              public http:HttpClient,  
              public alertCtrl: AlertController,
              public storage:Storage,
              private platform:Platform     
            )
  {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;      
     console.log(resp.coords);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    
    if(this.platform.is('cordova'))
    {
      this.storage.get('userId').then(val=>
        {
          if(val)
          {
            this.UserId=val;
          }
          else
          {
            this.UserId='0';
          }
        })
    }
    else
    {
      this.UserId='1';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssistancePage');
  }

  Save()
  {

    console.log(this.UserId);


    let body = JSON.stringify( this.UserId );           
                                           
    console.log(body);


    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.post('http://montecristows.ttsoluciones.com/api/employeemarkup', body, httpOptions).subscribe(data=>this.showSuccesAlert(), 
                                                                                                    (err)=>this.showErrorAlert(err));
  }

  showSuccesAlert() {
    const alert = this.alertCtrl.create({
      title: 'Registro Insertado!',
      subTitle: 'La prospección fue registrada Exitosamente!',
      buttons: ['OK']
    });
    alert.present();
  }

  showErrorAlert(error: string) {
    const alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: error,
      buttons: ['OK']
    });
    alert.present();
  }


}
