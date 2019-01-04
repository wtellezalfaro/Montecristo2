import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import { GeolocProvider } from '../../providers/geoloc/geoloc';
import { Geolocation } from '@ionic-native/geolocation';
import { Visita } from '../../models/visita';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { ProductseacrhPage } from '../productseacrh/productseacrh';
import { ShoppingcartProvider } from '../../providers/shoppingcart/shoppingcart';

/**
 * Generated class for the ClientvisitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-clientvisit',
  templateUrl: 'clientvisit.html',
})
export class ClientvisitPage {
  item: any;
  public client:any[]=[];
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
  public UserId: string;
  public OrderDeliveryDate: Date;
  pushPage: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private geolocation: Geolocation,
              public http:HttpClient,  
              public alertCtrl: AlertController,
              public storage:Storage,
              private platform:Platform,
              public shoppingcartService:ShoppingcartProvider) 
  {
    this.pushPage = ProductseacrhPage;
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;      
     //console.log(resp.coords);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    this.item = navParams.get('item');
    
    http.get('http://montecristows.ttsoluciones.com/api/Client/'+this.item).subscribe(
      (data) => { // Success
        this.client = data['client'];
        console.log(data['client']); 
        this.FirstName=data['client'].ClientFirstName;
        this.LastName=data['client'].ClientLastName1;       
        this.LegalName=data['client'].ClientName; 
        this.Address=data['client'].ClientAddress; 
        this.Phone=data['client'].ClientPhone;
        this.Mobile=data['client'].ClientCelularPhone;
        this.Email=data['client'].ClientEmail;
        this.ClientObservation=data['client'].Observation;
      },
      (error) =>{
        console.error(error);
      }
    );
    
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

  Insert()
  {
  }

  Save()
  {

    let visita=new Visita();
    visita.ClientId=this.item;
    visita.FirstName=this.FirstName;
    visita.LastName=this.LastName;
    visita.LegalName=this.LegalName;
    visita.Address=this.Address;
    visita.Phone=this.Phone;
    visita.Mobile=this.Mobile;
    visita.Email=this.Email;             
    visita.Latitude=this.lat;
    visita.Longitude=this.lng;
    visita.ClientObservation=this.ClientObservation;
    visita.VisitObservation=this.VisitObservation;
    visita.NextVisitDate=this.NextVisitDate;
    visita.NextVisitObservation=this.NextVisitObservation;
    visita.UserId=parseInt(this.UserId);
    visita.OrderDeliveryDate = this.OrderDeliveryDate;
    visita.items=this.shoppingcartService.items;
    
    console.log(visita);


    let body = JSON.stringify( visita );           
                                           
    console.log(body);


    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.post('http://montecristows.ttsoluciones.com/Client/Visit', body, httpOptions).subscribe(data=>this.showSuccesAlert(), 
                                                                                                    (err)=>this.showErrorAlert(err));
                                              
     this.FirstName="";
     this.LastName="";
     this.LegalName="";
     this.Address="";
     this.shoppingcartService.items=[];

     this.navCtrl.pop();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientvisitPage');
  }

}
