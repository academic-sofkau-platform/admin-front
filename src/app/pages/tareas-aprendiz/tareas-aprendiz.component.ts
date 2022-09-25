import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service'; 

@Component({
  selector: 'app-tareas-aprendiz',
  templateUrl: './tareas-aprendiz.component.html',
  styleUrls: ['./tareas-aprendiz.component.css']
})
export class TareasAprendizComponent implements AfterViewInit  {

  Aprendiz:string = ""
  Apellido:string = ""
  TrainingNombre:string = ""
  displayedColumns: string[] = ['curso', 'accion'];
  dataSource:any

  constructor(private route:ActivatedRoute, private api: ApiService, private router: Router) { }
  ngAfterViewInit(): void {
    this.Aprendiz = this.route.snapshot.params['nombreAprendiz']
    this.Apellido = this.route.snapshot.params['apellido']
    this.TrainingNombre = this.route.snapshot.params['trainingName']
    this.traerTareas(this.route.snapshot.params['trainingId'],this.route.snapshot.params['email'])
  }

  traerTareas(trainingId:string, email:string) {
    this.api.getAllTareasByEmail(trainingId, email).subscribe((elements) => {
      this.dataSource = new MatTableDataSource(elements)
      console.log(this.dataSource)
    })    
  }

  calificarAprendiz(aprendiz:any, nombreCurso:string, cursoId: string){
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


 }

}
