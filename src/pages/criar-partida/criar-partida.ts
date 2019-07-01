import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { Partida } from '../../model/partida';

@IonicPage()
@Component({
  selector: 'page-criar-partida',
  templateUrl: 'criar-partida.html',
})
export class CriarPartidaPage {

  firestore = firebase.firestore();
  formGroup : FormGroup;
  uid : string;
  partidas :  Partida[] = [];
  imagem : any;
  loader = this.loadingCtrl.create({
    content: "Aguarde...",
    duration: 3000
  });
  t="https://vinilos-stica.es/img/p/1/0/5/9/9/4/105994.jpg";
  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder : FormBuilder,
    public firebaseauth : AngularFireAuth, 
    public storage : AngularFireStorage,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
      this.form();
  }

  

  add() {
        this.loader.present(); // <----- Exibe o loading
        this.firestore.collection("partida").add(this.formGroup.value) // tenta cadastrar
          .then(ref => { // Cadastro sucesso
            this.loader.dismiss(); // <----- Retira o loading
            this.toast('Cadastrado com sucesso');// <----- Exibe mensagem
            this.getList();
        }).catch(err => { // Cadastro com erro
          this.loader.dismiss();// <----- Retira o loading
          this.toast(err.message); // <----- Exibe mensagem
        });
  }

  getList(){ 
    var partidasRef = firebase.firestore().collection('partida').where("nome","==",this.formGroup.value.nome).where("lugar","==",this.formGroup.value.lugar)
    .where("data","==",this.formGroup.value.data).where("descricao","==",this.formGroup.value.descricao);
    partidasRef.get().then(query=> {
      query.forEach(doc => { 
        let p = new Partida(); 
        p.setDados(doc.data());
        p.id = doc.id; 
        this.partidas.push(p); 
      });
       // Diretório + caminho imagem no servidor
    let ref = firebase.storage().ref().child(`quadras/${this.partidas[0].id}.jpg`);
    // Executa o upload
    ref.put(this.imagem).then(resp => {
      // Se sucesso, pega a url para download da imagem
  })
     
    });                                                                           
  }
  toast(text : string){
    let toast = this.toastCtrl.create({
      message: 'Partida cadastrada com sucesso',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  enviaArquivo(event){
    // Pega o arquivo do formulário
    this.imagem = event.srcElement.files[0];
    this.upload(); // 
  }



  // Enviar o arquivo para o servidor
  upload(){
    // Diretório + caminho imagem no servidor
    let ref = firebase.storage().ref().child(`quadras/${this.uid}.jpg`);
    // Executa o upload
    ref.put(this.imagem).then(resp => {
      // Se sucesso, pega a url para download da imagem
      this.downloadFoto();
  })
  }


  downloadFoto(){
    let ref = 'quadras/'+this.uid+'.jpg';//pasta do servidor
    let gsReference = firebase.storage().ref().child(ref); //referência do arquivo no servidor

    gsReference.getDownloadURL().then( url =>{ //tenta baixar a foto do servidor
        this.t= url;
        this.loader.dismiss();
    }).catch(()=>{ //foto não existe,pega foto padrão
      this.t="https://vinilos-stica.es/img/p/1/0/5/9/9/4/105994.jpg";
    })
  }

  form(){
    this.formGroup = this.formBuilder.group({
      lugar: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      data: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      imagem:  ['', [Validators.required]],
      a1: ['participar', [Validators.required]],
      a2: ['participar', [Validators.required]],
      a3: ['participar', [Validators.required]],
      a4: ['participar', [Validators.required]],
      a5: ['participar', [Validators.required]],
      a6: ['participar', [Validators.required]],
      a7: ['participar', [Validators.required]],
      a8: ['participar', [Validators.required]],
      a9: ['participar', [Validators.required]],
      a10: ['participar', [Validators.required]],
      a11: ['participar', [Validators.required]],
      b1: ['participar', [Validators.required]],
      b2: ['participar', [Validators.required]],
      b3: ['participar', [Validators.required]],
      b4: ['participar', [Validators.required]],
      b5: ['participar', [Validators.required]],
      b6: ['participar', [Validators.required]],
      b7: ['participar', [Validators.required]],
      b8: ['participar', [Validators.required]],
      b9: ['participar', [Validators.required]],
      b10: ['participar', [Validators.required]],
      b11: ['participar', [Validators.required]],
    });
  }
}