import { Pipe, PipeTransform } from '@angular/core';
import { CategorieI } from 'src/app/systeme/modeles/types-i';

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
