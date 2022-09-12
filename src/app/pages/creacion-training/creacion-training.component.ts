import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TrainingModel } from 'src/app/shared/models/training';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-creacion-training',
  templateUrl: './creacion-training.component.html',
  styleUrls: ['./creacion-training.component.css']
})
export class CreacionTrainingComponent implements OnInit {
  dataSource: TrainingModel[] = [];
  trainingForm: FormGroup;
  constructor(
    public api: ApiService,
  ) { 
    this.trainingForm = new FormGroup({
      nombre: new FormControl(),
      descripcion: new FormControl(),
      fechaInicio: new FormControl(),
      fechaFinal: new FormControl(),
    })

  }

  ngOnInit() {
  }

}
