import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Exemplo1Page } from '../pages/exemplo1/exemplo1';
import { Exemplo2Page } from '../pages/exemplo2/exemplo2';
import { Exemplo3Page } from '../pages/exemplo3/exemplo3';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Exemplo1Page,
    Exemplo2Page,
    Exemplo3Page
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Exemplo1Page,
    Exemplo2Page,
    Exemplo3Page

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation
  ]
})
export class AppModule {}
