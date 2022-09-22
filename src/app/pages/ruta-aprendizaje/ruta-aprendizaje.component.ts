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

  removeRuta(indice: number, click: boolean) {
    if(this.rutaAprendizaje){
      let ruta: any = this.rutaAprendizaje.rutas[indice];
      if(ruta && click == true){
        Swal.fire({
          title: '¿Estás seguro?',
          text: "No se podrá revertir!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Eliminar'
        }).then((result: any) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Eliminado!',
              'La ruta ha sido eliminada correctamente.',
              'success'
            )
            this.api.quitarRuta(this.rutaAprendizajeId, ruta.id).subscribe();
            this.getRutas.removeAt(indice);
          }
        })
      }else{
        this.getRutas.removeAt(indice);
      }
    }else{
      this.getRutas.removeAt(indice);
    }
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
            this.removeRuta(0, false);
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
    if (!this.hayErrores()) {
      this.api
        .crearRutaAprendizaje({
          nombre: this.miFormulario.value.nombre,
          descripcion: this.miFormulario.value.descripcion,
          rutas: this.miFormulario.value.rutas,
        })
        .subscribe();

      if (this.miFormulario.value.rutas.length > 1) {
        this.miFormulario.value.rutas.forEach((value: any, index: number) => {
          this.removeRuta(index, false);
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
    if(!this.hayErrores()) {
      this.api
        .modificarRutaAprendizaje(id, {
          nombre: this.miFormulario.value.nombre,
          descripcion: this.miFormulario.value.descripcion,
          rutas: this.miFormulario.value.rutas,
        })
        .subscribe((element:any) => {
          this.rutaAprendizaje = element;
          this.rutas = [];
          this.rutas.push(element.rutas);
        });

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


  hayErrores() : boolean{
    let errores: boolean = false;
    if (this.miFormulario.value.nombre == null) {
      this.miFormulario.value.nombre = this.nombre;
    }

    if (this.miFormulario.value.descripcion == null) {
      this.miFormulario.value.descripcion = this.descripcion;
    }

    if (this.miFormulario.value.nombre != "" && this.miFormulario.value.descripcion != ""){
      this.miFormulario.value.rutas.forEach( (ruta: RutaModel) => {
        if (errores) {
          return;
        }

        if(ruta.nivel == null || ruta.cursoId == null){
          errores = true;
          return;
        }
      });
    }else{
      errores = true;
    }

    return errores;
  }

  verListadoRutas(){
    this.router.navigate(['list-ruta-aprendizaje'])
  }
}
