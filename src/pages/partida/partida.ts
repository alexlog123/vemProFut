import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, MenuController, ToastController, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { Partida } from '../../model/partida';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-partida',
  templateUrl: 'partida.html',
})
export class PartidaPage {

  

  firestore = firebase.firestore();
  uid : string;
  partidas :  Partida[] = [];

  loader = this.loadingCtrl.create({
    content: "Aguarde...",
    duration: 3000
  });
  formGroup: any;
  formBuilder: any;

  toast(text : string){
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  
  constructor(public navCtrl: NavController, 
    public menuCtrl : MenuController, 
    public firebaseauth : AngularFireAuth, 
    public storage : AngularFireStorage,
    public toastCtrl : ToastController,
    public loadingCtrl : LoadingController,
    public alertCtrl : AlertController,
    
    ) {
      this.firebaseauth.authState.subscribe( user => {
        if (user) { this.uid = user.uid }
      });
      this.menuCtrl.enable(true);
      
      
  }

  ionViewDidLoad(){
    this.getList(); 
  }


  getList(){ 
    var produtoRef = firebase.firestore().collection('partida');
    produtoRef.get().then(query=> {
      query.forEach(doc =>{
      let p = new Partida();
      p.id = doc.id;
      p.setDados(doc.data()); 

      let ref = 'quadras/'+p.id+'.jpg';//pasta do servidor
    let gsReference = firebase.storage().ref().child(ref); //referência do arquivo no servidor

    gsReference.getDownloadURL().then( url =>{ //tenta baixar a foto do servidor
        p.imagem = url;
        console.log(p.imagem);
    }).catch(()=>{ //foto não existe,pega foto padrão
      p.imagem ="https://vinilos-stica.es/img/p/1/0/5/9/9/4/105994.jpg";
    })     

      this.partidas.push(p);
      });
      console.log(this.partidas);
    })                                                                 
  }

  criar(){

    this.navCtrl.setRoot('CriarPartidaPage');
  
  }

  perfil(){
    this.navCtrl.setRoot('UsuarioPage');
  }

  detalhar(partidas : Partida){
    //ir para pagina
    this.navCtrl.push('PartidaDetalhesPage',{'partidas': partidas});
  }

}