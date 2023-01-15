import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  /** Liste des styles pour les pages */
  styles = [
    {
      titre:'Blog',
      description:'Afficher les articles en ligne sur une colonne',
      alias:'blog'
    },
    {
      titre:'Contact',
      description:"Mise en forme d'une page de contact",
      alias:'contact'
    },
    {
      titre:'Equipe',
      description:'Afficher les images des équipes avec le nom de la personne en dessous.',
      alias:'equipe'
    },
    {
      titre:'Mur',
      description:"Mur d'images",
      alias:'mur'
    }
  ];
  /** Liste des templates disponibles pour les mises en page du site */
  templates = [
    {
      titre:'Page blog (par défaut)',
      description:'Affichage des articles en blog sur une colonne.',
      alias:'blog'
    },
    {
      titre:'Page blog alterné',
      description:"Affichage d'une liste d'articles sur deux colonnes alternés.",
      alias:'blogAlterne'
    },
    {
      titre:'Page Formulaire',
      description:'Créer une page de formulaire.',
      alias:'equipe'
    },
    {
      titre:'Page annuaire',
      description:'Afficher des articles et une carte connectée.',
      alias:'annuaire'
    },
    {
      titre:'Page catégorie',
      description:'Affichage des articles sur une colonne et des informations de la catégorie sur une deuxième colonne.',
      alias:'categorie'
    },
    {
      titre:'Page catégorie (+menu droite)',
      description:'Afficher la catégorie mais aussi un sous-menu sur la droite.',
      alias:'categorieMenuDroite'
    },
    {
      titre:'Page catégorie (+menu gauche)',
      description:"Afficher des articles a gauche avec un sous-menu. La catégorie s'affiche à droite.",
      alias:'categorieMenuGauche'
    },
    {
      titre:'Page catégorie intégrée',
      description:"Les article d'une catégorie sont affichés dans une page depuis un sous menu (exemple la pages collections).",
      alias:'categorieIntegree'
    },
    {
      titre:'Page de contact',
      description:"Affichage d'une page de contact.",
      alias:'contact'
    },
    {
      titre:'Page portfolio',
      description:"Affichage d'un mur d'articles avec les images d'introduction en visuel.",
      alias:'portfolio'
    },
    {
      titre:"Page collection d'images",
      description:"Afficher une collection d'images.",
      alias:'collectionImages'
    },
    {
      titre:'Page collection mixte',
      description:"Afficher une collection mixte.",
      alias:'collectionMixte'
    }
  ]
  constructor() { }
}
