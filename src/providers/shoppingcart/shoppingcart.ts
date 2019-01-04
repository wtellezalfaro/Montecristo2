import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Platform, ModalController } from "ionic-angular";
import { Storage } from '@ionic/storage';
import { SERVICES_URL } from "../../config/url.services";

/*
  Generated class for the ShoppingcartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShoppingcartProvider {

  items:any[]=[];

  constructor(public http: HttpClient,
              private alertCtrl:AlertController,
              private platform: Platform,
              private storage:Storage) 
  {
    console.log('Hello ShoppingcartProvider Provider');
    this.LoadStoarge();
  }


  LoadStoarge()
  {

    let promesa = new Promise( ( resolve, reject )=>{

      if( this.platform.is("cordova") ){
        // dispositivo
        this.storage.ready()
                  .then( ()=>{

                  this.storage.get("items")
                          .then( items =>{
                            if( items ){
                              this.items = items;
                            }
                            resolve();
                        })

              })


      }else{
        // computadora
        if( localStorage.getItem("items") ){
          //Existe items en el localstorage
          this.items = JSON.parse( localStorage.getItem("items")  );
        }

        resolve();

      }

    });

    return promesa;
  }

  RemoveItem( idx:number ){

    this.items.splice(idx,1);
    this.SaveStorage();

  }

  AddExistingItem( idx:number ){

    this.items[idx].ProductQuantity += 1;
    this.SaveStorage();

  }

  AddItem( item_parameter:any )
  {
    for( let item of this.items ){
      if( item.ProductId == item_parameter.ProductId ){

        this.alertCtrl.create({
          title: "Item existe",
          subTitle: item_parameter.producto + ", ya se encuentra en el pedido",
          buttons: ["OK"]
        }).present();

        return;
      }
    }
      this.items.push( item_parameter );
      this.SaveStorage();
  }

  private SaveStorage()
  {
    if( this.platform.is("cordova") ){
      // dispositivo
      this.storage.set('items', this.items );

    }else{
      // computadora
      localStorage.setItem("items", JSON.stringify( this.items ) );

    }

  }

}
