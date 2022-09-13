import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CursoModel } from 'src/app/shared/models/curso';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  dataSource: CursoModel[] = [];
  cursoForm: FormGroup;
  elementos: any 
  cursoId:string=""
  nombre:string = ""; 
  descripcion:string = "";
  valorAprobacion:number = 0;
  modificando:boolean = false;

  constructor( public api: ApiService ) {
    this.cursoForm = new FormGroup({

      //Forms cuando no modifico
      nombre: new FormControl(),
      descripcion: new FormControl(),
      valorAprobacion: new FormControl(),

      //Forms cuando modifico
      name: new FormControl(),
      description: new FormControl(),
      aprobacion: new FormControl()
    })
   }

  ngOnInit() {
    this.api.getCursos().subscribe((elements) => {
      this.dataSource = elements;
    });

  }

  crearCurso() {
   this.api.crearCurso({
      nombre:this.cursoForm.value.nombre,
      descripcion:this.cursoForm.value.descripcion,
      aprobacion:this.cursoForm.value.valorAprobacion
    }).subscribe((elementos:any)=> {

    //Al crear el curso lo añado al datasource para que aparezca en la tabla
    this.dataSource.push(elementos)
    })

    //Limpio los datos luego de postear
    this.nombre = ""
    this.descripcion = ""
    this.valorAprobacion = 0
    window.location.reload()
  }

  
  eliminar(id:string) {
    this.api.deleteCurso(id).subscribe();
    this.dataSource = this.dataSource.filter(cursos => cursos.id !== id)
  }


  llevarDatos(id:string) {
    this.modificando = true

    //Pongo los datos en los form y en las variables
    setTimeout(()=> { let curso:any
      curso = this.dataSource.filter(curso => curso.id == id)
      this.cursoId = id
      
      this.cursoForm.value.name = curso[0].nombre
      this.nombre = curso[0].nombre
      
      this.cursoForm.value.description = curso[0].descripcion
      this.descripcion = curso[0].descripcion
      
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
    if (this.cursoForm.value.aprobacion == null) {this.cursoForm.value.aprobacion = this.valorAprobacion }

    this.api.modificarCurso(cursoId,{
      nombre:this.cursoForm.value.name,
      descripcion:this.cursoForm.value.description,
      aprobacion:this.cursoForm.value.aprobacion
    }).subscribe((elementos:any)=> {

    //Al modificar elimino el curso que aparece en la tabla y pongo el nuevo modificado
      this.dataSource = this.dataSource.filter(elementos => elementos.id !== cursoId)
      this.dataSource.push(elementos)
    })

    //Limpio los datos luego de modificar
    this.nombre = ""
    this.descripcion = ""
    this.valorAprobacion = 0
    this.modificando = false
  }
 
}
