/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AgregarAprendicesTrainingActivoComponent } from './agregar-aprendices-training-activo.component';

describe('AgregarAprendicesTrainingActivoComponent', () => {
  let component: AgregarAprendicesTrainingActivoComponent;
  let fixture: ComponentFixture<AgregarAprendicesTrainingActivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarAprendicesTrainingActivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAprendicesTrainingActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
