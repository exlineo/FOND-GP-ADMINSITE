import { Component, OnInit } from '@angular/core';
import { Categorie, CategorieI, MediaI, PageI } from 'src/app/systeme/modeles/types-i';
import { GetService } from '../../systeme/services/get.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categorie: CategorieI = new Categorie();
  index: number = -1;
  media?:string;

  constructor(public get: GetService) { }

  ngOnInit(): void {
  }
  /** Réinitialiser la catégorie */
  initCat() {
    this.categorie = new Categorie();
    this.index = -1;
  }
  /** Crée catégorie */
  addCat(){
    this.get.setFireDoc('categories', {uid:this.categorie.alias, doc:this.categorie})
    .then(r => {
      if(!this.get.categories.includes(this.categorie)) this.get.categories.push(this.categorie);
      this.get.msg.msgOk('Catégorie ajoutée', 'Cool, votre nouvelle catégorie a été ajoutée.');
      this.initCat();
    })
    .catch(er => {
      this.get.msg.msgFail('Aïe, erreur !', er)
      console.log(er)});
  }
  /** Mettre à jour une catégorie */
  editCat(){
    this.get.setFireDoc('categories', {uid:this.categorie.alias, doc:this.categorie})
    .then(r => {
      const i = this.get.categories.findIndex(l => l.alias == this.categorie.alias)!;
      this.get.categories[i] = this.categorie;
      this.get.msg.msgOk('Catégorie mise à jour', 'Fastoche, la mise à jour est faite.');
      this.initCat();
    })
    .catch(er => {
      this.get.msg.msgFail('Aïe, erreur !', er)
      console.log(er)});
  }
  /** Récupérer une catégorie */
  getCat(i:number, alias:string){
    this.index = i;
    this.categorie = this.get.categories.find(c => c.alias == alias)!;
  }
  /** Supprimer la catégorie */
  supprCat(){
    this.get.fireSuppr('categories', this.get.categories[this.index].alias);
  }
  /** Retour de l'image choisie */
  imageChoisie(med:MediaI){
    console.log(med);
    this.categorie.media = med;
    this.media = undefined;
  }
  /** Ajouter une image */
  editImage(target:string){
    this.media = target;
  }
  /** Supprimer les images */
  deleteImage(target:string){
    const tmp:MediaI = {titre:'', url:'', caption:''};
    this.categorie.media = tmp;
  }
}
