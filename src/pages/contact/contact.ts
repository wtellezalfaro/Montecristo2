import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ClientorderPage } from '../clientorder/clientorder'
import { SERVICES_URL } from "../../config/url.services";


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage 
{
  public OrderDeliveryDate:Date;
  public orders:any[]=[];
  constructor(public navCtrl: NavController,
              public http:HttpClient) {

                this.http.get(`${ SERVICES_URL }`+'/api/order').subscribe(
                  (data) => { // Success
                    this.orders = data['orders'];
                    console.log(data['orders']);        
                  },
                  (error) =>{
                    console.error(error);
                  }
                );

  }

  Find()
  {
    this.http.get(`${ SERVICES_URL }`+'/order/SelectByDate?orderDeliveryDate='+this.OrderDeliveryDate).subscribe(
      (data) => { // Success
        this.orders = data['orders'];
        console.log(data['orders']);        
      },
      (error) =>{
        console.error(error);
      }
    );
  }

  itemSelected(item)
  {
    console.log(item);
    this.navCtrl.push( ClientorderPage, {item: item} );
  }

}
