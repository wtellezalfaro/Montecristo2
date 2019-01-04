import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ClientvisitPage } from '../clientvisit/clientvisit'
import { SERVICES_URL } from "../../config/url.services";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public ClientName: string;
  public clients:any[]=[];
  
  

  constructor(public navCtrl: NavController,
              public http:HttpClient) {

  }

  Find()
  {
    this.http.get(`${ SERVICES_URL }`+'/client/FindByName?clientName='+this.ClientName).subscribe(
      (data) => { // Success
        this.clients = data['clients'];
        console.log(data['clients']);        
      },
      (error) =>{
        console.error(error);
      }
    );
  }

  itemSelected(item)
  {
    //console.log(item);
    this.navCtrl.push( ClientvisitPage, {item: item.ClientId} );
  }
}
