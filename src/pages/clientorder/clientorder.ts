import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeolocProvider } from '../../providers/geoloc/geoloc';
import { Geolocation } from '@ionic-native/geolocation';
import {Observable} from 'rxjs/Observable';
import { Platform } from 'ionic-angular';
import { SERVICES_URL } from "../../config/url.services";
import { ClientvisitPage } from '../clientvisit/clientvisit'
import { Visita } from '../../models/visita';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

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
  public currentlat: number;
  public currentlng: number;
  public UserId: string;
  item: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private geolocation: Geolocation,
              public storage:Storage,
              private platform:Platform,
              public alertCtrl: AlertController,
              public http:HttpClient) 
  {
    this.item = navParams.get('item');
    this.lat = this.item.ClientLatitude;
    this.lng = this.item.ClientLongitude;

    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentlat = resp.coords.latitude;
      this.currentlng = resp.coords.longitude;      
     //console.log(resp.coords);
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

    //console.log(this.lat);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ClientorderPage'); 
  }

  UpdateClient()
  {
    //console.log(item);
    this.navCtrl.push( ClientvisitPage, {item: this.item.ClientId} );
  }

  Delivered()
  {
    let visita=new Visita();
    visita.ClientId=this.item.ClientId;
    visita.FirstName='';
    visita.LastName='';
    visita.LegalName='';
    visita.Address='';
    visita.Phone='';
    visita.Mobile='';
    visita.Email='';             
    visita.Latitude=this.currentlat;
    visita.Longitude=this.currentlng;
    visita.ClientObservation='';
    visita.VisitObservation='ENTREGADO';
    //visita.NextVisitDate='';
    //visita.NextVisitObservation=this.NextVisitObservation;
    visita.UserId=parseInt(this.UserId);
    //visita.OrderDeliveryDate = this.OrderDeliveryDate;
    //visita.items=this.shoppingcartService.items;
    
    console.log(visita);


    let body = JSON.stringify( visita );           
                                           
    console.log(body);


    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.post(`${ SERVICES_URL }`+'/Order/Delivery', body, httpOptions).subscribe(data=>this.showSuccesAlert(), 
                                                                                                    (err)=>this.showErrorAlert(err));
                                                   

     this.navCtrl.pop();
  }

  NotDelivered()
  {
    let visita=new Visita();
    visita.ClientId=this.item.ClientId;
    visita.FirstName='';
    visita.LastName='';
    visita.LegalName='';
    visita.Address='';
    visita.Phone='';
    visita.Mobile='';
    visita.Email='';             
    visita.Latitude=this.currentlat;
    visita.Longitude=this.currentlng;
    visita.ClientObservation='';
    visita.VisitObservation='NO ENTREGADO';
    //visita.NextVisitDate='';
    //visita.NextVisitObservation=this.NextVisitObservation;
    visita.UserId=parseInt(this.UserId);
    //visita.OrderDeliveryDate = this.OrderDeliveryDate;
    //visita.items=this.shoppingcartService.items;
    
    console.log(visita);


    let body = JSON.stringify( visita );           
                                           
    console.log(body);


    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.post(`${ SERVICES_URL }`+'/Order/Delivery', body, httpOptions).subscribe(data=>this.showSuccesAlert(), 
                                                                                                    (err)=>this.showErrorAlert(err));
                                                   

     this.navCtrl.pop();
  }

  Lagged()
  {
    let visita=new Visita();
    visita.ClientId=this.item.ClientId;
    visita.FirstName='';
    visita.LastName='';
    visita.LegalName='';
    visita.Address='';
    visita.Phone='';
    visita.Mobile='';
    visita.Email='';             
    visita.Latitude=this.currentlat;
    visita.Longitude=this.currentlng;
    visita.ClientObservation='';
    visita.VisitObservation='REZAGADO';
    //visita.NextVisitDate='';
    //visita.NextVisitObservation=this.NextVisitObservation;
    visita.UserId=parseInt(this.UserId);
    //visita.OrderDeliveryDate = this.OrderDeliveryDate;
    //visita.items=this.shoppingcartService.items;
    
    console.log(visita);


    let body = JSON.stringify( visita );           
                                           
    console.log(body);


    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.post(`${ SERVICES_URL }`+'/Order/Delivery', body, httpOptions).subscribe(data=>this.showSuccesAlert(), 
                                                                                                    (err)=>this.showErrorAlert(err));
                                                   

     this.navCtrl.pop();
  }

  showSuccesAlert() {
    const alert = this.alertCtrl.create({
      title: 'Registro Insertado!',
      subTitle: 'La visita/pedido fue registrada Exitosamente!',
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
