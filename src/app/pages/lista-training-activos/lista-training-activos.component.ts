import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingModel } from 'src/app/shared/models/training';
import { ApiService } from 'src/app/shared/services/api.service';


@Component({
  selector: 'app-lista-training-activos',
  templateUrl: './lista-training-activos.component.html',
  styleUrls: ['./lista-training-activos.component.css']
})
export class ListaTrainingActivosComponent implements OnInit {
  trainings: TrainingModel[] = [];

  displayedColumns: string[] = ['nombre', 'descripcion', 'inicio', 'fin', 'ver'];
  //displayedColumns: string[] = ['Nombre', 'Periodo', 'Aprendices', 'Acciones'];
  //dataSource: TrainingModel[] = this.getTrainings();
  dataSource: TrainingModel[] = [];
    // [{ id: "1", nombre: "asd", descripcion: "desc1", fechaInicio: 10, fechaFinal: 20 },
    // { id: "2", nombre: "asd", descripcion: "desc2", fechaInicio: 10, fechaFinal: 20 }
    // ]


  constructor(private api: ApiService, private router: Router) { 
    this.api.getActiveTrainings().subscribe((element:any)=>{
      this.dataSource = element
    })
  }

  ngOnInit() {
    // this.getTrainings()
  }

  // getTrainings() {
  //   this.api.getActiveTrainings()
  //     .subscribe(data => {
  //       console.log(data)
  //       console.log("desplegando trainings2");
  //       this.trainings = data;
  //     })
  //   return this.trainings;
  // }


  verTraining(id:string){
    this.router.navigate(['list-aprendices', id])
  }
}
