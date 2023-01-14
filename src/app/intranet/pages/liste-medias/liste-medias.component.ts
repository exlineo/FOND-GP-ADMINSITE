import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MediaI } from 'src/app/systeme/modeles/types-i';

import { GetService } from '../../systeme/services/get.service';

@Component({
  selector: 'app-liste-medias',
  templateUrl: './liste-medias.component.html',
  styleUrls: ['./liste-medias.component.css']
})
export class ListeMediasComponent implements OnInit {

  @Input() edition:boolean = false; // Etat booléen ou non
  @Input('target') target?:string = ''; // Réception de la cible qui doit recevoir l'image choisie
  @Output() choix = new EventEmitter<MediaI>(); // Renvoyer l'image choisie

  mediaForm:MediaI = {titre:'', caption:'', url:''};
  file?:File;
  editBool:boolean = false; // Afficher l'édition d'un média
  delBool:boolean = false;
  index:number = -1; // Index du document à éditer ou supprimer

  constructor(public get:GetService) { }

  ngOnInit(): void {
    console.log(this.target);

  }
  /** Lorsqu'un média est cliqué lors d'une sélection */
  selectMedia(media?:MediaI){
    console.log(media);
    this.choix.emit(media);
  }
  /** Identifier le fichier */
  setFile(event:any){
    this.file = event.target.files[0];
  }
  /** Téléverser un fichier */
  televerseMedia(){
    this.get.televerse(this.file!, this.mediaForm);
  }
  /** Supprimer un média */
  setSuppr(i:number){
    this.index = i;
    this.delBool = true;
  }
  setEdit(i:number){
    this.index = i;
    this.editBool = true;
  }
  /** Supprimer un média */
  supprMedia(){
    this.get.fireSuppr('medias', this.get.medias[this.index].id!);
    this.get.medias.splice(this.index, 1);
    this.initEdit();
  }
  /** Editer un média */
  editMedia(){
    this.get.setFireDoc('medias', {uid:this.get.medias[this.index].id!, doc:this.get.medias[this.index]})
    .then(r => {
      this.ngOnInit();
      this.get.msg.msgOk("Média mis à jour", `Voilà, c'est fait.`);
    })
    .catch(er => {
      console.log(er);
      this.get.msg.msgFail("Erreur sur la mise à jour", `Ca a coincé sur la mise à jour : (erreur : ${er})`);
    })
  }
  /** Réinitialiser l'édition */
  initEdit(){
    this.index = -1;
    this.editBool = false;
    this.delBool = false;
  }
}
