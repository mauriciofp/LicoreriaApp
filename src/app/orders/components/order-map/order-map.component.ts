import { Component, OnInit } from '@angular/core';

import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-map',
  templateUrl: './order-map.component.html',
  styleUrls: ['./order-map.component.scss'],
})
export class OrderMapComponent implements OnInit {
  orderMap: Mapboxgl.Map;

  constructor() {}

  ngOnInit() {
    this.createMap();
  }

  createMap() {
    (Mapboxgl.accessToken as any) = environment.mapBoxKey;
    this.orderMap = new Mapboxgl.Map({
      container: 'orderMap',
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
      center: [-66.16090109719788, -17.442175031276946],
      zoom: 14.5,
    });
    this.createdMarker(-66.16090109719788, -17.442175031276946);
  }

  createdMarker(lng: number, lat: number) {
    const marker = new Mapboxgl.Marker({ draggable: true })
      .setLngLat([lng, lat])
      .addTo(this.orderMap);
    marker.on('dragend', () => {
      const location = `${marker.getLngLat().lng},${marker.getLngLat().lat}`;
      console.log(location);
      // llamar al store para guardar
    });
  }
}
