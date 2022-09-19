import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultado-cursos',
  templateUrl: './resultado-cursos.component.html',
  styleUrls: ['./resultado-cursos.component.css']
})
export class ResultadoCursosComponent implements OnInit {
  displayedColumns: string[] = ['Nombre', 'Descripcion', 'Acciones'];
  dataSource: any;
  constructor() { }

  ngOnInit() {
  }

}
