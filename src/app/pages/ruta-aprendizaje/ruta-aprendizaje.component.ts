import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CursoModel } from 'src/app/shared/models/curso';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-ruta-aprendizaje',
  templateUrl: './ruta-aprendizaje.component.html',
  styleUrls: ['./ruta-aprendizaje.component.css']
})

export class RutaAprendizajeComponent implements OnInit{
  rutaAprendizajeId: string = ""
  rutaAprendizaje: any;
  modificando:boolean = false;

  //Cosas rancias
  nombre: string = ""
  descripcion: string = ""

  miFormulario:FormGroup = this.formBuilder.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    descripcion: [, [Validators.required, Validators.min(1)]],
    rutas: this.formBuilder.array([
      this.formBuilder.group({
        nivel: [, [Validators.required, Validators.min(0)]],
        curso: [,[Validators.required, Validators.min(1)]],
        prerrequisitos:[,[Validators.required, Validators.min(0)]]
      })
    ])
  })

  //Cursos.
  listaCursos: CursoModel[] = [];
  constructor(public api: ApiService, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.api.getCursos().subscribe((element) => this.listaCursos = element);
  }

  get getRutas(){
    return this.miFormulario.get('rutas') as FormArray;
  }

  addRutas(){
    const control = <FormArray> this.miFormulario.controls['rutas']
    control.push(this.formBuilder.group({
        nivel: [, [Validators.required, Validators.min(0)]],
        curso: [,[Validators.required, Validators.min(1)]],
        prerrequisitos:[,[Validators.required, Validators.min(0)]]
    }));
  }

  removeRuta(indice: number) {
    this.getRutas.removeAt(indice);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.rutaAprendizajeId = params['id'];
      if(this.rutaAprendizajeId != null){
        this.api.getRutaAprendizaje(this.rutaAprendizajeId).subscribe((element:any) => {
          this.rutaAprendizaje = element;
          this.nombre = this.rutaAprendizaje.nombre;
          this.descripcion = this.rutaAprendizaje.descripcion;
          this.removeRuta(0);
          this.addRutasMod(this.rutaAprendizaje.rutas)
        });

      }
    })
  }

  addRutasMod(rutas: any){
    const control = <FormArray> this.miFormulario.controls['rutas']

    rutas.forEach((ruta: any) => {
      control.push(this.formBuilder.group({
        nivel: ruta.nivel,
        curso: ruta.curso,
        prerrequisitos: [ruta.prerrequisitos]
      }));
    });
  }

  crearRutaAprendizaje(){
    this.api.crearRutaAprendizaje({
       nombre: this.miFormulario.value.nombre,
       descripcion: this.miFormulario.value.descripcion,
       rutas: this.miFormulario.value.rutas
     })
     .subscribe()

     this.miFormulario.reset()
  }

  modificarRutaAprendizaje(id:string){
    console.log(this.miFormulario.value.rutas)
  }
}
