import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Student } from 'src/app/shared/models/student';

@Component({
  selector: 'app-std-info',
  templateUrl: './std-info.component.html',
  styleUrls: ['./std-info.component.css']
})
export class StdInfoComponent implements OnInit {

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
    const stdChart = new Chart("stdChart", {
      type: 'line',
      data: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
          datasets: [{
              label: 'Notas',
              data: [0, 65, 59, 80, 81, 56, 55, 40, 100],
              fill: false,
              borderColor: 'rgb(255, 140, 0)',
              tension: 0.1
          }]
      }
  });
  }

}
