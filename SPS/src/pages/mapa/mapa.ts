import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { EditarLocalPage } from '../editar-local/editar-local';
/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  map:any;
  editar_local = EditarLocalPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');
    this.geolocation.getCurrentPosition()
    .then((resp) => {
      const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      const mapOptions = {
        zoom: 18,
        center: position
      }

      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      
      const marker = new google.maps.Marker({
        position: position,
        map: this.map
      });
      /*Nao está funcionando, não sei por que 
      const GOOGLE = { "lat": resp.coords.latitude, "lng": resp.coords.longitude };
      this.map.addCircle({
        'center': GOOGLE,
        'radius': 300,
        'strokeColor': '#AA00FF',
        'strokeWidth': 5,
        'fillColor': '#880000'
      }, function(circle){
        setTimeout(function() {
          circle.setRadius(600);
        }, 3000);
      });*/

    }).catch((error) => {
      console.log('Erro ao recuperar sua posição', error);
    });
  }

}
