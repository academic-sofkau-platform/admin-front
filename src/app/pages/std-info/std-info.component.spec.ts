/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StdInfoComponent } from './std-info.component';

describe('StdInfoComponent', () => {
  let component: StdInfoComponent;
  let fixture: ComponentFixture<StdInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StdInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StdInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
