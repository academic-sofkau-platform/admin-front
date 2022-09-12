import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-ruta-aprendizaje',
  templateUrl: './ruta-aprendizaje.component.html',
  styleUrls: ['./ruta-aprendizaje.component.css']
})

export class RutaAprendizajeComponent implements OnInit {
  miFormulario:FormGroup = this.formBuilder.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    descripcion: [, [Validators.required, Validators.min(1)]],
    rutas: this.formBuilder.array([this.formBuilder.group({
      nivel: [, [Validators.required, Validators.min(0)]],
      curso: [,[Validators.required, Validators.min(1)]],
      prerrequisitos:[,[Validators.required, Validators.min(0)]]
    })])
    
  })

  constructor(public api: ApiService, private formBuilder: FormBuilder) {
  }
 
  get getRutas(){
    return this.miFormulario.get('rutas') as FormArray;
  }

  addRutas(){
    const rutasFormGroup = this.formBuilder.group({
      nivel:'',
      curso:'',
      prerrequisitos:''
    });
    this.getRutas.push(rutasFormGroup);
  }

  ngOnInit() {}

  crearRutaAprendizaje(){
    this.api.crearRutaAprendizaje({
      nombre: this.miFormulario.value.nombre,
      descripcion: this.miFormulario.value.descripcion,
      rutas: []
    })
    .subscribe()
  }
 

 

}
