import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TrainingModel } from 'src/app/shared/models/training';
import { ApiService } from 'src/app/shared/services/api.service';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-creacion-training',
  templateUrl: './creacion-training.component.html',
  styleUrls: ['./creacion-training.component.css']
})
export class CreacionTrainingComponent {

  csvFile: any;//?
  csvBase64 : string = "";
  csvFileName: string = "";

  constructor(
    public api: ApiService,
    private formBuilder: FormBuilder
  ) {}

  public miFormulario: FormGroup = this.formBuilder.group({
    nombre: [, [Validators.required, Validators.minLength(3)], []],
    fechainicio: [, [Validators.required, Validators.minLength(3)], []],
    fechafinal: [, [Validators.required, Validators.minLength(3)], []],
    descripcion: [, [Validators.required, ], []],
    coach: [, [Validators.required ]],//select
    ruta: [, [Validators.required ]],//select leer validators
    csvBase64input: [, [Validators.required, Validators.minLength(300)], []]
  })

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.csvFileName = file.name;
    this.convertToBase64(file).subscribe(base64 => {
      this.csvBase64 = base64;
    });
  }

  convertToBase64(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event: any) => result.next(btoa(event.target.result.toString()));
    return result;
  }

  enviarFormulario(): void {
    console.log("enviado");
    //console.log(this.csvBase64);
      // console.log(this.miFormulario.get("nombre")?.value);
      // console.log(this.miFormulario.get("fechainicio")?.value);
      // console.log(this.miFormulario.get("fechafinal")?.value);
      // console.log(this.miFormulario.get("descripcion")?.value);
      // console.log(this.miFormulario.get("coach")?.value);
      // console.log(this.miFormulario.get("ruta")?.value);
      // console.log(this.miFormulario.get("csvBase64input")?.value);
    console.log(this.miFormulario.value);
    //console.log(this.csvBase64,"this.csvBase64");
    //this.api.crearTraining();
  }
  //--------------------------------------------------------------//testing

}




