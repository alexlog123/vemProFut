import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { Partida } from '../../model/partida';
import firebase from 'firebase';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the PartidaDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-partida-detalhes',
  templateUrl: 'partida-detalhes.html',
})
export class PartidaDetalhesPage {
  partidas : Partida;
  uid:string;
  firestore = firebase.firestore();
  formGroup : FormGroup;
  t:string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder : FormBuilder,
    public firebaseauth : AngularFireAuth,
    public toastCtrl : ToastController,
    public storage: AngularFireStorage,
    public menuCtrl: MenuController){

      this.partidas = this.navParams.get('partidas');

    this.firebaseauth.authState.subscribe( user =>{
      if(user){ this.uid = user.email 
        console.log(this.uid)
        this.up();
      }
      else{this.uid = "false"}
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartidaDetalhesPage');
  }
  participar(n){
    console.log(n);
    console.log(this.t);

    var ref = this.firestore.collection("partida").doc(this.partidas.id);
    ref.update(n).then(()=> {
      this.navCtrl.setRoot('PrimarytabsPage');
      this.toast('Você esta participando de uma partida!');
    })
    .catch(function(error){
      console.error("Error", error);
    });
  }

  up(){
    let refi = 'usuario/'+this.uid+'.jpg';//pasta do servidor
    let gsReference = firebase.storage().ref().child(refi); //referência do arquivo no servidor

    gsReference.getDownloadURL().then( url =>{ //tenta baixar a foto do servidor
        this.t= url;
    }).catch(()=>{ //foto não existe,pega foto padrão
      this.t="https://vinilos-stica.es/img/p/1/0/5/9/9/4/105994.jpg";
    });
  }
  toast(text : string){
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
