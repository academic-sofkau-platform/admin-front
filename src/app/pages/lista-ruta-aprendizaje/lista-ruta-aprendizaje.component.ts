import { Component, OnInit } from '@angular/core';
import { RutaAprendizajeModel } from 'src/app/shared/models/ruta-aprendizaje';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-lista-ruta-aprendizaje',
  templateUrl: './lista-ruta-aprendizaje.component.html',
  styleUrls: ['./lista-ruta-aprendizaje.component.scss']
})
export class ListaRutaAprendizajeComponent implements OnInit {
  displayedColumns: string[] = ['Nombre', 'Descripcion', 'Acciones'];
  dataSource: RutaAprendizajeModel[] = [];
  constructor(private api: ApiService) {
    this.api.getRutasAprendizaje()
      .subscribe((element) => this.dataSource = element);
  }

  ngOnInit(): void {
  }

}
