import { Component, Input, OnInit, Output } from '@angular/core';
import EventEmitter from 'events';

@Component({
  selector: 'app-mapacepal',
  templateUrl: './mapacepal.component.html',
  styleUrls: ['./mapacepal.component.scss']
})
export class MapacepalComponent implements OnInit {
@Input() zoom:number = 12;
@Input() center:any = [0, 0];
@Input() style:any = 'mapbox://styles/mapbox/streets-v9';
@Output() mapLoad = new EventEmitter;
  constructor() { }

  ngOnInit(): void {
  }

}
