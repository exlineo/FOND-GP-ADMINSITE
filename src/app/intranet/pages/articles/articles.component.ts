import { Component, OnInit } from '@angular/core';
import { Article, ArticleI, LienI, MediaI } from 'src/app/systeme/modeles/types-i';
import { GetService } from '../../systeme/services/get.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  article!: ArticleI;
  index: number = -1;
  lien:LienI = { titre:'', url:'', caption:'', cible:'_self'};
  lienBool:boolean = false; // Afficher l'ajout d'un lien
  imgTarget?:string; // Quelle image est entrain d'être éditée
  filtre:string = ''; // Filtrer les catégories

  constructor(public get:GetService) { }

  ngOnInit(): void {
  }
  /** Réinitialiser l'article */
  initArticle(){
    this.article = new Article();
    this.index = -1;
  }
  getArticle(index:number){
    this.index = index;
    this.article = this.get.articles[index];
  }
  /** Crée catégorie */
  setArticle(){
    this.get.setFireDoc('articles', {uid:this.article.alias, doc:this.article})
    .then(r => {
      this.get.articles[this.index] = this.article;
      this.get.msg.msgOk('Article mis à jour', "Tout s'est bien passé, les données sont à jour.");
      this.initArticle();
    })
    .catch(er =>{
      this.get.msg.msgFail("Erreur dans la sauvegarde de l'article", er);
      console.log(er);
    });
  }
  /** Ajouter un nouvel article */
  addArticle(){
    this.get.setFireDoc('articles', {uid:this.article.alias, doc:this.article})
    .then(r => {
      this.get.articles.push(this.article);
      this.get.msg.msgOk('Article a été ajouté', "Le nouvelle article est maintenant disponible.");
      this.initArticle();
    })
    .catch(er =>{
      this.get.msg.msgFail("Erreur dans la sauvegarde de l'article", er);
      console.log(er);
    });
  }
  /** Créer un lien */
  setLien(){
    this.lienBool = true;
    this.lien = { titre:'', url:'', caption:'', cible:'_self'};
  }
  /** Ajouter un lien */
  addLien(){
    this.article.liens!.push(this.lien);
    this.lien = { titre:'', url:'', caption:'', cible:'_self'};
    this.lienBool = false;
  }
  /** Supprimer un lien dans l'article */
  deleteLien(i:number){
    this.article.liens!.splice(i, 1);
  }
  /** Supprimer la catégorie */
  supprArticle(){
    this.get.fireSuppr('articles', this.get.articles[this.index].alias!);
    this.get.articles.splice(this.index, 1);
    this.initArticle();
  }
  /** Ajouter une image */
  editImage(target:string){
    this.imgTarget = target;
  }
  /** Supprimer les images */
  deleteImage(target:string){
    const tmp:MediaI = {titre:'', url:'', caption:''};
    target == 'intro' ? this.article.mediaIntro = tmp : this.article.mediaContenu = tmp;
  }
  /** Retour de l'image choisie */
  imageChoisie(media:MediaI){
    console.log(media);
    this.imgTarget == 'intro' ? this.article.mediaIntro = media : this.article.mediaContenu = media;
    this.imgTarget = undefined;
  }
}
