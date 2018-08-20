import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GeolocProvider } from '../../providers/geoloc/geoloc';
import { Geolocation } from '@ionic-native/geolocation';
import { Prospeccion } from '../../models/prospeccion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

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
               ) 
  {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;      
     console.log(resp.coords);


    }).catch((error) => {
      console.log('Error getting location', error);
    });

    
    

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
    
    console.log(pros);


    let body = JSON.stringify( pros );           
                                           
    console.log(body);


    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.post('http://montecristows.ttsoluciones.com/api/client', body, httpOptions).subscribe(data=>console.log(data), (err)=> console.error("Failed! " + err) );
                                              
     

  }

  ionViewDidLoad() {
    console.log("I'm alive!");
  }

  
}
