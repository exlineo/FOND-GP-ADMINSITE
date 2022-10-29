import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccueilComponent } from './pages/accueil/accueil.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { FormulairesComponent } from './pages/formulaires/formulaires.component';
import { MediasComponent } from './pages/medias/medias.component';
import { MenusComponent } from './pages/menus/menus.component';

const routes: Routes = [
  { path:'', component:AccueilComponent, children:[
    { path:'menus', component:MenusComponent },
    { path:'categories', component:CategoriesComponent },
    { path:'articles', component:ArticlesComponent },
    { path:'collections', component:CollectionsComponent },
    { path:'formulaires', component:FormulairesComponent },
    { path:'medias', component:MediasComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntranetRoutingModule { }
