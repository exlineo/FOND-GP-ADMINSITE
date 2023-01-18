import { Component, OnInit } from '@angular/core';
import { FormulaireI, Formulaire, MediaI, ChampI, Champ } from 'src/app/systeme/modeles/types-i';
import { GetService } from '../../systeme/services/get.service';

@Component({
  selector: 'app-formulaires',
  templateUrl: './formulaires.component.html',
  styleUrls: ['./formulaires.component.css']
})
export class FormulairesComponent implements OnInit {

  formulaire!: FormulaireI;
  index: number = -1;
  champ:ChampI = new Champ();
  editBool:boolean = false; // Afficher l'édition d'un média
  delBool:boolean = false;
  indexChamp:number = -1; // Index du champ en cours de mofification

  constructor(public get:GetService) { }

  ngOnInit(): void {
    this.initFormulaire();
  }
  /** Réinitialiser l'article */
  initFormulaire(){
    this.formulaire = new Formulaire();
    this.index = -1;
  }
  /** Récupérer un formulaire cliqué */
  getFormulaire(index:number){
    this.index = index;
    this.formulaire = this.get.formulaires[index];
  }
  /** Crée catégorie */
  upFormulaire(){
    this.get.setFireDoc('formulaires', {uid:this.formulaire.alias, doc:this.formulaire})
    .then(r => {
      this.get.formulaires[this.index] = this.formulaire;
      this.get.msg.msgOk('Article mis à jour', "Tout s'est bien passé, les données sont à jour.");
      this.initFormulaire();
    })
    .catch(er =>{
      this.get.msg.msgFail("Erreur dans la sauvegarde de l'article", er);
      console.log(er);
    });
  }
  /** Ajouter un nouvel article */
  addFormulaire(){
    this.get.setFireDoc('formulaires', {uid:this.formulaire.alias, doc:this.formulaire})
    .then(r => {
      this.get.formulaires.push(this.formulaire);
      this.get.msg.msgOk('Article a été ajouté', "Le nouvelle article est maintenant disponible.");
      this.initFormulaire();
    })
    .catch(er =>{
      this.get.msg.msgFail("Erreur dans la sauvegarde de l'article", er);
      console.log(er);
    });
  }
  /** Initialiser un nouveau champ de formulaire */
  initChamp(){
    this.champ = new Champ();
    this.indexChamp = -1;
    this.delBool = false;
    this.editBool = false;
  }
  /** Ajouter un champ au formulaire courant */
  ajouteChamp(){
    this.formulaire.champs.push(this.champ);
    this.initChamp();
  }
  supprChamp(){
    this.formulaire.champs.splice(this.indexChamp, 1);
  }
  setAjouteChamp(){
    this.editBool = true;
    this.champ = new Champ();
  }
  /** Supprimer un média */
  setSupprChamp(i:number){
    this.indexChamp = i;
    this.delBool = true;
  }
  editChamp(){
    this.formulaire.champs[this.indexChamp] = this.champ;
    this.initChamp();
  }
  setEditChamp(i:number){
    this.indexChamp = i;
    this.editBool = true;
  }
  /** Supprimer la catégorie */
  supprFormulaire(){
    this.get.fireSuppr('formulaires', this.get.formulaires[this.index].alias!);
    this.get.articles.splice(this.index, 1);
    this.initFormulaire();
  }
}
