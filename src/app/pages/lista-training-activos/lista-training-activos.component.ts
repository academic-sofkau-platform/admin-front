import { Component, OnInit } from '@angular/core';
import { RangeValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainingModel } from 'src/app/shared/models/training';
import { ApiService } from 'src/app/shared/services/api.service';
import { RutaAprendizajeModel } from 'src/app/shared/models/ruta-aprendizaje';


@Component({
  selector: 'app-lista-training-activos',
  templateUrl: './lista-training-activos.component.html',
  styleUrls: ['./lista-training-activos.component.css']
})
export class ListaTrainingActivosComponent implements OnInit {
  trainings: TrainingModel[] = [];

  displayedColumns: string[] = ['nombre', 'descripcion', 'inicio', 'fin', 'ver'];
  dataSource: TrainingModel[] = [];

  constructor(private api: ApiService, private router: Router) {
    this.api.getActiveTrainings().subscribe((element:any)=>{
      console.log(element)
      this.dataSource = element
    })
  }

  ngOnInit() {
  }

  verTraining(id:string){
    this.router.navigate(['list-aprendices', id])
  }
}
