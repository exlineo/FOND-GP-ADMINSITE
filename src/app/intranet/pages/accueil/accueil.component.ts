import { Component, OnInit } from '@angular/core';
import { PageI } from 'src/app/systeme/modeles/types-i';
import { GetService } from '../../systeme/services/get.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {


  page:PageI = { titre: '', accroche: '', contenu: '' };

  constructor(public get:GetService) { }

  ngOnInit(): void {
    this.page = this.get.pages.accueil;
  }

}
