import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-info-aprendiz',
  templateUrl: './info-aprendiz.component.html',
  styleUrls: ['./info-aprendiz.component.css']
})
export class InfoAprendizComponent implements OnInit {
element: any;

  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.element = {
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
  }

  ngOnInit() {
  }

}
