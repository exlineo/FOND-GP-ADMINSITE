import { Component, OnInit } from '@angular/core';
import { GetService } from '../../systeme/services/get.service';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css']
})
export class InfosComponent implements OnInit {

  constructor(public get:GetService) { }

  ngOnInit(): void {
  }

}
