import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Student } from 'src/app/shared/models/student';

@Component({
  selector: 'app-std-info',
  templateUrl: './std-info.component.html',
  styleUrls: ['./std-info.component.css']
})
export class StdInfoComponent implements OnInit {
  margin = { left: 0, right: 0, top: 0, bottom: 0 };

  cellSettings = {
    border: {
        width: 0.5,
        color: 'white'
    }
};

  palleteSettings ={
    palette: [{  color: '#c1f0f0 ', label:'Poor' },
            {  color: '#5cd3fb ', label:'Average' },
            { color: '#111979 ', label:'Excellent' }              
        ],
        type: "Gradient"
  };

  titleSettings = {
    text: "Progreso",
    textStyle: {
      size: '18px',
      fontWeight: '500',
      fontStyle: 'Bold'
}};

  dataSource = [
 
    [73, 39, 26, 39, 94, 0],
 
    [93, 58, 53, 38, 26, 68],
 
    [99, 28, 22, 4, 66, 90],
 
    [14, 26, 97, 69, 69, 3],
 
    [7, 46, 47, 47, 88, 6],
 
    [41, 55, 73, 23, 3, 79],
 
    [56, 69, 21, 86, 3, 33],
 
    [45, 7, 53, 81, 95, 79],
 
    [60, 77, 74, 68, 88, 51]
 
  ];
  xAxis = {
 
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6', 'Semana 7',
 
      'Semana 8', 'Semana 9'],
 
  };
 
  yAxis = {
 
    labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
 
  }

    std: Student;

  constructor() { 
    this.std = {
        id: "007",
        name: "Gianni",
        lastname: "Baccino",
        city: "Montevideo",
        gender: "M",
        email: "giannib@gmail.com",
        phoneNumber: 1234,
        photo:"urldefoto",
        bilingual: true
    };
  }

  ngOnInit() {
  }

}
