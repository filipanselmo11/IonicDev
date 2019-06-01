import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Local } from '../module/local';

declare var google;

@IonicPage()
@Component({
  selector: 'page-editar-local',
  templateUrl: 'editar-local.html',

})

export class EditarLocalPage{

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  latitude: Number;
  longitude: Number;
  markers: any = [];
  locais: any = [];

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, private alertCtrl: AlertController, public events: Events){
  }

  presentAlert(){
    let alert = this.alertCtrl.create({
      title: 'Registrado',
      subTitle: 'Local Registrado com Sucesso',
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
          placeholder: 'Nome do Local'
        },
      ],
      buttons:[
        {
          text: 'VOLTAR',
          handler: data => {
            console.log('VOLTAR clicked');
          }
        },
        {
          text: 'REGISTRAR',
          handler: data => {
            this.save(data.nome.toString());

            console.log('REGISTRAR clicked');
            this.presentAlert();
          }
        }
      ]
    });
    alert.present();
  }

  save(nome){
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    var localISoTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    console.log(tzoffset);
    console.log(new Date(Date.now()).toISOString());
    console.log(localISoTime);

    var local = new Local();
    local.local(nome, localISoTime, this.map.getCenter().lat(), this.map.getCenter().lng());
    this.locais.push(local);

    console.log(this.locais);
  }

  loadMap(){
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.directionsDisplay.setMap(this.map);

    }, function(error){
      console.log(error.toString());
    }).then((position) => {
      this.loadMarkerIfExists();
    });  
  }

  loadMarkerIfExists(){
    for (var i = 0; i < this.locais.length; i++){
      console.log(this.locais.length.toString());
      var marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: {
          lat: Number(this.locais[i].latitude),
          lng: Number(this.locais[i].longitude),
        }
      });
      this.markers.push(marker);
    }
  }

  addMarker(){
    var marker = new google.maps.Marker({
      map:this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h6>{{local.nome}}</h6>";
    this.addInfoWindow(marker,content);
  }

  addInfoWindow(marker,content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map,marker);
      this.presentPrompt();
    });
  }

  ionViewDidLoad(){
    this.loadMap();
  }

}