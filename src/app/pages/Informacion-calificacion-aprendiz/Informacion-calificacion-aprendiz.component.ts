import { Component, OnInit } from '@angular/core';
import { StudentModel } from 'src/app/shared/models/student';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-Informacion-calificacion-aprendiz',
  templateUrl: './Informacion-calificacion-aprendiz.component.html',
  styleUrls: ['./Informacion-calificacion-aprendiz.component.css']
})
export class InformacionCalificacionAprendizComponent implements OnInit {
  stdEmail: string = 'lauratatis3791@gmail.com';
  std: StudentModel;
  trainingId: string = '04f51240-2965-4501-8bfb-b2f87f805a2a';

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

    this.api
        .getAprendiceByTrainingAndMail(this.trainingId, this.stdEmail)
        .subscribe((std) => {
          this.std = std;
          console.log(std)
        }
          )
        

  }

  ngOnInit() {
  }

}
