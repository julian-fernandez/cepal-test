import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { PopupComponent } from './popup/popup.component';
import { MapacepalComponent } from './mapacepal/mapacepal.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PopupComponent,
    MapacepalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoiZmZpcnBvIiwiYSI6ImNraWl6MWlsMDAzdzAyc252YmVzajRlOHgifQ.TeEXBvMPb9YoHfLD8eTx0Q'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
