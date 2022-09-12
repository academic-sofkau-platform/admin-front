import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { Training } from 'src/app/shared/models/training';

@Component({
  selector: 'app-lista-training-activos',
  templateUrl: './lista-training-activos.component.html',
  styleUrls: ['./lista-training-activos.component.css']
})
export class ListaTrainingActivosComponent implements OnInit {
  trainings:Training[]=[];
  
  displayedColumns: string[] = ['Nombre', 'Periodo', 'Aprendices', 'Acciones'];
  dataSource: Training[] = this.getTrainings();

  constructor(private api:ApiService, private router:Router) { }

  ngOnInit() {
    this.getTrainings()
  }

  getTrainings(){
    this.api.getActiveTrainings()
    .subscribe(data =>{
      console.log(data)
      this.trainings=data;
    })
    return this.trainings;
  }
}
