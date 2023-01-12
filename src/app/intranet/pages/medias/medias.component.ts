import { Component, OnInit } from '@angular/core';
import { GetService } from '../../systeme/services/get.service';

@Component({
  selector: 'app-medias',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.css']
})
export class MediasComponent implements OnInit {

  constructor(public get:GetService) { }

  ngOnInit(): void {
  }

}
