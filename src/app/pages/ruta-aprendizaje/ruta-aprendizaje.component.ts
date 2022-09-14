import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CursoModel } from 'src/app/shared/models/curso';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';

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
          console.log(this.rutaAprendizaje)
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
    //Controles para chequear que la ruta y los campos no vayan vacíos

    this.api.crearRutaAprendizaje({
       nombre: this.miFormulario.value.nombre,
       descripcion: this.miFormulario.value.descripcion,
       rutas: this.miFormulario.value.rutas
     })
     .subscribe()

     if(this.miFormulario.value.rutas.length > 1){
      this.miFormulario.value.rutas.forEach((value:any, index:number) => {
        console.log(value, index);
        this.removeRuta(index)
      });
    }
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se ha guardado la ruta correctamente',
      showConfirmButton: false,
      timer: 1500
    })

     this.miFormulario.reset()
  }

  modificarRutaAprendizaje(id:string, rutaId:string){
    //Cuando se modifica el nombre o demás (modificamos todo)
    //Cuando se quita una ruta (o más)
    //Cuando se agrega una ruta (o más)

    /*this.api.modificarRutaAprendizaje(
      id,
      rutaId,
      {
        nombre:this.miFormulario.value.nombre,
        descripcion: this.miFormulario.value.descripcion,
        rutas: this.miFormulario.value.rutas
      }
    )
    .subscribe()
    */
    console.log(this.miFormulario.value.rutas)
  }


}
