import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntranetRoutingModule } from './intranet-routing.module';
import { PrimeModule } from '../prime.module';

import { AccueilComponent } from './pages/accueil/accueil.component';
import { MenusComponent } from './pages/menus/menus.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { FormulairesComponent } from './pages/formulaires/formulaires.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { MediasComponent } from './pages/medias/medias.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ListeMediasComponent } from './pages/liste-medias/liste-medias.component';

@NgModule({
  declarations: [
    AccueilComponent,
    MenusComponent,
    CategoriesComponent,
    ArticlesComponent,
    FormulairesComponent,
    CollectionsComponent,
    MediasComponent,
    ListeMediasComponent
  ],
  imports: [
    CommonModule,
    IntranetRoutingModule,
    PrimeModule
  ]
})
export class IntranetModule { }
