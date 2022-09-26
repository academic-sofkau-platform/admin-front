import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaAprendizComponent } from './tarea-aprendiz.component';

describe('TareaAprendizComponent', () => {
  let component: TareaAprendizComponent;
  let fixture: ComponentFixture<TareaAprendizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareaAprendizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TareaAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
