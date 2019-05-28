import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Exemplo1Page } from '../exemplo1/exemplo1';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  exemplo1Page = Exemplo1Page;

  constructor(public navCtrl: NavController) {

  }

}
