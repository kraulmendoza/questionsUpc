import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPartidaPage } from './crear-partida.page';

describe('CrearPartidaPage', () => {
  let component: CrearPartidaPage;
  let fixture: ComponentFixture<CrearPartidaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearPartidaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPartidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
