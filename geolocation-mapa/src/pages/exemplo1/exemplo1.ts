import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Exemplo2Page } from '../exemplo2/exemplo2';

declare var google;

/**
 * Generated class for the Exemplo1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exemplo1',
  templateUrl: 'exemplo1.html',
})
export class Exemplo1Page {
  map: any;
  exemplo2Page = Exemplo2Page;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    const position = new google.maps.LatLng(-3.120658, -60.007615);

    const mapOptions = {
      zoom: 15,
      center: position,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    const marker = new google.maps.Marker({
      position: position,
      map: this.map,

      //Título
      title: 'Minha Posição',
      //Animação
      animation: google.maps.Animation.DROP,

      //Icone
      icon: 'assets/img/ponto_laranja.png'
    });
  }

}
