import { Component, OnInit } from '@angular/core';
import { LienMenu, MenuI, LienMenuI, PageI } from 'src/app/systeme/modeles/types-i';
import { GetService } from '../../systeme/services/get.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  lienBool = false;
  index = -1;
  lienMenu:LienMenuI = new LienMenu();
  liensMenu:Array<LienMenuI> = [];

  constructor(public get:GetService) { }

  ngOnInit(): void {
    if(this.get.menus.length == 0) this.get.getFireMenus();
  }
  init(){
    this.lienMenu = new LienMenu();
    this.lienBool = false;
  }
  /** Récupérer les lien du menu */
  setLien(i:number){
    this.lienMenu = this.liensMenu[i];
    this.index = i;
    this.lienBool = true;
  }
  /** Créer un lien */
  creeLien(){
    this.lienMenu = new LienMenu();
    this.lienBool = true;
  }
  /** Ajouter un lien de menu */
  fireLien(){
    this.get.setFireDoc('liens', {uid:this.lienMenu.alias, doc:this.lienMenu})
  };
  /** Supprimer un lien existant */
  supprLien(){
    this.get.fireSuppr('liens', this.lienMenu.alias);
  }
}
