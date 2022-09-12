import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-ruta-aprendizaje',
  templateUrl: './ruta-aprendizaje.component.html',
  styleUrls: ['./ruta-aprendizaje.component.css']
})

export class RutaAprendizajeComponent implements OnInit {
  miFormulario: FormGroup = this.formBuilder.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    descripcion: [, [Validators.required, Validators.min(1)]],
    nivel: [, [Validators.required, Validators.min(0)]]
  })

  constructor(public api: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
  }

  crearRutaAprendizaje(){
    this.api.crearRutaAprendizaje({
      nombre: this.miFormulario.value.nombre,
      descripcion: this.miFormulario.value.descripcion,
      rutas: []
    })
    .subscribe()
  }

}
