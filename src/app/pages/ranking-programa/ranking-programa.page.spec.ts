import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingProgramaPage } from './ranking-programa.page';

describe('RankingProgramaPage', () => {
  let component: RankingProgramaPage;
  let fixture: ComponentFixture<RankingProgramaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingProgramaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingProgramaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
