import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/systeme/services/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  oublie:boolean = false; // Variable pour afficher la récupération du mode de passe
  connexion = {mail:'', pass:''}

  constructor(public auth:AuthService) { }

  ngOnInit(): void {
  }
}
