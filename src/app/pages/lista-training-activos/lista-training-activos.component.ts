import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { DataTableComponent } from 'src/app/component/data-table/data-table.component';

@Component({
  selector: 'app-lista-training-activos',
  templateUrl: './lista-training-activos.component.html',
  styleUrls: ['./lista-training-activos.component.css']
})
export class ListaTrainingActivosComponent implements OnInit {
  //training: Training[];

  constructor(private api:ApiService, private router: Router) { }

  ngOnInit() {
  }

  /*refreshGame(){
    this.api.getTraining()
    .subscribe(data=>{
      console.log(data)
      this.training=data;
    })
  }*/
}
