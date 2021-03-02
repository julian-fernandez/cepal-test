import { Injectable } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 35.0116;
  lng = 80.7681;
  zoom = 11;
  json: any;

  constructor(private http: HttpClient) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }
  public buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/ffirpo/ckkcxtf162clq17nis548dlzv',
      center: [-87.637596, 41.940403],
      zoom: 11,
    });

    this.map.addControl(new mapboxgl.NavigationControl());
/*     this.getGeoJson(); */
  }
  getJson(): Observable<any>{
    let subject = new Subject<any>();
    this.http.get('assets/chicago-parks.geojson').subscribe((json: any) => {
      subject.next(json);
    });

    return subject.asObservable();
}
  public getGeoJson() {
    this.http.get('assets/chicago-parks.geojson').subscribe((json: any) => {
      this.json = json;
      console.log(this.json);
      this.json.features.forEach((marker) => {
        // create a HTML element for each feature
        /*var el = document.createElement('div');
        el.className = 'marker';
        console.log(marker.geometry.coordinates);
        new mapboxgl.Marker()
          .setLngLat(marker.geometry.coordinates)
          .addTo(this.map);*/
        var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          '<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>');
        var el = document.createElement('div');
        el.id = 'marker';
        new mapboxgl.Marker({
          draggable: true
        })
          .setLngLat(marker.geometry.coordinates)
          .setPopup(popup)
          .addTo(this.map);
      });
      // add data to geocoder

      /* this.setGeoCoder(); */
      /* this.forwardGeocoder(); */
    });
  }

  public setGeoCoder() {
    console.log(this.json);
/*     var geocoder = new MapboxGeocoder({ 
      accessToken: mapboxgl.accessToken, 
      mapboxgl: mapboxgl, 
      marker: false, 
      placeholder: 'Haga su búsqueda acá',
      localGeocoder: forwardGeocoder
    });
    this.map.addControl(geocoder); */
  }
  onMapLoad(map: mapboxgl.Map) {
    debugger
    let forwardGeocoder = (query): any => {
       var matchingFeatures:any = [];
       for (var i = 0; i < this.json.features.length; i++) {
         var feature = this.json.features[i];
         if (
           feature.properties.title.toLowerCase().search(query.toLowerCase()) !==
           -1
         ) {
           feature["place_name"] = "🌲 " + feature.properties.title;
           feature["center"] = feature.geometry.coordinates;
           feature["place_type"] = ["park"];
           matchingFeatures.push(feature);
         }
       }
       return matchingFeatures;
     }
 
     map.addControl(
       new MapboxGeocoder({
         accessToken: environment.mapbox.accessToken,
         localGeocoder: forwardGeocoder,
         mapboxgl: mapboxgl,
         placeholder: "asdsadsak"
       })
     );
   }
/*   public forwardGeocoder() {
    var data = this.json;
    console.log(data);
    debugger
    var matchingFeatures: any = [];
    if (this.json) {
      for (var i = 0; i < this.json.features.length; i++) {
        var feature = this.json.features[i];
        if (this.json) {
          feature['place_name'] = '🌲 ' + feature.properties.title;
          feature['center'] = feature.geometry.coordinates;
          feature['place_type'] = ['park'];
          matchingFeatures.push(feature);
        }
      }
    }
    return matchingFeatures;
  } */

}
