import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRutaAprendizajeComponent } from './lista-ruta-aprendizaje.component';

describe('ListaRutaAprendizajeComponent', () => {
  let component: ListaRutaAprendizajeComponent;
  let fixture: ComponentFixture<ListaRutaAprendizajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaRutaAprendizajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaRutaAprendizajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
