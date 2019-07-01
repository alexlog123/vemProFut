import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';

/**
 * Generated class for the UsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {
  firestore = firebase.firestore();
  uid : string; // <--
  imagem : any;// 
  foto:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public firebaseauth: AngularFireAuth,
    public storage: AngularFireStorage) {
      this.firebaseauth.authState.subscribe( user =>{
        if(user){ this.uid = user.email 
          console.log(this.uid)
        }
        else{this.uid = "false"}
      });
  }

  ionViewDidLoad() {
    this.downloadFoto(); 
  }

  enviaArquivo(event){
    // Pega o arquivo do formulário
    this.imagem = event.srcElement.files[0];
    this.upload(); // 
  }

  // Enviar o arquivo para o servidor
  upload(){
    // Diretório + caminho imagem no servidor
    let ref = firebase.storage().ref().child(`usuario/${this.uid}.jpg`);
    // Executa o upload
    ref.put(this.imagem).then(resp => {
      // Se sucesso, pega a url para download da imagem
      this.downloadFoto();
  })
  }


  downloadFoto(){
    let ref = 'usuario/'+this.uid+'.jpg';//pasta do servidor
    let gsReference = firebase.storage().ref().child(ref); //referência do arquivo no servidor

    gsReference.getDownloadURL().then( url =>{ //tenta baixar a foto do servidor
      this.foto = url; // foto baixada com sucesso
      console.log(url)
    }).catch(()=>{ //foto não existe,pega foto padrão
      this.foto = "https://abrilexame.files.wordpress.com/2018/10/capaprofile.jpg";
    })
  }
}
