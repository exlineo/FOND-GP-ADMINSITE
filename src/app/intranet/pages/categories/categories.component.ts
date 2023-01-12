import { Component, OnInit } from '@angular/core';
import { Categorie, CategorieI, PageI } from 'src/app/systeme/modeles/types-i';
import { GetService } from '../../systeme/services/get.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categorie: CategorieI = new Categorie();
  catIndex: number = -1;

  constructor(public get: GetService) { }

  ngOnInit(): void {
  }
  /** Réinitialiser la catégorie */
  initCat() {
    this.categorie = new Categorie();
  }
  /** Crée catégorie */
  setCat(){
    this.get.setFireDoc('categories', {uid:this.categorie.alias, doc:this.categorie})
    .then(r => {
      this.get.categories.push(this.categorie);
      this.get.msg.msgOk('Catégorie ajoutée', 'Cool, votre nouvelle catégorie a été ajoutée.')
    })
    .catch(er => {
      this.get.msg.msgFail('Aïe, erreur !', er)
      console.log(er)});
  }
  /** Récupérer une catégorie */
  getCat(){
    this.categorie = this.get.categories[this.catIndex];
  }
  /** Supprimer la catégorie */
  supprCat(){

  }
}
