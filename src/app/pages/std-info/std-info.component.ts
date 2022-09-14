import { Component, OnInit } from '@angular/core';
import { StudentModel } from 'src/app/shared/models/student';
import { ApiService } from 'src/app/shared/services/api.service';
import { TrainingModel } from 'src/app/shared/models/training';
import { Adaptor, HeatMap, Legend, Tooltip } from '@syncfusion/ej2-angular-heatmap';
HeatMap.Inject(Legend, Tooltip, Adaptor);

@Component({
  selector: 'app-std-info',
  templateUrl: './std-info.component.html',
  styleUrls: ['./std-info.component.css'],
})
export class StdInfoComponent implements OnInit {
  std: StudentModel;
  curso: TrainingModel;
  dataSource: any[] = [];
  heatmap: HeatMap = new HeatMap({
    titleSettings: {
      text: 'Progreso',
      textStyle: {
        size: '24px',
        color: 'black',
        fontWeight: '500',
        fontStyle: 'Bold',
      }
    },
  
    xAxis: {
      // TODO: Cantidad de semanas de duracion dado al crear el training (calcular o que ya vengan)
      labels: [
        'Semana 1',
        'Semana 2',
        'Semana 3',
        'Semana 4',
        'Semana 5',
        'Semana 6',
        'Semana 7',
      ],
  
      textStyle: {
        size: '14px',
        color: 'black',
        fontWeight: '500',
        fontStyle: 'Bold',
      }
    },
  
    yAxis: {
      labels: ['Domingo', 'Sabado', 'Viernes', 'Jueves', 'Miercoles', 'Martes', 'Lunes'],
  
      textStyle: {
        size: '14px',
        color: 'black',
        fontWeight: '500',
        fontStyle: 'Bold',
      }
    },

    dataSource: [],

    dataSourceSettings: {
      isJsonData: true,
      adaptorType: 'Cell',
      xDataMapping: 'Labels.Xlabel',
      yDataMapping: 'Labels.Ylabel',
      valueMapping: 'data.value'
    },
  
    cellSettings: {
      border: {
        width: 0.5,
        color: 'white',
      }
    },
  
    paletteSettings: {
      palette: [
        { color: '#c1f0f0 ', label: 'Poor' },
        { color: '#5cd3fb ', label: 'Average' },
        { color: '#111979 ', label: 'Excellent' },
      ],
      type: 'Gradient'
    }
});

  constructor(private api: ApiService) {
    this.std = {
      id: 'DEFAULT',
      name: 'DEFAULT',
      lastname: 'DEFAULT',
      city: 'DEFAULT',
      gender: 'DEFAULT',
      email: 'DEFAULT@mail.com',
      phoneNumber: 123456789,
      photo: 'DEFAULT',
      bilingual: false,
    };

    api
      .getAprendiceByTrainingAndMail(
        '7595fb82-db54-490b-91fc-ec0c8e7daaa1',
        'minieri@email.com'
      )
      .subscribe((std) => {
        this.std = std;
        this.std.lastname = std.lastName;
      });

    // TODO: Obtener el curso correspondiente
    this.curso = {
      id: 'curso001',
      nombre: 'Angular Destilado',
      descripcion: 'XXXXXXXXX',
      fechaInicio: new Date('2022-09-12'),
      fechaFinal: new Date('2022-10-24'),
    };

    // TODO: Asignar la actividad correspondiente del backend
    api
      .getActividad('7595fb82-db54-490b-91fc-ec0c8e7daaa1', '1555de')
      .subscribe((actividad) => {
        actividad.forEach((elem) => {
          let fecha = new Date(elem.fecha);

          this.dataSource.push({
            Labels: {
              Xlabel:
                'Semana ' + this.getWeeksDiff(this.curso.fechaInicio, fecha),
              Ylabel: this.getDayOfWeek(fecha.getDay()),
            },
            data: { value: elem.puntaje },
          });
        });

        this.heatmap.dataSource = this.dataSource;
        this.heatmap.appendTo('#element');
      });

    console.log(this.dataSource);
  }

  ngOnInit() {}

  getWeeksDiff(startDate: Date, endDate: Date) {
    const msInWeek = 1000 * 60 * 60 * 24 * 7;

    return (
      Math.round(Math.abs(endDate.getTime() - startDate.getTime()) / msInWeek) +
      1
    );
  }

  getDayOfWeek(day: number): string {
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
