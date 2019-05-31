import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListarLocalPage } from './listar-local';

@NgModule({
  declarations: [
    ListarLocalPage,
  ],
  imports: [
    IonicPageModule.forChild(ListarLocalPage),
  ],
})
export class ListarLocalPageModule {}
