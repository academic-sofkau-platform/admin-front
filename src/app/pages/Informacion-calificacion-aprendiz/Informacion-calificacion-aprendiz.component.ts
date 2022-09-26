import { AfterViewInit, Component, OnInit } from '@angular/core';
import { StudentModel } from 'src/app/shared/models/student';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-Informacion-calificacion-aprendiz',
  templateUrl: './Informacion-calificacion-aprendiz.component.html',
  styleUrls: ['./Informacion-calificacion-aprendiz.component.css']
})
export class InformacionCalificacionAprendizComponent implements OnInit {
  dataSource: any;
  dataAprendiz:any
  puntaje: number = 0;
  puntajeForm: FormGroup;

  constructor(private api: ApiService,
    private route: ActivatedRoute,
    private router: Router) {

    this.puntajeForm = new FormGroup({
      puntaje:new FormControl()
    })
    this.route.queryParams.subscribe((datos: any) => {
      this.api.getAprendiceByTrainingAndMail(datos.trainingId, datos.email).subscribe((aprendiz) => {
        this.dataAprendiz = aprendiz;
      });
      this.dataSource = datos;
    });
  }

  ngOnInit(){
  }

  calificar(){
    this.api.updateNotaTarea(this.dataSource.trainingId, this.dataSource.email, this.dataSource.cursoId, {
      nota: this.puntajeForm.value.puntaje
    }).subscribe()
    setTimeout(()=>{
      this.volver();
    },0)

  }

  volver(){
    this.router.navigate(['tareas-aprendiz'], { queryParams: {
      nombreAprendiz: this.dataSource.nombreAprendiz,
      apellido: this.dataSource.apellido,
      email: this.dataSource.email,
      trainingId: this.dataSource.trainingId,
      trainingName: this.dataSource.trainingName
    }});
  }
}
