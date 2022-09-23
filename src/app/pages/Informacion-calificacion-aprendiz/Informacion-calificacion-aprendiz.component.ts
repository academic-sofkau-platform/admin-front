import { Component, OnInit } from '@angular/core';
import { StudentModel } from 'src/app/shared/models/student';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-Informacion-calificacion-aprendiz',
  templateUrl: './Informacion-calificacion-aprendiz.component.html',
  styleUrls: ['./Informacion-calificacion-aprendiz.component.css']
})
export class InformacionCalificacionAprendizComponent implements OnInit {
  stdEmail: string = 'lauratatis3791@gmail.com';
  std: any;
  trainingId: string = '04f51240-2965-4501-8bfb-b2f87f805a2a';

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {

    this.route.queryParams.subscribe(params => {
      this.std = params;
      console.log(this.std);
    });




  }

  ngOnInit() {
  }

}
