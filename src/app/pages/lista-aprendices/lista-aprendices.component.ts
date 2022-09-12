import { Component, OnInit } from '@angular/core';
import { StudentModel } from 'src/app/shared/models/student';

@Component({
  selector: 'app-lista-aprendices',
  templateUrl: './lista-aprendices.component.html',
  styleUrls: ['./lista-aprendices.component.css']
})
export class ListaAprendicesComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'email', 'ver','eliminar'];
  dataSource: StudentModel[] = 
  [{id:"asd",name:'Matias',lastname:'Souza',city:"lp ñeri",gender:"no se", email:'matisouzafr@gmail.com',phoneNumber:1050,photo:"asd",bilingual:false},
  {id:"23",name:'PEPE',lastname:'Souza',city:"lp ñeri",gender:"no se", email:'ASD@gmail.com',phoneNumber:1050,photo:"asd",bilingual:true}
  ]
  constructor() { }

  ngOnInit() {
  }

}
