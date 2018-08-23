import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GeolocProvider } from '../../providers/geoloc/geoloc';
import { Geolocation } from '@ionic-native/geolocation';
import { Prospeccion } from '../../models/prospeccion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public UserId: string;
  public lat: number;
  public lng: number;
  public FirstName: string;
  public LastName: string;
  public LegalName: string;
  public Address: string;
  public Phone: string;
  public Mobile: string;
  public Email: string;
  public ClientObservation: string;
  public VisitObservation: string;
  public NextVisitDate: Date;
  public NextVisitObservation: string;

  public pros: Prospeccion;

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

  Save()
  {

    let pros=new Prospeccion();
    pros.FirstName=this.FirstName;
    pros.LastName=this.LastName;
    pros.LegalName=this.LegalName;
    pros.Address=this.Address;
    pros.Phone=this.Phone;
    pros.Mobile=this.Mobile;
    pros.Email=this.Email;             
    pros.Latitude=this.lat;
    pros.Longitude=this.lng;
    pros.ClientObservation=this.ClientObservation;
    pros.VisitObservation=this.VisitObservation;
    pros.NextVisitDate=this.NextVisitDate;
    pros.NextVisitObservation=this.NextVisitObservation;
    pros.UserId=1;

    if(this.platform.is('cordova'))
    {
      this.storage.get('userId').then(val=>
        {
          if(val)
          {
            pros.UserId=val;
          }
          else
          {
            pros.UserId=0;
          }
        })
    }
    
    console.log(pros);


    let body = JSON.stringify( pros );           
                                           
    console.log(body);


    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.post('http://montecristows.ttsoluciones.com/api/client', body, httpOptions).subscribe(data=>this.showSuccesAlert(), 
                                                                                                    (err)=>this.showErrorAlert(err));
                                              
     this.FirstName="";
     this.LastName="";
     this.LegalName="";
     this.Address="";

  }

  ionViewDidLoad() {
    console.log("I'm alive!");
  }

  
}
