/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InformacionCalificacionAprendizComponent } from './Informacion-calificacion-aprendiz.component';

describe('InformacionCalificacionAprendizComponent', () => {
  let component: InformacionCalificacionAprendizComponent;
  let fixture: ComponentFixture<InformacionCalificacionAprendizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionCalificacionAprendizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionCalificacionAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
