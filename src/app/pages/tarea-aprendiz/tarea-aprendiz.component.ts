import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CustomProvider } from '@angular/fire/app-check';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-tarea-aprendiz',
  templateUrl: './tarea-aprendiz.component.html',
  styleUrls: ['./tarea-aprendiz.component.scss']
})
export class TareaAprendizComponent implements OnInit {

  dataSource:any

  aprendiz:string = ""
  apellido:string = ""
  trainingNombre:string = ""
  email:string = ""
  trainingId:string = ""

  displayedColumns: string[] = ['curso', 'accion'];

  constructor(private route:ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit(){
    this.route.queryParams.subscribe((datos:any) => {
      this.aprendiz = datos.nombreAprendiz
      this.apellido = datos.apellido
      this.email = datos.email
      this.trainingId = datos.trainingId
      this.trainingNombre = datos.trainingName;
    });

    this.api.getAllTareasByEmail(this.trainingId, this.email).subscribe((elements) => {
      this.dataSource = new MatTableDataSource(elements)
      console.log(this.dataSource)
    })
  }


calificarAprendiz(nombreCurso: string, contenido:string, cursoId: string){
  //nombreCurso, contenido de la tarea, mail del aprendiz.
   this.router.navigate(['informacion-calificacion-aprendiz'], { queryParams: {
    email: this.email,
    nombreCurso: nombreCurso,
    cursoId: cursoId,
    contenido: contenido,
    trainingId: this.trainingId
  }});


   /* if(tareaAprendiz){
     this.router.navigate(['informacion-calificacion-aprendiz'], { queryParams: {
       name: aprendiz.name,
       lastname: aprendiz.lastName,
       phoneNumber: aprendiz.phoneNumber,
       email: aprendiz.email,
       photo: aprendiz.photo,
       nombreCurso: nombreCurso,
       tareas: tareaAprendiz.contenido
     }});
    } */
  }

}
