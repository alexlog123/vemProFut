import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PrimarytabsPageModule } from '../pages/primarytabs/primarytabs.module';
import { LojaPageModule } from '../pages/loja/loja.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config/firebase.config';
import { AngularFireStorage } from 'angularfire2/storage';


@NgModule({
  declarations: [
    MyApp
  
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    PrimarytabsPageModule,
    LojaPageModule,
    AngularFireModule.initializeApp(firebaseConfig)
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AngularFireStorage
  ]
})
export class AppModule {}
