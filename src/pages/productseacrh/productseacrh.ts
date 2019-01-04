import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ShoppingcartProvider } from '../../providers/shoppingcart/shoppingcart';
import { SERVICES_URL } from "../../config/url.services";

/**
 * Generated class for the ProductseacrhPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productseacrh',
  templateUrl: 'productseacrh.html',
})
export class ProductseacrhPage {
  public ProductName: string;
  public products:any[]=[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http:HttpClient,
              public shoppingcartService:ShoppingcartProvider) 
  {

  }

  Find()
  {
    this.http.get(`${ SERVICES_URL }`+'/product/FindByName?productName='+this.ProductName).subscribe(
      (data) => { // Success
        this.products = data['products'];
        console.log(data['products']);        
      },
      (error) =>{
        console.error(error);
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductseacrhPage');
  }

  itemSelected(item)
  {
    //console.log(item);
    //this.navCtrl.push( ClientvisitPage, {item: item.ClientId} );
    this.shoppingcartService.AddItem(item);
    this.navCtrl.pop();
  }

}
