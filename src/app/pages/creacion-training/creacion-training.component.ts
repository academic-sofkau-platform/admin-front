import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TrainingModel } from 'src/app/shared/models/training';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-creacion-training',
  templateUrl: './creacion-training.component.html',
  styleUrls: ['./creacion-training.component.css']
})
export class CreacionTrainingComponent {

  dataSource: TrainingModel[] = [];
  trainingForm: FormGroup;
  constructor(
    public api: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.trainingForm = new FormGroup({
      nombre: new FormControl(),
      descripcion: new FormControl(),
      fechaInicio: new FormControl(),
      fechaFinal: new FormControl(),
    })
  }

  csvFile: any;//?
  csvBase64: string | any = "";
  csvFileName: string = "";

  public miFormulario: FormGroup = this.formBuilder.group({
    nombre: [, [Validators.required, Validators.minLength(3)], []],
    fechainicio: [, [Validators.required, Validators.minLength(3)], []],
    fechafinal: [, [Validators.required, Validators.minLength(3)], []],
    descripcion: [, [Validators.required, ], []],
    coach: [, [Validators.required ]],//select
    ruta: [, [Validators.required ]],//select leer validators
    csvFile: [, [Validators.required]]//file csv base64
  })

  convertToBase64(event: any) {
    const file:File = event.target.files[0];
    this.csvFile = file;//?

    if (file) {

        this.csvFileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);

        //const upload$ = this.http.post("/api/thumbnail-upload", formData);

        // upload$.subscribe();
        console.log(this.csvFileName);
    }
  }

  enviarFormulario(): void {
    console.log("enviado");
    console.log(this.miFormulario);

    //this.api.crearTraining();
  }
  //--------------------------------------------------------------//testing
  // fileName:string = '';

  // onFileSelected(event: any) {

  //     const file:File = event.target.files[0];

  //     if (file) {

  //         this.fileName = file.name;

  //         const formData = new FormData();

  //         formData.append("thumbnail", file);

  //         const upload$ = this.http.post("/api/thumbnail-upload", formData);

  //         upload$.subscribe();
  //     }
  // }
}




