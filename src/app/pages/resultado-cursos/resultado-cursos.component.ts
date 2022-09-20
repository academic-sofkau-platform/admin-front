import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-resultado-cursos',
  templateUrl: './resultado-cursos.component.html',
  styleUrls: ['./resultado-cursos.component.css']
})
export class ResultadoCursosComponent implements OnInit, AfterViewInit {
  control = new FormControl('');
  training: string[] = ['C1', 'C2', 'C3', 'C4'];
  filteredTraining!: Observable<string[]>;
  displayedColumns: string[] = ['NombreAprendiz', 'Training','Cursos', 'Acciones'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  ngAfterViewInit() {
    this.api.getRutasAprendizaje().subscribe((element) => {
      this.dataSource = new MatTableDataSource(element)
      this.dataSource.paginator = this.paginator
      });
    }
  constructor(private api: ApiService, private router: Router) {


  }

  ngOnInit() {
    this.filteredTraining = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.training.filter(training => this._normalizeValue(training).includes(filterValue));
  }
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

}
