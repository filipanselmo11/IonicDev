import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Local } from '../module/local';
import { HttpClient } from '@angular/common/http';
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
  testCheckboxOpen: boolean;
  testCheckboxResult: any;


  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, private alertCtrl: AlertController, public events: Events, private http: HttpClient){
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

    /*let content = "<h6>Local Salvo</h6>";
    this.addInfoWindow(marker,content);*/
    this.presentPrompt();
    this.http.get('http://localhost:5000/get_recommendation/?lat=position.coords.latitude&long=position.coords.longitude&year=1997&sex=0&vehicle=2').subscribe((response) => {
      console.log(response);
      let content = "<h6>Local Salvo</h6>";
      this.addInfoWindow(marker,content);
    });
  }

  addNewMarker(){
    var mock_places = [
      [ -3.01871502, -60.02692036, 'iTriad'],
      [ -3.04878376, -60.00482527, 'Casa Rodrigo'],
      [ -3.09165002, -60.01847857, 'EST'],
      [ -3.13181087, -59.97766282, 'CITS'],
      [ -3.08990342, -60.05997371, 'Casa Bebeto'],
      [ -3.12615941, -60.023208,   'Sebra Lab'],
      [ -3.06034519, -60.02621866, 'Tumpex']
   ]

  var index = Math.floor(Math.random() * 7);
  var place = mock_places[index];
  var latitude = place[0];
  var longitude = place[1];
  var label = place[2];
  //let position =  new google.maps.LatLng(latitude, longitude);

  var marker = new google.maps.Marker({
    map: this.map,
    position: this.map.getCenter(),
    animation: google.maps.Animation.DROP,
    title:'Itriad'
  });
  this.showCheckbox();

  }

  showCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Esse lugar é relevante pra voce ?');

    alert.addInput({
      type: 'checkbox',
      label: 'ruim',
      value: 'value1',
      checked: false
    });

    alert.addInput({
      type: 'checkbox',
      label: 'pessimo',
      value: 'value2',
    });


    alert.addInput({
      type: 'checkbox',
      label: 'mediano',
      value: 'value3',
    });


    alert.addInput({
      type: 'checkbox',
      label: 'bom',
      value: 'value4',
    });


    alert.addInput({
      type: 'checkbox',
      label: 'excelente',
      value: 'value5',
    });

    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
      }
    });
    alert.present();
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
