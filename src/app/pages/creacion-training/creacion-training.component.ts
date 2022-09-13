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
  csvBase64: string | any = "";

  constructor(private formBuilder: FormBuilder) {}

  public miFormulario: FormGroup = this.formBuilder.group({
    nombre: [, [Validators.required, Validators.minLength(3)], []],
    fechainicio: [, [Validators.required, Validators.minLength(3)], []],
    fechafinal: [, [Validators.required, Validators.minLength(3)], []],
    descripcion: [, [Validators.required, ], []],
    coach: [, [Validators.required ]],//select
    ruta: [, [Validators.required ]],//select leer validators
    csvFile: [, [Validators.required]]//file csv base64
  })

  convertToBase64() {//capturar
    //console.log(this.csvFile);
    this.csvFile = this.InputFile.nativeElement.files[0];
    const myReader = new FileReader();
    myReader.readAsDataURL(this.csvFile);
    this.csvBase64 = myReader.onloadend = e => {
      return myReader.result?.toString().split(',')[1];
      console.log("Dentro: "+this.csvBase64);
    };
    console.log("Fuera: "+this.csvBase64);
  }

  enviarFormulario() {
    //console.log(this.csvFile);
    console.log(this.miFormulario.value);
    //console.log(this.miFormulario.valid);
  }
//--------------------------------------------------------------//testing



}

