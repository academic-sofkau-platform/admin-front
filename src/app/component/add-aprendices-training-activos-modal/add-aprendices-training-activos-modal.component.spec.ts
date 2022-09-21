/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddAprendicesTrainingActivosModalComponent } from './add-aprendices-training-activos-modal.component';

describe('AddAprendicesTrainingActivosModalComponent', () => {
  let component: AddAprendicesTrainingActivosModalComponent;
  let fixture: ComponentFixture<AddAprendicesTrainingActivosModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAprendicesTrainingActivosModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAprendicesTrainingActivosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
