import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as Mapboxgl from 'mapbox-gl';
import { Location } from 'src/app/interfaces/order';
import {
  setLocation,
  unsetLocation,
} from 'src/app/state/actions/location.action';
import { AppState } from 'src/app/state/app.reducer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-map',
  templateUrl: './order-map.component.html',
  styleUrls: ['./order-map.component.scss'],
})
export class OrderMapComponent implements OnInit, OnDestroy {
  orderMap: Mapboxgl.Map;

  @Input() location: Location = { lng: null, lat: null };

  private defaultLocation: Location = {
    lng: -66.15689346418048,
    lat: -17.393779843949304,
  };

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.createMap();
  }

  ngOnDestroy() {
    this.store.dispatch(unsetLocation());
  }

  createMap() {
    (Mapboxgl.accessToken as any) = environment.mapBoxKey;
    this.orderMap = new Mapboxgl.Map({
      container: 'orderMap',
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
      center: this.location.lat
        ? [this.location.lng, this.location.lat]
        : [this.defaultLocation.lng, this.defaultLocation.lat],
      zoom: 16,
    });
    if (this.location.lat) {
      this.createdMark();
    } else {
      this.createdMarkerWithDrag();
    }
  }

  createdMarkerWithDrag() {
    const marker = new Mapboxgl.Marker({ draggable: true })
      .setLngLat([this.defaultLocation.lng, this.defaultLocation.lat])
      .addTo(this.orderMap);
    marker.on('dragend', () => {
      this.store.dispatch(
        setLocation({
          lng: marker.getLngLat().lng,
          lat: marker.getLngLat().lat,
        })
      );
    });
  }

  createdMark() {
    new Mapboxgl.Marker()
      .setLngLat([this.location.lng, this.location.lat])
      .addTo(this.orderMap);
  }
}
