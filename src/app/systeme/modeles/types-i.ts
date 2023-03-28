export interface TypesI {
}
/** ENUMERATIONS */
export enum MiseEnPageE {

}
export enum CiblesE {
  blank = '_blank',
  self = '_self'
}
export enum TemplateE {
  blog = 'blog'
}
export enum PositionE {
  pied = 'footer',
  entete = 'entete',

}
export enum ChampE {
  input = 'input',
  area = 'textarea',
  select = 'select',
  checkbox = 'checkbox',
  radio = 'radio'
}
export enum StyleE {
  blog = 'blog',
  article = 'article',
  alterne = 'alterne',
  equipe = 'equipe',
  mur = 'mur',
  contact = 'contact',
  form = 'formulaire'
}
/** INTERFACES */
export interface PageI{
  titre:string;
  accroche:string;
  contenu?:string;
}
export interface MediaI {
  id?:string;
  titre?: string;
  url: string;
  caption?: string;
}
export interface LienI {
  titre: string;
  url: string;
  caption?: string;
  cible?: string;
}
export interface MiseEnPageI {
  titre: string;
  alias: string;
  description?: string
}
export interface LienMenuI {
  titre: string;
  alias: string;
  url: string;
  description?: string;
  cible?: CiblesE;
  menus: Array<string>;
  sousmenu?:string;
  parent?: string;
  template?: TemplateE;
  formulaire?: FormulaireI;
  style?: string;
  categories?: Array<CategorieI>;
  articles?: Array<ArticleI>;
  ordre?: number;
}
export interface CategorieI {
  titre: string;
  alias: string;
  description: string;
  media?: MediaI;
  articles: Array<{titre:string, alias:string}>;
  ordre?: number;
}
export interface ArticleI {
  titre: string;
  alias: string;
  categories?: Array<string>;
  intro?: string;
  mediaIntro?: MediaI;
  contenu?: string;
  mediaContenu?: MediaI;
  liens?: Array<LienI>;
  ordre?: number;
}
export interface FormulaireI {
  titre: string;
  alias: string;
  description?: string;
  email?: string;
  destination?: string;
  champs: Array<ChampI>;
  ordre?: number;
}
export interface ChampI {
  titre: string;
  alias: string;
  infos?: string;
  aide?: string;
  type: ChampE;
  required?: boolean;
  options?: string;
}
export interface MenuI {
  titre: string;
  alias: string;
  description?: string;
  liens:Array<LienMenuI>;
  position: PositionE;
  ordre?: number;
}
/** Classes à instancier */
export class LienMenu implements LienMenuI {
  titre = "";
  alias = "";
  url = "";
  description = "";
  cible = CiblesE.self;
  menus = [];
  parent = "";
  template = TemplateE.blog;
  formulaire = <FormulaireI>{};
  style = <StyleE>{};
  categories = [];
  articles = [];
  ordre = 0
}
export class Menu implements MenuI {
  titre = "";
  alias = "";
  description = "";
  liens = [];
  position = PositionE.entete;
  ordre = 0;
}
export class Article implements ArticleI {
  titre = "";
  alias = "";
  categories = [];
  intro = "";
  mediaIntro = <MediaI>{};
  contenu = "";
  mediaContenu = <MediaI>{};
  liens = [];
  ordre = 0;
}
export class Categorie implements CategorieI{
  titre = '';
  alias = '';
  description = '';
  media = <MediaI>{};
  articles = [];
  ordre = 0;
}
export class Formulaire implements FormulaireI {
  titre = '';
  alias = '';
  description = '';
  email = '';
  destination = '';
  champs = [];
  ordre = 0;
}
export class Champ implements ChampI {
  titre = '';
  alias = '';
  infos = '';
  aide = '';
  type = ChampE.input;
  required = false;
  options = '';
}
