import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RutaAprendizajeModel } from 'src/app/shared/models/ruta-aprendizaje';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2'
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lista-ruta-aprendizaje',
  templateUrl: './lista-ruta-aprendizaje.component.html',
  styleUrls: ['./lista-ruta-aprendizaje.component.scss']
})
export class ListaRutaAprendizajeComponent implements AfterViewInit {
  displayedColumns: string[] = ['Nombre', 'Descripcion', 'Acciones'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  ngAfterViewInit() {
    this.api.getRutasAprendizaje().subscribe((element) => {
      this.dataSource = new MatTableDataSource(element)
      this.dataSource.paginator = this.paginator
      });
  }

  constructor(private api: ApiService, private router: Router) {
    this.api.getRutasAprendizaje()
      .subscribe((element) => this.dataSource = element);
  }

  eliminarRutaAprendizaje(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No se podrá revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result: any) => {
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

  editarRutaAprendizaje(id: string) {
    this.router.navigate(['ruta-aprendizaje', id])
  }

  crearRuta() {
    this.router.navigate(['ruta-aprendizaje'])
  }

}
