import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { Observable, ReplaySubject } from 'rxjs';
import { RutaAprendizajeModel } from 'src/app/shared/models/ruta-aprendizaje';

@Component({
  selector: 'app-creacion-training',
  templateUrl: './creacion-training.component.html',
  styleUrls: ['./creacion-training.component.css']
})
export class CreacionTrainingComponent {

  csvFileName: string = "";
  rutasAprendizaje: RutaAprendizajeModel[] = [];

  constructor(
    public api: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.api.getRutasAprendizaje().subscribe((rutas: RutaAprendizajeModel[]) => {
      this.rutasAprendizaje = rutas;
    });
  }

  public miFormulario: FormGroup = this.formBuilder.group({
    nombre: [, [Validators.required, Validators.minLength(3)], []],
    fechainicio: [, [Validators.required], []],
    fechafinal: [, [Validators.required], []],
    descripcion: [, [Validators.required, ], []],
    coach: [, [Validators.required ]],
    ruta: [, [Validators.required ]]
  })

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.csvFileName = file.name;
    this.convertToBase64(file).subscribe(base64 => {
      this.miFormulario.value.csvBase64 = base64;
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
    console.log(this.miFormulario.value.ruta.id);
    this.api.crearTraining({
      name: this.miFormulario.value.nombre,
      description: this.miFormulario.value.descripcion,
      startDate: this.miFormulario.value.fechainicio,
      endDate: this.miFormulario.value.fechafinal,
      coach: this.miFormulario.value.coach,
      apprentices: this.miFormulario.value.csvBase64,
      rutaId: this.miFormulario.value.ruta
    }).subscribe();
  }
}




