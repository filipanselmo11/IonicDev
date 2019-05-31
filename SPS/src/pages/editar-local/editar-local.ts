import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Local } from '../module/local';
/**
 * Generated class for the EditarLocalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 declare var google;

@IonicPage()
@Component({
  selector: 'page-editar-local',
  templateUrl: 'editar-local.html',
})
export class EditarLocalPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  latitude:Number;
  longitude:Number;
  markers:any = [];
  locais: any = [];

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, private alertCtrl: AlertController, public events: Events) {
   }

   presentAlert(){
     let alert = this.alertCtrl.create({
       title: 'AAA',
       subTitle: 'BBB',
       buttons: ['OK']
     });
     alert.present();
   }

   presentPrompt(){
     let alert = this.alertCtrl.create({
       title: 'Informações do local',
       inputs: [
         {
           name: 'nome',
           placeholder: 'Nome do local'
         },
       ],
       buttons: [
         {
           text: 'voltar',
           handler: data => {
             console.log('voltar clicked');
           }
         },
         {
           text: 'Registrar',
           handler: data => {
             this.save(data.nome.toString());

              console.log('Registrar clicked');
              this.presentAlert();
           }
         }
       ]
     });
     alert.present();
   }

   save(nome){
     var tzoffset = (new Date()).getTimezoneOffset() * 60000;
     var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
     console.log(tzoffset);
     console.log(new Date(Date.now()).toISOString());
     console.log(localISOTime);

     var local = new Local();
     local.local(nome, localISOTime, this.map.getCenter().lat(), this.map.getCenter().lng());
     this.locais.push(local);
   }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap(){
    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      this.latitude = position.coords.latitude;
      this.longitude = position.coords.latitude;

      let mapOptions = {
        center: latLng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.directionsDisplay.setMap(this.map);

    }, function(error){
      console.log(error.toString());
    }).then((position) => {
      //this.loadMarkerIfExists();
    });
  }
  

}
