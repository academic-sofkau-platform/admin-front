import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-aprendices',
  templateUrl: './lista-aprendices.component.html',
  styleUrls: ['./lista-aprendices.component.css']
})
export class ListaAprendicesComponent implements AfterViewInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'email', 'acciones'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.route.params.subscribe((params) => {
      this.idTraining = params['id']
      this.api.aprendicesByTrainingId(this.idTraining).subscribe((elements) => {
        this.dataSource = new MatTableDataSource(elements)
        this.dataSource.paginator = this.paginator
      });
    })

  }

  idTraining: string = '';
  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  eliminar(email: string) {
    Swal.fire({
      title: 'Desea borrar un aprendiz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Borrado!',
          'completo'
        )
        this.api.deleteAprendizByEmail(this.idTraining, email).subscribe((element:any) => {
          // this.dataSource = this.dataSource
            console.log(element)
            this.api.aprendicesByTrainingId(this.idTraining).subscribe((elements) => {
              this.dataSource = new MatTableDataSource(elements)
              this.dataSource.paginator = this.paginator
              console.log(elements)
            });
          }
        );


      }
    })

  }

  verAprendiz(email: string) {
    this.router.navigate(['std-info', this.idTraining, email])
  }

  agregarAprendicesRouring() {
    this.router.navigate(['agregar-aprendices/', this.idTraining])
  }
}
