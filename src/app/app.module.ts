import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ClientvisitPage } from '../pages/clientvisit/clientvisit';
import { ClientorderPage } from '../pages/clientorder/clientorder';
import { LoginPage } from '../pages/login/login';


import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from '@agm/core'
import { Http, HttpModule } from '@angular/http'; 

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GeolocProvider } from '../providers/geoloc/geoloc';
import { Prospeccion } from '../models/prospeccion';
import { IonicStorageModule } from '@ionic/storage';
import { MembershipProvider } from '../providers/membership/membership';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ClientvisitPage,
    ClientorderPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCFJHOcT0iwLx17y9TXHrpAo-fjiWxe6yI'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ClientvisitPage,
    ClientorderPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeolocProvider,
    Geolocation,
    MembershipProvider
  ]
})
export class AppModule {}
