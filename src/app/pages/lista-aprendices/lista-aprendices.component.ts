import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentModel } from 'src/app/shared/models/student';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-aprendices',
  templateUrl: './lista-aprendices.component.html',
  styleUrls: ['./lista-aprendices.component.css']
})
export class ListaAprendicesComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'email', 'acciones'];
  dataSource: StudentModel[] = [];
  idTraining: string = '';
  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params)
      this.idTraining = params['id']
      this.api.aprendicesByTrainingId(this.idTraining).subscribe((element) => {
        this.dataSource = element;
        console.log(element)
      });
    })
  }
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
        this.api.deleteAprendizByEmail(this.idTraining, email).subscribe();
        this.dataSource = this.dataSource.filter((aprendiz) => aprendiz.email !== email)
      }
    })

  }

  verAprendiz(email: string) {
    this.router.navigate(['std-info', this.idTraining, email])
  }
}
