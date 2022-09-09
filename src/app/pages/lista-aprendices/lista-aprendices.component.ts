import { Component, OnInit } from '@angular/core';
import { Aprendiz } from 'src/app/shared/models/student';

@Component({
  selector: 'app-lista-aprendices',
  templateUrl: './lista-aprendices.component.html',
  styleUrls: ['./lista-aprendices.component.css']
})
export class ListaAprendicesComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'email', 'ver','eliminar'];
  dataSource: Aprendiz[] = 
  [{name:'Matias',lastname:'Souza', email:'matisouzafr@gmail.com'},
  {name:'Juan',lastname:'Sanchez', email:'juancho@gmail.com'}]
  constructor() { }

  ngOnInit() {
  }

}
