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
  trainings:TrainingModel[]=[];

  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'inicio', 'fin', 'ver'];
  //displayedColumns: string[] = ['Nombre', 'Periodo', 'Aprendices', 'Acciones'];
  //dataSource: TrainingModel[] = this.getTrainings();
dataSource: TrainingModel[]=[
  {trainingId:"1", name:"asd", description:"desc1", startDate:10, endDate:20, coach: "Raul", apprentices: [], rutaAprendizaje: {id: "Ruta1", nombre: "nombreRuta1", descripcion: "Ruta1Des", rutas: []}},
  {trainingId:"2", name:"asd", description:"desc2", startDate:10, endDate:20, coach: "Eddi", apprentices: [], rutaAprendizaje: {id: "Ruta1", nombre: "nombreRuta1", descripcion: "Ruta1Des", rutas: []}}
  ]

  constructor(private api:ApiService, private router:Router) { }

  ngOnInit() {
    this.getTrainings()
  }

  getTrainings(){
    this.api.getActiveTrainings()
    .subscribe(data =>{
      console.log(data)
      console.log("desplegando trainings2");
      this.trainings=data;
    })
    return this.trainings;
  }
}
