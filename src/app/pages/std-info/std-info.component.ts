import { Component, OnInit } from '@angular/core';
import { StudentModel } from 'src/app/shared/models/student';
import { CursoModel } from 'src/app/shared/models/curso';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-std-info',
  templateUrl: './std-info.component.html',
  styleUrls: ['./std-info.component.css'],
})
export class StdInfoComponent implements OnInit {

  std: StudentModel;
  curso: CursoModel;
  dataSource: any[] = [];
  actividad: any[] = [];

  cellSettings = {
    border: {
      width: 0.5,
      color: 'white',
    },
  };

  palleteSettings = {
    palette: [
      { color: '#c1f0f0 ', label: 'Poor' },
      { color: '#5cd3fb ', label: 'Average' },
      { color: '#111979 ', label: 'Excellent' },
    ],
    type: 'Gradient',
  };

  titleSettings = {
    text: 'Progreso',
    textStyle: {
      size: '24px',
      color: 'black',
      fontWeight: '500',
      fontStyle: 'Bold',
    },
  };

  dataSourceSettings = {
    isJsonData: true,
    adaptorType: 'Cell',
    xDataMapping: 'Labels.Xlabel',
    yDataMapping: 'Labels.Ylabel',
    valueMapping: 'data.value',
  };

  xAxis = {
    // TODO: Cantidad de semanas de duracion dado al crear el training (calcular o que ya vengan)
    labels: ['Semana 1', 'Semana 2', 'Semana 3','Semana 4','Semana 5', 'Semana 6', 'Semana 7'],

    textStyle: {
      size: '14px',
      color: 'black',
      fontWeight: '500',
      fontStyle: 'Bold',
    },
  };

  yAxis = {
    labels: ['Domingo', 'Sabado', 'Viernes', 'Jueves', 'Miercoles', 'Martes', 'Lunes'],

    textStyle: {
      size: '14px',
      color: 'black',
      fontWeight: '500',
      fontStyle: 'Bold',
    },
  };

  constructor(private api:ApiService) {

    // TODO: Obtener el curso correspondiente
    this.curso = {
      id: 'curso001',
      nombre: 'Angular Destilado',
      descripcion: 'XXXXXXXXX',
      aprobacion: 75,
    }

    // TODO: Obtener la informacion correcta del estudiante que corresponde del backend
    this.std = {
      id: '007',
      name: 'Nombre',
      lastname: 'Apellido',
      city: 'Ciudad',
      gender: 'M',
      email: 'example@mail.com',
      phoneNumber: 59899123456,
      photo: 'urldefoto',
      bilingual: true,
    };

    // TODO: Asignar la actividad correspondiente del backend
    api.getActividad(this.curso.id, this.std.id).subscribe((actividad) => {
      this.actividad = actividad;
    });

    this.actividad.forEach(done => {
      this.dataSource.push({'Labels': {'Xlabel': 'Semana ' + this.getWeeksDiff(new Date('2022-09-01'), done.fecha) , 'Ylabel': this.getDayOfWeek(done.fecha.getDay())}, 'data': {'value': done.puntaje}});
    });
  }

  ngOnInit() {
  }

  getWeeksDiff(startDate: Date, endDate: Date) {
    const msInWeek = 1000 * 60 * 60 * 24 * 7;

    return (
      Math.round(Math.abs(endDate.getTime() - startDate.getTime()) / msInWeek) +
      1
    );
  }

  getDayOfWeek(day: number) : string {
    switch (day) {
      case 0:
        return 'Lunes';
      case 1:
        return 'Martes';
      case 2:
        return 'Miercoles';
      case 3:
        return 'Jueves';
      case 4:
        return 'Viernes';
      case 5:
        return 'Sabado';
      case 6:
        return 'Domingo';
      default:
        return 'Default';
    }
  }
}


    // {
    //   cursoId: "12312",
    //   aprendizId: "rauuuuuul",
    //   fecha: new Date('2022-09-01'),
    //   puntaje: 12
    // },
    // {
    //   cursoId: "12312",
    //   aprendizId: "rauuuuuul",
    //   fecha: new Date('2022-09-02'),
    //   puntaje: 30
    // },
    // {
    //   cursoId: "12312",
    //   aprendizId: "rauuuuuul",
    //   fecha: new Date('2022-09-03'),
    //   puntaje: 15
    // },
    // {
    //   cursoId: "12312",
    //   aprendizId: "rauuuuuul",
    //   fecha: new Date('2022-09-04'),
    //   puntaje: 18
    // },
    // {
    //   cursoId: "12312",
    //   aprendizId: "rauuuuuul",
    //   fecha: new Date('2022-09-05'),
    //   puntaje: 21
    // },
    // {
    //   cursoId: "12312",
    //   aprendizId: "rauuuuuul",
    //   fecha: new Date('2022-09-06'),
    //   puntaje: 3
    // },
    // {
    //   cursoId: "12312",
    //   aprendizId: "rauuuuuul",
    //   fecha: new Date('2022-09-07'),
    //   puntaje: 0
    // },
    // {
    //   cursoId: "12312",
    //   aprendizId: "rauuuuuul",
    //   fecha: new Date('2022-09-23'),
    //   puntaje: 33
    // },
    // {
    //   cursoId: "12312",
    //   aprendizId: "rauuuuuul",
    //   fecha: new Date('2022-09-30'),
    //   puntaje: 33
    // },
    // {
    //   cursoId: "12312",
    //   aprendizId: "rauuuuuul",
    //   fecha: new Date('2022-10-15'),
    //   puntaje: 24
    // },
