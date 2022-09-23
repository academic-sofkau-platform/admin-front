import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';


@Component({
  selector: 'app-resultado-cursos',
  templateUrl: './resultado-cursos.component.html',
  styleUrls: ['./resultado-cursos.component.css']
})
export class ResultadoCursosComponent implements AfterViewInit, OnInit {
  control = new FormControl('');
  training: string[] = ['C1', 'C2', 'C3', 'C4'];
  filteredTraining!: Observable<string[]>;
  displayedColumns: string[] = ['nombre', 'training','curso', 'accion'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  ngAfterViewInit() {
    this.api.getResultadoCursos().subscribe((element:any) => {
      console.log(element);
      this.dataSource = new MatTableDataSource(element)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
      });
    }
  constructor(private api: ApiService, private router: Router) {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
