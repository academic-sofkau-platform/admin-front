import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { StudentModel } from 'src/app/shared/models/student'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-aprendices-training-activo',
  templateUrl: './agregar-aprendices-training-activo.component.html',
  styleUrls: ['./agregar-aprendices-training-activo.component.css']
})
export class AgregarAprendicesTrainingActivoComponent implements OnInit {

  aprendices: StudentModel[] = [];
  idTraining: string = '';

  constructor(
    public api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.route.params.subscribe((params) => {
      this.idTraining = params['id']
    });
    this.changeDetectorRef.detectChanges();
  }

  public miFormulario: FormGroup = this.formBuilder.group({
    name: [, [Validators.required, Validators.minLength(3)]],
    lastname: [, [Validators.required, Validators.minLength(3)]],
    email: [, [Validators.required, Validators.email]],
    city: [],
    phoneNumber: [],
    gender: [],
    bilingual: []
  })

  ngOnInit() {
  }

  crearAprendiz(): StudentModel {
    let aprendiz: StudentModel | any = {
      name: this.miFormulario.value.name,
      lastName: this.miFormulario.value.lastname,
      city: this.miFormulario.value.city,
      gender: this.miFormulario.value.gender,
      email: this.miFormulario.value.email,
      phoneNumber: this.miFormulario.value.phoneNumber,
      photo: null,
      bilingual: this.miFormulario.value.bilingual
    }
    return aprendiz;
  }

  agregarAprendizALaListaParaEnviar(aprendiz: StudentModel) {
    this.aprendices.push(aprendiz);
  }

  agregarAprendices() {
    let aprendiz = this.crearAprendiz();
    this.agregarAprendizALaListaParaEnviar(aprendiz);
    this.api.agregarApredicesByTrainingId(
      this.idTraining,
      this.aprendices)
      .subscribe(() => {
        this.router.navigate(['/list-aprendices/' + this.idTraining]);
      });
      this.aprendices = [];
  }
}
