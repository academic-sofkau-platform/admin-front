import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/shared/models/student';

@Component({
  selector: 'app-std-info',
  templateUrl: './std-info.component.html',
  styleUrls: ['./std-info.component.css'],
})
export class StdInfoComponent implements OnInit {
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

  dataSource: any[] = [];
  actividad: any[] = [
    {
      cursoId: "12312",
      aprendizId: "rauuuuuul",
      fecha: new Date('2022-09-01'),
      puntaje: 12
    },
    {
      cursoId: "12312",
      aprendizId: "rauuuuuul",
      fecha: new Date('2022-09-02'),
      puntaje: 30
    },
    {
      cursoId: "12312",
      aprendizId: "rauuuuuul",
      fecha: new Date('2022-09-03'),
      puntaje: 15
    },
    {
      cursoId: "12312",
      aprendizId: "rauuuuuul",
      fecha: new Date('2022-09-04'),
      puntaje: 18
    },
    {
      cursoId: "12312",
      aprendizId: "rauuuuuul",
      fecha: new Date('2022-09-05'),
      puntaje: 21
    },
    {
      cursoId: "12312",
      aprendizId: "rauuuuuul",
      fecha: new Date('2022-09-06'),
      puntaje: 3
    },
    {
      cursoId: "12312",
      aprendizId: "rauuuuuul",
      fecha: new Date('2022-09-07'),
      puntaje: 0
    },
    {
      cursoId: "12312",
      aprendizId: "rauuuuuul",
      fecha: new Date('2022-09-23'),
      puntaje: 33
    },
    {
      cursoId: "12312",
      aprendizId: "rauuuuuul",
      fecha: new Date('2022-09-30'),
      puntaje: 33
    },
    {
      cursoId: "12312",
      aprendizId: "rauuuuuul",
      fecha: new Date('2022-10-15'),
      puntaje: 24
    },
  ];

  dataSourceSettings = {
    isJsonData: true,
    adaptorType: 'Cell',
    xDataMapping: 'Labels.Xlabel',
    yDataMapping: 'Labels.Ylabel',
    valueMapping: 'data.value',
  };

  xAxis = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3','Semana 4','Semana 5', 'Semana 6', 'Semana 7'], //cantidad de semanas de duracion dado al crear el training

    textStyle: {
      size: '14px',
      color: 'black',
      fontWeight: '500',
      fontStyle: 'Bold',
    },
  };

  yAxis = {
    labels: ['Dom', 'Sab', 'Vie', 'Jue', 'Mie', 'Mar', 'Lun'],

    textStyle: {
      size: '14px',
      color: 'black',
      fontWeight: '500',
      fontStyle: 'Bold',
    },
  };

  std: Student;

  constructor() {
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
  }

  ngOnInit() {
    this.actividad.forEach(cosahecha => {
      this.dataSource.push({'Labels': {'Xlabel': 'Semana ' + this.getWeeksDiff(new Date('2022-09-01'), cosahecha.fecha) , 'Ylabel': this.getDayOfWeek(cosahecha.fecha.getDay())}, 'data': {'value': cosahecha.puntaje}});
    });
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
        return 'Lun';
      case 1:
        return 'Mar';
      case 2:
        return 'Mie';
      case 3:
        return 'Jue';
      case 4:
        return 'Vie';
      case 5:
        return 'Sab';
      case 6:
        return 'Dom';
      default:
        return 'Default';
    }
  }
}
