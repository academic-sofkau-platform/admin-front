import {
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoModel } from 'src/app/shared/models/curso';
import { RutaModel } from 'src/app/shared/models/ruta-aprendizaje';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ruta-aprendizaje',
  templateUrl: './ruta-aprendizaje.component.html',
  styleUrls: ['./ruta-aprendizaje.component.css'],
})
export class RutaAprendizajeComponent implements OnInit {
  rutaAprendizajeId: string = '';
  rutaAprendizaje: any;
  modificando: boolean = false;

  //Cosas rancias
  nombre: string = '';
  descripcion: string = '';
  rutas: RutaModel[] = [];

  miFormulario: FormGroup = this.formBuilder.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    descripcion: [, [Validators.required, Validators.min(1)]],
    rutas: this.formBuilder.array([
      this.formBuilder.group({
        nivel: [, [Validators.required, Validators.min(0)]],
        cursoId: [, [Validators.required, Validators.min(1)]],
        prerrequisitos: [, [Validators.min(0)]],
      }),
    ]),
  });

  //Cursos.
  listaCursos: CursoModel[] = [];
  constructor(
    public api: ApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.api.getCursos().subscribe((element) => (this.listaCursos = element));
  }

  get getRutas() {
    return this.miFormulario.get('rutas') as FormArray;
  }

  addRutas() {
    const control = <FormArray>this.miFormulario.controls['rutas'];
    control.push(
      this.formBuilder.group({
        nivel: [, [Validators.required, Validators.min(0)]],
        cursoId: [, [Validators.required, Validators.min(1)]],
        prerrequisitos: [, [Validators.min(0)]],
      })
    );
  }

  removeRuta(indice: number) {
    this.getRutas.removeAt(indice);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.rutaAprendizajeId = params['id'];
      if (this.rutaAprendizajeId != null) {
        this.api
          .getRutaAprendizaje(this.rutaAprendizajeId)
          .subscribe((element: any) => {
            this.rutaAprendizaje = element;
            this.nombre = this.rutaAprendizaje.nombre;
            this.descripcion = this.rutaAprendizaje.descripcion;
            this.rutas = this.rutaAprendizaje.rutas;
            this.removeRuta(0);
            this.addRutasMod(this.rutaAprendizaje.rutas);
          });
      }
    });
  }

  addRutasMod(rutas: any) {
    const control = <FormArray>this.miFormulario.controls['rutas'];
    rutas.forEach((ruta: any) => {
      control.push(
        this.formBuilder.group({
          nivel: ruta.nivel,
          cursoId: ruta.cursoId,
          prerrequisitos: [ruta.prerrequisitos],
        })
      );
    });
  }

  crearRutaAprendizaje() {
    //Controles para chequear que la ruta y los campos no vayan vacíos
    if (this.chequear()) {
      this.api
        .crearRutaAprendizaje({
          nombre: this.miFormulario.value.nombre,
          descripcion: this.miFormulario.value.descripcion,
          rutas: this.miFormulario.value.rutas,
        })
        .subscribe();

      if (this.miFormulario.value.rutas.length > 1) {
        this.miFormulario.value.rutas.forEach((value: any, index: number) => {
          this.removeRuta(index);
        });
      }
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha guardado la ruta correctamente',
        showConfirmButton: false,
        timer: 1500,
      });

      this.miFormulario.reset();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Uno de los campos está vacío',
      });
    }
  }

  modificarRutaAprendizaje(id: string) {
    if (this.chequear()) {
      //Cuando se modifica el nombre o descripción (modificamos todo)
      if(this.nombre != this.miFormulario.value.nombre || this.descripcion != this.miFormulario.value.descripcion){
      this.api
        .modificarRutaAprendizaje(id, {
          nombre: this.miFormulario.value.nombre,
          descripcion: this.miFormulario.value.descripcion,
          rutas: this.miFormulario.value.rutas,
        })
        .subscribe();
      }else{
        //Cuando se agrega una ruta (o más)
        //Crear un arreglo de rutas auxiliar que tenga las rutas que voy a añadir/quitar.
        //let rutasxd: RutaModel = [];

        if(this.miFormulario.value.rutas.length > this.rutas.length){
          this.miFormulario.value.rutas.forEach((ruta: RutaModel) =>
            this.api.agregarRuta(id,{
              ruta: ruta
            })
            .subscribe()
          );
        }

        //Cuando se quita una ruta (o más)
        if(this.miFormulario.value.rutas.length < this.rutas.length){
          this.miFormulario.value.rutas.forEach((ruta: RutaModel) =>
            this.api.quitarRuta(id, ruta.rutaId).subscribe()
          );
        }
      }
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha modificado la ruta de aprendizaje correctamente',
        showConfirmButton: false,
        timer: 1500,
      });
    }else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Uno de los campos está vacío',
      });
    }
  }

  chequear() {
    if (this.miFormulario.value.nombre == null) {
      this.miFormulario.value.nombre = this.nombre;
    }

    if (this.miFormulario.value.descripcion == null) {
      this.miFormulario.value.descripcion = this.descripcion;
    }

    if (
      this.miFormulario.value.nombre != null &&
      this.miFormulario.value.descripcion != null &&
      this.miFormulario.value.rutas[0].nivel != null &&
      this.miFormulario.value.rutas[0].cursoId != null
    )
      return true;
    return false;
  }

  verListadoRutas(){
    this.router.navigate(['list-ruta-aprendizaje'])
  }
}
