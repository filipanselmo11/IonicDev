import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { checkNoChangesNode } from '@angular/core/src/view/view';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  testCheckboxOpen: boolean;
  testCheckboxResult;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  showCheckbox(){
    let alert = this.alertCtrl.create();

    alert.setTitle('O quanto esse lugar é util pra voce ?');

    alert.addInput({
      type: 'checkbox',
      label: 'Alderaan',
      value: 'value1',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Bespin',
      value: 'value2'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
      }
    });

    alert.present().then(() => {
      this.testCheckboxOpen = true;
    });
  }

}
