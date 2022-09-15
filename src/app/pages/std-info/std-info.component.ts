import { Component, OnInit } from '@angular/core';
import { StudentModel } from 'src/app/shared/models/student';
import { ApiService } from 'src/app/shared/services/api.service';
import {
  Adaptor,
  HeatMap,
  Legend,
  Tooltip,
} from '@syncfusion/ej2-angular-heatmap';
import { ActivatedRoute} from '@angular/router';
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

  weeks: string[] = []
  dataSource: any[] = [];

  heatmap: HeatMap = new HeatMap({
    titleSettings: {
      text: 'Progreso',
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
      }
    },

    yAxis: {
      labels: [
        'Lunes',
        'Martes',
        'Miercoles',
        'Jueves',
        'Viernes',
        'Sabado',
        'Domingo',
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
        { color: '#c1f0f0 ', label: 'Poor' },
        { color: '#5cd3fb ', label: 'Average' },
        { color: '#111979 ', label: 'Excellent' },
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
        .getAprendiceByTrainingAndMail(this.cursoId, this.stdEmail).subscribe((std) => {
          this.std = std;
          this.std.lastname = std.lastName;

          this.api.getTrainingById(this.cursoId).subscribe((training) => {
            
              this.api.getActividad(this.cursoId, std.id).subscribe((actividad) => {
                actividad.forEach((elem) => {
                  
                  let fechaI = new Date(training.startDate);
                  let fecha = new Date(elem.fecha);
          
                  this.dataSource.push({
                    Labels: {
                      Xlabel:
                        'Semana ' +
                        this.getWeeksDiff(fechaI, fecha),
                      Ylabel: this.getDayOfWeek(fecha.getDay()),
                    },
                    data: { value: elem.puntaje },
                  });
                });
                
                let weekDiff = this.getWeeksDiff(new Date(training.startDate), new Date(training.endDate));
                for(let i = 1; i <= weekDiff; i++){
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
