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
    const grades = [0, 65, 59, 80, 81, 56, 55, 40, 100, 77, 75 ,45,115, 30,90];
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    const stdChart = new Chart("stdChart", {
      type: 'line',
      data: {
          labels: monthNames,
          datasets: [{
              label: 'Nota',
              data: grades,
              fill: true,
              borderColor: 'rgba(28,45,161,255)',
              hoverBorderColor: 'green',
              backgroundColor: 'rgba(193,240,2400,0.5)',
              pointBackgroundColor: 'rgba(28,45,161,255)',
              pointHoverBackgroundColor: 'white',
              pointHoverRadius: 10,
              pointRadius: 5,
          }]
      }
  });
  }

}
