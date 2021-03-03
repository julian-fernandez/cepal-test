import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Marker } from 'mapbox-gl';
import { MapService } from '../map.service';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map!: mapboxgl.Map;
  geojson: any;
  coordinates: any;
  constructor(private mapService: MapService, private http: HttpClient) {
  }
  ngOnInit() {
    this.mapService.getJson().subscribe(data => {
      this.geojson = data;
      /* this.generateMarkers(this.geojson); */
     /*  this.setInfoCards(this.geojson); */
    });
  }

  setInfoCards(geodata){
    geodata.features.forEach((marker) => {
    var popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(marker.geometry.coordinates)
    .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>')
    .addTo(this.map);
    });
  }
  generateMarkers(geodata) {
    geodata.features.forEach((marker) => {
      let that = this;
      new mapboxgl.Marker({
        draggable: true
      })
        .setLngLat(marker.geometry.coordinates)
        .addTo(this.map);
    });
  }
  forwardGeocoder(query) {
      var matchingFeatures: any = [];
      for (var i = 0; i < this.geojson.features.length; i++) {
        var feature = this.geojson.features[i];
        if (
          feature.properties.title
            .toLowerCase()
            .search(query.toLowerCase()) !== -1
        ) {
          feature['place_name'] = '🌲 ' + feature.properties.title;
          feature['center'] = feature.geometry.coordinates;
          feature['place_type'] = ['park'];
          matchingFeatures.push(feature);
          console.log(matchingFeatures);
        }
      }
      return matchingFeatures;
  }

  onMapLoad(map: any) {
    this.map = map;
    var geodata = this.geojson;
    function forwardGeocoder(this: any, query) {
        var matchingFeatures: any = [];
        for (var i = 0; i < geodata.features.length; i++) {
          var feature = geodata.features[i];
          // pa manejar las mayúsculas
          if (
            feature.properties.title
              .toLowerCase()
              .search(query.toLowerCase()) !== -1
          ) {
            // sirve esto pa algo? Se puede poner un prefijo o bleh antes de un resultado "custom"
            feature['place_name'] = '🌲 ' + feature.properties.title;
            feature['center'] = feature.geometry.coordinates;
            feature['place_type'] = ['park'];
            matchingFeatures.push(feature);
          }
        }
        return matchingFeatures;
    }
    map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      localGeocoder: forwardGeocoder,
      zoom: 14,
      placeholder: 'placeholder pa la búsqueda',
      mapboxgl: mapboxgl
    }));
  }

  onDragEnd(marker: Marker) {
    this.coordinates = marker.getLngLat().toArray();
  }
}
