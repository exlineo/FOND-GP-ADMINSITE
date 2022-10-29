import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, doc, getDoc, setDoc, query, where, limit, orderBy } from "@angular/fire/firestore";
import { CiblesE, LienMenuI, MenuI, CategorieI, StyleE, FormulaireI, TemplateE, LienMenu, PageI } from 'src/app/systeme/modeles/types-i';
import { MsgService } from 'src/app/systeme/services/msg.service';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  liensMenus: Array<LienMenuI> = [];
  lienMenu: LienMenuI = new LienMenu();

  menus: Array<MenuI> = [];
  menu: MenuI = <MenuI>{};

  formulaires: Array<FormulaireI> = [];
  categories: Array<CategorieI> = [];

  pages: any = {};
  page: PageI = { titre: '', accroche: '', contenu: '' };

  constructor(public dbf: Firestore, private msg:MsgService) {
    this.getFireCats(); // Récupérer la liste des collections
  }

  /**
   * Get entire collection
   * @param {string} collection Collection name to get
   * @returns {promise} Returns data received
   */
  async getFireCol(collec: string) {
    return await getDocs(collection(this.dbf, collec));
  }
  /** Récupérer les menus du site */
  async getFireMenus() {
    await getDocs(collection(this.dbf, 'menus'))
      .then(m => {
        this.menus = [];
        this.msg.msgOk('Menus chargés', 'Vous pourrez en éditer les liens.');
        m.forEach(menu => this.menus.push(menu.data() as MenuI));
        console.log(this.menus)
      })
      .catch(er => {
        this.msg.msgFail("Erreur dans le chargement des menus", `Merci de rééssayer en rechargeant la page (touche F5) (erreur : ${er})`);
        console.log(er)});
  }
  /** Récupérer la liste des données sur les pages */
  async getFirePages(){
    await getDocs(collection(this.dbf, 'pages'))
    .then(p => {
      p.forEach(c => {
        this.msg.msgOk('Pages chargées', 'La liste des catégories a été chargée. On est carrément prêts.');
        this.pages[c.id] = c.data() as PageI;
      })
    })
    .catch(er => {
      this.msg.msgFail("Erreur dans le chargement des pages", `Merci de rééssayer en rechargeant la page (touche F5) (erreur : ${er})`);
      console.log(er);
    });
  }
  /** Récupérer les catégories
   * @param {string} collection Name of called collection
   * @param {string} param Searched object
   * @returns {promise} Send back object
   */
   async getFireCats() {
    await getDocs(collection(this.dbf, 'categories'))
    .then(cat => {
      cat.forEach(c => {
        this.msg.msgOk('Catégories chargées', 'La liste des catégories a été chargée. On est prêts.');
        this.categories.push(c.data() as CategorieI);
      })
    })
    .catch(er => {
      this.msg.msgFail("Erreur dans le chargement des catégories", `Merci de rééssayer en rechargeant la page (touche F5) (erreur : ${er})`);
      console.log(er);
    });
    this.getFirePages();
  }
  /**
   * Get pecific object with parameters
   * @param {string} collection Name of called collection
   * @param {string} param Searched object
   * @returns {promise} Send back object
   */
  async getFireDoc(collec: string, param: string) {
    const customDoc = doc(this.dbf, collec, param);
    return await getDoc(customDoc);
  }
  /**
   * write a document on Firestore
   * @param collec Name of collection
   * @param data Object with UID to write
   * @returns {promise} Returns a promise
   */
  async setFireDoc(collec: string, data: { uid: string, doc: any }) {
    const customDoc = doc(this.dbf, collec, data.uid);
    return await setDoc(customDoc, JSON.parse(JSON.stringify(data.doc)), { merge: true }); // Mettre à jour un objet existant
  }
}
