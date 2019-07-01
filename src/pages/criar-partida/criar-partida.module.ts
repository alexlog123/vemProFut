import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriarPartidaPage } from './criar-partida';

@NgModule({
  declarations: [
    CriarPartidaPage,
  ],
  imports: [
    IonicPageModule.forChild(CriarPartidaPage),
  ],
})
export class CriarPartidaPageModule {}
