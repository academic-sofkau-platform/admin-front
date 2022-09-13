import { Component, OnInit } from '@angular/core';
import { RutaAprendizajeModel } from 'src/app/shared/models/ruta-aprendizaje';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2'

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

  eliminarRutaAprendizaje(id:string){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No se podrá revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result:any) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'La ruta ha sido eliminada correctamente.',
          'success'
        )
        this.api.eliminarRutaAprendizaje(id)
        .subscribe(() =>
          this.api.getRutasAprendizaje()
            .subscribe((element) => this.dataSource = element)
        );
      }
    })
  }
}
