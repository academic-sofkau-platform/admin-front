import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-creacion-training',
  templateUrl: './creacion-training.component.html',
  styleUrls: ['./creacion-training.component.css']
})
export class CreacionTrainingComponent  {

  @ViewChild("csvFile", {
    read: ElementRef
  }) InputFile!: ElementRef;

  csvFile: any;

  public miFormulario: FormGroup = this.formBuilder.group({
    nombre: [, [Validators.required, Validators.minLength(3)], []],
    fechainicio: [, [Validators.required, Validators.minLength(3)], []],
    fechafinal: [, [Validators.required, Validators.minLength(3)], []],
    descripcion: [, [Validators.required, ], []],
    //coach: [, [Validators.required, Validators.minLength(3), []],
    //ruta: [, [Validators.required, Validators.minLength(3), []],
  })

  constructor(private formBuilder: FormBuilder) {}

  convertToBase64() {//capturar
    this.csvFile = this.InputFile.nativeElement.files[0];
    console.log(this.csvFile);
  }

  enviarFormulario() {
    console.log(this.csvFile);
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);
  }

}

