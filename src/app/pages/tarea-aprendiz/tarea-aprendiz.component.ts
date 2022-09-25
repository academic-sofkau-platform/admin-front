import { AfterViewInit, Component, OnInit } from '@angular/core';
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
  displayedColumns: string[] = ['curso', 'accion'];

  constructor(private route:ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit(){
    this.aprendiz = this.route.snapshot.params['nombreAprendiz']
    this.apellido = this.route.snapshot.params['apellido']
    this.trainingNombre = this.route.snapshot.params['trainingName']

    this.api.getAllTareasByEmail(this.route.snapshot.params['trainingId'], this.route.snapshot.params['email']).subscribe((elements) => {
      this.dataSource = new MatTableDataSource(elements)
      console.log(this.dataSource)
    })
  }


/*   calificarAprendiz(aprendiz:any, nombreCurso:string, cursoId: string){
    var tareaAprendiz: any = ""

    aprendiz.tareas.forEach((tarea:any) => {
       if(tarea.cursoId == cursoId){
         tareaAprendiz = tarea
       }
   })

   if(tareaAprendiz){
     this.router.navigate(['informacion-calificacion-aprendiz'], { queryParams: {
       name: aprendiz.name,
       lastname: aprendiz.lastName,
       phoneNumber: aprendiz.phoneNumber,
       email: aprendiz.email,
       photo: aprendiz.photo,
       nombreCurso: nombreCurso,
       tareas: tareaAprendiz.contenido
     }});
    }
  } */

}
