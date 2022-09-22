import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CursoModel } from 'src/app/shared/models/curso';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements AfterViewInit{
  dataSource: any;
  idData: String[] = [];
  idRuta: String[] = [];
  idCurso: String = ""
  displayedColumns: string[] = ['nombre', 'descripcion', 'accionMejora', 'consigna', 'enlace', 'valorAprobacion', 'acciones'];
  cursoForm: FormGroup;
  elementos: any
  cursoId:string=""
  nombre:string = "";
  descripcion:string = "";
  accionMejora:string = "";
  consigna:string = "";
  enlace:string = "";
  valorAprobacion:number = 0;
  modificando:boolean = false;
  siendoUsado:boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor( public api: ApiService ) {
    this.cursoForm = new FormGroup({

      //Forms cuando no modifico
      nombre: new FormControl(),
      descripcion: new FormControl(),
      accionMejora: new FormControl(),
      consigna: new FormControl(),
      enlace: new FormControl(),
      valorAprobacion: new FormControl(),

      //Forms cuando modifico
      name: new FormControl(),
      description: new FormControl(),
      actionImprovement: new FormControl(),
      task: new FormControl(),
      link: new FormControl(),
      aprobacion: new FormControl()
    })
   }

  ngAfterViewInit() {
    this.api.getCursos().subscribe((elements) => {
   
      this.dataSource = new MatTableDataSource(elements)
      this.ordenar(this.dataSource.data)
      this.dataSource.paginator = this.paginator
    });

  }

  ordenar(array: CursoModel[]) {
     array.sort(function (a,b) {
      if (a.nombre > b.nombre) {
        return 1;
      }
      if (a.nombre < b.nombre) {
        return -1;
      }
      return 0;
    })
  }

  crearCurso() {
   if (this.cursoForm.value.nombre !== null && this.cursoForm.value.descripcion !== null
     && this.cursoForm.value.valorAprobacion && this.cursoForm.value.consigna !== null
    && this.cursoForm.value.enlace !== null && this.cursoForm.value.accionMejora !== null) {
    this.api.crearCurso({
      nombre:this.cursoForm.value.nombre,
      descripcion:this.cursoForm.value.descripcion,
      accionMejora:this.cursoForm.value.accionMejora,
      consigna:this.cursoForm.value.consigna,
      enlace:this.cursoForm.value.enlace,
      aprobacion:this.cursoForm.value.valorAprobacion
    }).subscribe((cursoagregado:any)=> {
      //Al crear el curso lo añado al datasource para que aparezca en la tabla
      //this.dataSource.push(elementos)
      let cursoAux = this.dataSource.data
      cursoAux.push(cursoagregado)
      this.ordenar(cursoAux)
      this.dataSource.data = cursoAux;
    })
   
     
 
    
   } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Los campos no pueden estar vacíos'
    })
   }

  }


  eliminar(id:string) {
    Swal.fire({
      title: '¿Seguro que quieres borrar el curso?',
      text: "No podrás revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimínalo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'Curso eliminado.',
          'success'
        )
        this.api.deleteCurso(id).subscribe();
        this.dataSource.data = this.dataSource.data.filter((cursos:any) => cursos.id !== id)
        let cursoAux = this.dataSource.data
        this.ordenar(cursoAux)
        this.dataSource.data = cursoAux;
      }
    })
  }

  imposibleBorrar() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Estás intentando borrar un curso que está siendo utilizado!'
    })
  }

  evaluar(id:string,$event:any) {
    $event.preventDefault()

      this.api.controlCursoEnRutaAprendizaje(id).subscribe((element:any) => {
       this.siendoUsado = element
      })

      setTimeout(() => {
        if(this.siendoUsado) {
          this.imposibleBorrar()
        }
        if(!this.siendoUsado) {
          this.eliminar(id)
        }
      }, 200);
  }

  llevarDatos(id:string,$event:any) {
    $event.preventDefault()
    this.modificando = true
    //Pongo los datos en los form y en las variables
    setTimeout(()=> {
      let curso:any

      curso = this.dataSource.data.filter((cursito:CursoModel) => cursito.id == id)
      this.cursoId = id

      this.cursoForm.value.name = curso[0].nombre
      this.nombre = curso[0].nombre

      this.cursoForm.value.description = curso[0].descripcion
      this.descripcion = curso[0].descripcion

      this.cursoForm.value.actionImprovement = curso[0].accionMejora
      this.accionMejora = curso[0].accionMejora

      this.cursoForm.value.task = curso[0].consigna
      this.consigna = curso[0].consigna

      this.cursoForm.value.link = curso[0].enlace
      this.enlace = curso[0].enlace

      this.cursoForm.value.aprobacion = curso[0].aprobacion
      this.valorAprobacion = curso[0].aprobacion
     },0)
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
     });
  }

  modificarCurso(cursoId:string) {

    //Condicional para que no se borren los datos si modifico solo un input
    if (this.cursoForm.value.name == null) {this.cursoForm.value.name = this.nombre }
    if (this.cursoForm.value.description == null) {this.cursoForm.value.description = this.descripcion }
    if (this.cursoForm.value.actionImprovement == null) {this.cursoForm.value.actionImprovement = this.accionMejora }
    if (this.cursoForm.value.task == null) {this.cursoForm.value.task = this.consigna }
    if (this.cursoForm.value.link == null) {this.cursoForm.value.link = this.enlace }
    if (this.cursoForm.value.aprobacion == null) {this.cursoForm.value.aprobacion = this.valorAprobacion }

    this.api.modificarCurso(cursoId,{
      nombre:this.cursoForm.value.name,
      descripcion:this.cursoForm.value.description,
      accionMejora:this.cursoForm.value.actionImprovement,
      consigna:this.cursoForm.value.task,
      enlace:this.cursoForm.value.link,
      aprobacion:this.cursoForm.value.aprobacion
    }).subscribe((elementos:any)=> {

    //Al modificar elimino el curso que aparece en la tabla y pongo el nuevo modificado
      this.dataSource = this.dataSource.data.filter((elementos:any) => elementos.id !== cursoId)
        let cursoAux = this.dataSource
        cursoAux.push(elementos)
        this.ordenar(cursoAux)
        this.dataSource.data = cursoAux;
    })

    //Limpio los datos luego de modificar
    this.nombre = ""
    this.descripcion = ""
    this.accionMejora = ""
    this.consigna = ""
    this.enlace = ""
    this.valorAprobacion = 0
    this.modificando = false
  }

}
