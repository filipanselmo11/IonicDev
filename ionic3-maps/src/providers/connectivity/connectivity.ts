import { Injectable, Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Network, Connection } from '@ionic-native/network';

declare var connection;

@Injectable()
export class Connectivity {

  onDevice: boolean;

  constructor(public platform: Platform, private network: Network){
    this.onDevice = this.platform.is('cordova');
  }

  isOnline() {
    if(this.onDevice && this.network.Connection){
      return this.network.Connection;
    } else{
      return navigator.onLine;
    }
  }

  isOffline(){
    if(this.onDevice && this.network.Connection){
      return this.network.Connection === Connection.NONE;
    }
  }
}
