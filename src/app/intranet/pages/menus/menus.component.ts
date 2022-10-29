import { Component, OnInit } from '@angular/core';
import { LienMenu, MenuI, LienMenuI, PageI } from 'src/app/systeme/modeles/types-i';
import { GetService } from '../../systeme/services/get.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  menuIndex:number = -1;
  lienIndex:number = -1;
  lienMenu:LienMenuI = new LienMenu();
  page:PageI = { titre: '', accroche: '', contenu: '' };

  constructor(public get:GetService) { }

  ngOnInit(): void {
    if(this.get.menus.length == 0) this.get.getFireMenus();
    this.page = this.get.pages.menus;
  }

  // Reset du lien de menu
  initLien(){
    this.get.lienMenu = new LienMenu();
  }
  /** Enregistrer le nouveau lien */
  enregistreLien(){

  }
  /** Le menu sélectionné */
  setMenu(ev:any){
    if(this.menuIndex && this.get.menus.length == 0) this.get.menus[this.menuIndex].liens.push(this.lienMenu);
  }
}
