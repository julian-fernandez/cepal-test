import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapacepalComponent } from './mapacepal.component';

describe('MapacepalComponent', () => {
  let component: MapacepalComponent;
  let fixture: ComponentFixture<MapacepalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapacepalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapacepalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
