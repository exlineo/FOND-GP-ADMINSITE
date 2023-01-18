import { Pipe, PipeTransform } from '@angular/core';
import { ArticleI, CategorieI, LienMenuI } from 'src/app/systeme/modeles/types-i';

@Pipe({
  name: 'utils'
})
export class UtilsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
/** Filter les catégories */
@Pipe({
  name: 'cats'
})
export class CatsPipe implements PipeTransform {

  transform(value:Array<CategorieI>, str:string): Array<CategorieI> {
    if(!value) return [];
    if(!str || str.length < 3) return value;

    return value.filter(f => f.titre.toLowerCase().indexOf(str.toLowerCase()) != -1);
  }

}
/** Filter les catégories */
@Pipe({
  name: 'articles'
})
export class ArticlesPipe implements PipeTransform {

  transform(value:Array<ArticleI>, str:string): Array<ArticleI> {
    if(!value) return [];
    if(!str || str.length < 3) return value;
    return value.filter(f => f.titre.toLowerCase().indexOf(str.toLowerCase()) != -1 && f.alias.toLowerCase().indexOf(str.toLowerCase()));
  }
}
/** Filter les liens */
@Pipe({
  name: 'liens'
})
export class LiensPipe implements PipeTransform {

  transform(value:Array<LienMenuI>, str:string): Array<LienMenuI> {
    if(!value) return [];
    if(!str || str.length < 3) return value;
    return value.filter(f => f.titre.toLowerCase().indexOf(str.toLowerCase()) != -1 && f.alias.toLowerCase().indexOf(str.toLowerCase()));
  }
}
/** Filter les catégories */
@Pipe({
  name: 'bool'
})
export class BoolPipe implements PipeTransform {

  transform(bool:boolean): string {
    if(bool) return 'oui';
    return 'non';
  }
}
