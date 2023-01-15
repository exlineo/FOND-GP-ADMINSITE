import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, doc, getDoc, setDoc, writeBatch, where, limit, orderBy, deleteDoc } from "@angular/fire/firestore";
import { Storage, listAll, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { LienMenuI, MenuI, CategorieI, FormulaireI, PageI, ArticleI, MediaI } from 'src/app/systeme/modeles/types-i';
import { MsgService } from 'src/app/systeme/services/msg.service';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  liensMenus: Array<LienMenuI> = [];

  menus: Array<MenuI> = [];
  menu: MenuI = <MenuI>{};

  formulaires: Array<FormulaireI> = [];
  categories: Array<CategorieI> = [];
  articles: Array<ArticleI> = [];

  pages: any = {};
  page: PageI = { titre: '', accroche: '', contenu: '' };

  medias: Array<MediaI> = [];

  batch = writeBatch(this.dbf);

  constructor(private readonly dbf: Firestore, private readonly store: Storage, public readonly msg: MsgService) {
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
        // this.msg.msgOk('Menus chargés', 'Vous pourrez en éditer les liens.');
        m.forEach(menu => this.menus.push(menu.data() as MenuI));
        this.getFireLiens();
      })
      .catch(er => {
        this.msg.msgFail("Erreur dans le chargement des menus", `Merci de rééssayer en rechargeant la page (touche F5) (erreur : ${er})`);
        console.log(er)
      });
  }
  /** Appeler les liens dans la base de données */
  async getFireLiens() {
    await getDocs(collection(this.dbf, 'liens'))
      .then(m => {
        this.liensMenus = [];
        // this.msg.msgOk('Menus chargés', 'Vous pourrez en éditer les liens.');
        m.forEach(lien => this.liensMenus.push(lien.data() as LienMenuI));
      })
      .catch(er => {
        this.msg.msgFail("Erreur dans le chargement des menus", `Merci de rééssayer en rechargeant la page (touche F5) (erreur : ${er})`);
        console.log(er)
      });
  }
  /** Filtrer les liens de menu */
  liensByMenu(menu: string) {
    return this.liensMenus.filter(l => l.menus.includes(menu));
  }
  /** Récupérer la liste des données sur les pages */
  async getFirePages() {
    await getDocs(collection(this.dbf, 'pages'))
      .then(p => {
        p.forEach(c => {
          // this.msg.msgOk('Pages chargées', 'La liste des catégories a été chargée. On est carrément prêts.');
          this.pages[c.id] = c.data() as PageI;
          this.getFireFormulaires();
        });
      })
      .catch(er => {
        this.msg.msgFail("Erreur dans le chargement des pages", `Merci de rééssayer en rechargeant la page (touche F5) (erreur : ${er})`);
        console.log(er);
      });
    this.getMedias();
  }
  /** Récupérer les catégories
   * @param {string} collection Name of called collection
   * @param {string} param Searched object
   * @returns {promise} Send back object
   */
  async getFireCats() {
    await getDocs(collection(this.dbf, 'categories'))
      .then(cat => {
        this.categories = [];
        cat.forEach(c => {
          // this.msg.msgOk('Catégories chargées', 'La liste des catégories a été chargée. On est prêts.');
          this.categories.push(c.data() as CategorieI);
          this.getFireArticles();
        })
      })
      .catch(er => {
        this.msg.msgFail("Erreur dans le chargement des catégories", `Merci de rééssayer en rechargeant la page (touche F5) (erreur : ${er})`);
        console.log(er);
      });
  }
  /** Récupérer les catégories
   * @param {string} collection Name of called collection
   * @param {string} param Searched object
   * @returns {promise} Send back object
   */
  async getFireArticles() {
    await getDocs(collection(this.dbf, 'articles'))
      .then(art => {
        this.articles = [];
        art.forEach(c => {
          // this.msg.msgOk('Catégories chargées', 'La liste des catégories a été chargée. On est prêts.');
          this.articles.push(c.data() as ArticleI);
          this.getFirePages();
        })
      })
      .catch(er => {
        this.msg.msgFail("Erreur dans le chargement des articles", `Merci de rééssayer en rechargeant la page (touche F5) (erreur : ${er})`);
        console.log(er);
      });
  }
  /** Récupérer les catégories
   * @param {string} collection Name of called collection
   * @param {string} param Searched object
   * @returns {promise} Send back object
   */
  async getFireFormulaires() {
    await getDocs(collection(this.dbf, 'formulaires'))
      .then(art => {
        this.formulaires = [];
        art.forEach(c => {
          // this.msg.msgOk('Catégories chargées', 'La liste des catégories a été chargée. On est prêts.');
          this.formulaires.push(c.data() as FormulaireI);
        })
      })
      .catch(er => {
        this.msg.msgFail("Erreur dans le chargement des articles", `Merci de rééssayer en rechargeant la page (touche F5) (erreur : ${er})`);
        console.log(er);
      });
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
  /** Récupérer la liste des médias */
  async getMedias() {
    await getDocs(collection(this.dbf, 'medias'))
      .then(cat => {
        this.medias = [];
        cat.forEach(c => {
          // this.msg.msgOk('Liste des médias chargée', 'Vous les retrouverez dans la page médias.');
          this.medias.push(c.data() as MediaI);
        })
      })
      .catch(er => {
        this.msg.msgFail("Erreur dans le chargement des catégories", `Merci de rééssayer en rechargeant la page (touche F5) (erreur : ${er})`);
      });
  }
  /** Lister les objets stockés */
  async getStorage() {
    const listRef = ref(this.store);
    await listAll(listRef)
      .then(docs => {
        docs.prefixes.forEach(dossier => console.log(dossier));
        docs.items.forEach(item => console.log(item));
      })
  };
  /** Delete something in database */
  fireSuppr(collec: string, uid: string) {
    const customDoc = doc(this.dbf, collec, uid);
    deleteDoc(customDoc)
      .then(r => {
        this.msg.msgOk("Suppression réussie", `Les données ont été supprimées de la base de données`)
      })
      .catch(er => {
        console.log(er);
        this.msg.msgFail("Erreur dans la suppression des données", `Ca gratte un peu, il y a eu un problème dans la suppression des données : (erreur : ${er})`);
      })
  }
  /** Téléverser un fichier */
  async televerse(file: File, media: MediaI) {
    console.log(file);
    const telRef = ref(this.store, file.name);
    await uploadBytes(telRef, file)
      .then(r => {
        console.log(r);
        // Récupérer l'url uploadée pour ajouter le média à la base de données des médias
        getDownloadURL(r.ref).then(
          r => {
            console.log(r);
            media.url = r;
            media.id = file.name;
            this.setFireDoc('medias', { uid: file.name, doc: media })
              .then(r => {
                this.medias.push(media);
                this.msg.msgOk("Image ajoutée", `Génial, l'image a été ajoutée`);
              })
              .catch(er => {
                console.log(er);
                this.msg.msgFail("Erreur sur les données", `Le fichier a été téléversé mais pas les données en lien, merci de réessayer : (erreur : ${er})`);
              })
          }
        )
          .catch(er => {
            console.log(er);
            this.msg.msgFail("Erreur dans l'enregistrement du fichier", `L'URL du fichier n'a pas pu être récupérée, gurps : (erreur : ${er})`);
          })
      })
      .catch(er => {
        console.log(er);
        this.msg.msgFail("Erreur dans le téléversement", `Le fichier ne s'est pas bien téléverser. Voici l'erreur constatée : (erreur : ${er})`);
      });
  }
}
