/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListasComponent } from './listas.component';

describe('ListasComponent', () => {
  let component: ListasComponent;
  let fixture: ComponentFixture<ListasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
