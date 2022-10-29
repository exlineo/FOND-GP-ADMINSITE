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
  page:PageI = { titre: '', accroche: '', contenu: '' };

  constructor(public get: GetService) { }

  ngOnInit(): void {
    this.page = this.get.pages.categories;
  }
  /** Réinitialiser la catégorie */
  initCat() {
    this.categorie = new Categorie();
  }
  /** Crée catégorie */
  setCat(){
    this.get.setFireDoc('categories', {uid:this.categorie.alias, doc:this.categorie})
    .then(r => this.get.categories.push(this.categorie)
    )
    .catch(er => console.log(er));
  }
  /** Récupérer une catégorie */
  getCat(){
    this.categorie = this.get.categories[this.catIndex];
  }
  /** Supprimer la catégorie */
  supprCat(){

  }
}
