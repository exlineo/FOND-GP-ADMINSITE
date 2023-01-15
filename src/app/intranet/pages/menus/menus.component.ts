import { Component, OnInit } from '@angular/core';
import { LienMenu, MenuI, LienMenuI, PageI } from 'src/app/systeme/modeles/types-i';
import { GetService } from '../../systeme/services/get.service';
import { UtilsService } from '../../systeme/services/utils.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  index = -1;
  lienMenu:LienMenuI = new LienMenu(); // Nouveau lien créé
  filtreLiens:string = '';

  constructor(public get:GetService, public utils:UtilsService) { }

  ngOnInit(): void {
    if(this.get.menus.length == 0) this.get.getFireMenus();
  }
  /** Réinitialiser le lien à créer ou mettre à jour */
  init(){
    this.lienMenu = new LienMenu();
    this.index = -1;
    this.filtreLiens = '';
  }
  /** Récupérer les lien du menu */
  upLien(i:number){
    this.lienMenu = this.get.liensMenus[i];
    this.index = i;
  }
  /** Créer un lien */
  creeLien(){
    this.index = -1;
    this.lienMenu = new LienMenu();
  }
  /** Ajouter un lien de menu */
  creeFireLien(){
    this.get.setFireDoc('liens', {uid:this.lienMenu.alias, doc:this.lienMenu})
    .then(r => {
      this.get.liensMenus.push(this.lienMenu);
      this.get.liensMenus[this.index] = this.lienMenu;
      this.get.msg.msgOk('Le lien a été ajouté', "Tout s'est bien passé, les données sont à jour.");
      this.init();
    })
    .catch(er =>{
      this.get.msg.msgFail("Erreur dans la sauvegarde du nouveau lien", er);
      console.log(er);
    });
  };
  /** Ajouter un lien de menu */
  upFireLien(){
    this.get.setFireDoc('liens', {uid:this.lienMenu.alias, doc:this.lienMenu})
    .then(r => {
      this.get.liensMenus[this.index] = this.lienMenu;
      this.get.msg.msgOk('Le lien a été mis à jour', "Tout s'est bien passé, les données sont à jour.");
      this.init();
    })
    .catch(er =>{
      this.get.msg.msgFail("Erreur dans la sauvegarde du lien", er);
      console.log(er);
    });
  };
  /** Supprimer un lien existant */
  supprLien(){
    this.get.fireSuppr('liens', this.lienMenu.alias);
  }
}
