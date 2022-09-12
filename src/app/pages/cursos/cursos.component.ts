import { ContentObserver } from '@angular/cdk/observers';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { max } from 'rxjs';
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

  constructor(
    public api: ApiService,

  ) {
    this.cursoForm = new FormGroup({
      nombre: new FormControl(),
      descripcion: new FormControl(),
      //valorAprobacion: new FormControl(Validators.max(100), Validators.min(0))
      valorAprobacion: new FormControl()
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
    }
    ).subscribe()
    this.api.getCursos().subscribe((elements) => {
      this.dataSource = elements;
    });
    window.scrollTo(0, document.body.scrollHeight);
  }

  
  eliminar(id:string) {
    this.api.deleteCurso({ cursoId: id }).subscribe();
    this.api.getCursos().subscribe((elements) => {
      this.dataSource = elements;
    });
  }


  llevarDatos(id:string) {
    let curso:any
    curso = this.dataSource.filter(curso => curso.id == id)
    this.cursoId = id
    this.nombre = curso[0].nombre
    this.descripcion = curso[0].descripcion
    this.valorAprobacion = curso[0].aprobacion
    this.modificando = true
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
     });
  }
  

  modificarCurso(id:string) {
    this.nombre = ""
    this.descripcion = ""
    this.valorAprobacion = 0
    this.modificando = false
    this.api.modificarCurso({
      nombre:this.cursoForm.value.nombre,
      descripcion:this.cursoForm.value.descripcion,
      aprobacion:this.cursoForm.value.valorAprobacion
    }, id).subscribe()
    console.log(this.cursoForm.value.nombre)
   
    this.api.getCursos().subscribe((elements) => {
      this.dataSource = elements;
    });
  }
 

}
