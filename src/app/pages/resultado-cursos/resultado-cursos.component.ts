import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';


@Component({
  selector: 'app-resultado-cursos',
  templateUrl: './resultado-cursos.component.html',
  styleUrls: ['./resultado-cursos.component.css']
})
export class ResultadoCursosComponent implements AfterViewInit {
  training: string[] = ['C1', 'C2', 'C3', 'C4'];
  displayedColumns: string[] = ['nombre', 'training', 'accion'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;


  constructor(private api: ApiService, private router: Router) {

  }

  ngAfterViewInit() {

    this.api.getAllAprendicesParaCalificar().subscribe((element:any) => {
      this.dataSource = new MatTableDataSource(element)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;

      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  verTareas(nombreAprendiz: string, apellido: string, email:string , trainingId:string , trainingName:string ) {
    //this.router.navigate(['tareas-aprendiz/' + nombreAprendiz + '/' + apellido + '/' + email + '/' + trainingId + '/' + trainingName])

    this.router.navigate(['tareas-aprendiz'], { queryParams: {
      nombreAprendiz: nombreAprendiz,
      apellido: apellido,
      email: email,
      trainingId: trainingId,
      trainingName: trainingName
    }});
  }

}
