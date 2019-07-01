import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartidaDetalhesPage } from './partida-detalhes';

@NgModule({
  declarations: [
    PartidaDetalhesPage,
  ],
  imports: [
    IonicPageModule.forChild(PartidaDetalhesPage),
  ],
})
export class PartidaDetalhesPageModule {}
