import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ClientvisitPage } from '../clientvisit/clientvisit'

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public orders:any[]=[];
  constructor(public navCtrl: NavController,
              public http:HttpClient) {

                this.http.get('http://ionlifems.ttsoluciones.com/api/order').subscribe(
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
    this.navCtrl.push( ClientvisitPage, {item: item.ClientId} );
  }

}
