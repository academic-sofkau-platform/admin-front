/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TareasAprendizComponent } from './tareas-aprendiz.component';

describe('TareasAprendizComponent', () => {
  let component: TareasAprendizComponent;
  let fixture: ComponentFixture<TareasAprendizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareasAprendizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
