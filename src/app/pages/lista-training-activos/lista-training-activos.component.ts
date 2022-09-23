import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingModel } from 'src/app/shared/models/training';
import { ApiService } from 'src/app/shared/services/api.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'app-lista-training-activos',
  templateUrl: './lista-training-activos.component.html',
  styleUrls: ['./lista-training-activos.component.css']
})
export class ListaTrainingActivosComponent implements AfterViewInit {
 // displayedColumns: string[] = ['nombre', 'descripcion', 'inicio', 'fin', 'ver'];
 displayedColumns: string[] = ['name', 'period', 'apprentices', 'ver'];
  dataSource:any;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit(){
    this.api.getActiveTrainings().subscribe((element)=>{
      console.log(element)
      element.forEach(t => {
        t.endDate = moment(t.endDate).format("YYYY-MM-DD");
        t.startDate = moment(t.startDate).format("YYYY-MM-DD");
    });
      this.dataSource = new MatTableDataSource(element);
      this.dataSource.paginator = this.paginator;
    })
  }

  constructor(private api: ApiService, private router: Router) {
    
  }

  ngOnInit() {
  }

  verTraining(id:string){
    this.router.navigate(['list-aprendices', id])
  }
}
