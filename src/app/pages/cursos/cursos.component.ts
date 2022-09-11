import { Component, OnInit } from '@angular/core';
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

  constructor(
    public api: ApiService,

  ) {
    this.cursoForm = new FormGroup({
      nombre: new FormControl(),
      descripcion: new FormControl(),
      valorAprobacion: new FormControl(Validators.max(100), Validators.min(0))
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
  }
  
  eliminar(id:string) {
    this.api.deleteCurso({ cursoId: id }).subscribe();
  }

  modificarCurso(id:string) {
    this.api.modificarCurso({
      nombre:this.cursoForm.value.nombre,
      descripcion:this.cursoForm.value.descripcion,
      aprobacion:this.cursoForm.value.valorAprobacion
    }, id)
  }

}
