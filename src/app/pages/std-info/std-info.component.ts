import { Component, OnInit } from '@angular/core';
import { StudentModel } from 'src/app/shared/models/student';
import { ApiService } from 'src/app/shared/services/api.service';
import * as moment from 'moment';
import {
  Adaptor,
  HeatMap,
  Legend,
  Tooltip,
} from '@syncfusion/ej2-angular-heatmap';
import { ActivatedRoute } from '@angular/router';
HeatMap.Inject(Legend, Tooltip, Adaptor);

@Component({
  selector: 'app-std-info',
  templateUrl: './std-info.component.html',
  styleUrls: ['./std-info.component.css'],
})
export class StdInfoComponent implements OnInit {
  stdEmail: string = '';
  std: StudentModel;
  cursoId: string = '';

  weeks: string[] = [];
  dataSource: any[] = [];

  heatmap: HeatMap = new HeatMap({
    width: '100%',
    height: '50%',
    titleSettings: {
      text: 'Actividad',
      textStyle: {
        size: '24px',
        color: 'black',
        fontWeight: '500',
        fontStyle: 'Bold',
      },
    },

    xAxis: {
      labels: [],

      textStyle: {
        size: '14px',
        color: 'black',
        fontWeight: '500',
        fontStyle: 'Bold',
      },
    },

    yAxis: {
      labels: [
        'Domingo',
        'Sabado',
        'Viernes',
        'Jueves',
        'Miercoles',
        'Martes',
        'Lunes',
      ],

      textStyle: {
        size: '14px',
        color: 'black',
        fontWeight: '500',
        fontStyle: 'Bold',
      },
    },

    dataSource: [],

    dataSourceSettings: {
      isJsonData: true,
      adaptorType: 'Cell',
      xDataMapping: 'Labels.Xlabel',
      yDataMapping: 'Labels.Ylabel',
      valueMapping: 'data.value',
    },

    cellSettings: {
      border: {
        width: 0.5,
        color: 'white',
      },
    },

    paletteSettings: {
      palette: [
        { color: '#c1f0f0 ', label: 'Baja' },
        { color: '#5cd3fb ', label: 'Media' },
        { color: '#111979 ', label: 'Alta' },
      ],
      type: 'Gradient',
    },
  });

  constructor(private api: ApiService, private route: ActivatedRoute) {
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

    this.route.params.subscribe((params) => {
      this.cursoId = params['id'];
      this.stdEmail = params['email'];

      this.api
        .getAprendiceByTrainingAndMail(this.cursoId, this.stdEmail)
        .subscribe((std) => {
          this.std = std;
          this.std.lastname = std.lastName;

          this.api.getTrainingById(this.cursoId).subscribe((training) => {
            this.api
              .getActividad(this.cursoId, this.stdEmail)
              .subscribe((actividad) => {
                actividad.forEach((elem) => {
                  let fecha = moment(elem.fecha);
                  let fechaI = moment(training.startDate);
                  this.dataSource.push({
                    Labels: {
                      Xlabel:
                        'Semana ' +
                        Math.trunc(fecha.diff(fechaI, 'weeks', true) + 1),
                      Ylabel: this.getDayOfWeek(fecha.day()),
                    },
                    data: { value: elem.puntaje },
                  });
                });

                let weekDiff = moment(training.endDate).diff(
                  moment(training.startDate),
                  'weeks'
                );
                for (let i = 0; i <= weekDiff; i++) {
                  this.weeks.push('Semana ' + i);
                }

                this.heatmap.xAxis.labels = this.weeks;
                this.heatmap.dataSource = this.dataSource;
                this.heatmap.appendTo('#element');
              });
          });
        });
    });
  }

  ngOnInit() {}

  getDayOfWeek(day: number): string {
    switch (day) {
      case 0:
        return 'Domingo';
      case 1:
        return 'Lunes';
      case 2:
        return 'Martes';
      case 3:
        return 'Miercoles';
      case 4:
        return 'Jueves';
      case 5:
        return 'Viernes';
      case 6:
        return 'Sabado';
      default:
        return 'Default';
    }
  }
}
