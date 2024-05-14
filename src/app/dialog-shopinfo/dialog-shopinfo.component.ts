import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps'
import { MapMarker } from '@angular/google-maps';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-shopinfo',
  standalone: true,
  imports: [GoogleMapsModule,
    MapMarker,
    MatIcon
  ],
  templateUrl: './dialog-shopinfo.component.html',
  styleUrl: './dialog-shopinfo.component.scss'
})

export class DialogShopinfoComponent implements OnInit {
  center;

  marker = {
    position: {
      lat: 52.36934518753538,
      lng: 8.618305169886996
    },
  }

  constructor() {
    this.center = {
      lat: 52.36934518753538,
      lng: 8.618305169886996
    }
  }

  ngOnInit() {
  }
}
