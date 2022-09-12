import { Component, OnInit } from '@angular/core';
import { StudentModel } from 'src/app/shared/models/student';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-lista-aprendices',
  templateUrl: './lista-aprendices.component.html',
  styleUrls: ['./lista-aprendices.component.css']
})
export class ListaAprendicesComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'email', 'ver','eliminar'];
  dataSource: StudentModel[] = [];
  
  constructor(private api: ApiService) { 
    this.api.aprendicesByTrainingId("4149bdc6-f0b4-4f94-a030-385c695a88a7").subscribe((element )=>{
      this.dataSource = element;
    });
  }

  ngOnInit() {

  }

}
