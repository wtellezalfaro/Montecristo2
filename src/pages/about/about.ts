import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ClientvisitPage } from '../clientvisit/clientvisit'

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
    this.http.get('http://montecristows.ttsoluciones.com/client/FindByName?clientName='+this.ClientName).subscribe(
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
