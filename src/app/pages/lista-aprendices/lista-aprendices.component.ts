import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentModel } from 'src/app/shared/models/student';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-lista-aprendices',
  templateUrl: './lista-aprendices.component.html',
  styleUrls: ['./lista-aprendices.component.css']
})
export class ListaAprendicesComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'email', 'ver','eliminar'];
  dataSource: StudentModel[] = [];
  idTraining:string = "4149bdc6-f0b4-4f94-a030-385c695a88a7";
  constructor(
    private api: ApiService,
    private router:Router,
    private route: ActivatedRoute
    ) { 
    
  }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      this.idTraining = params['id']
      this.api.aprendicesByTrainingId(this.idTraining).subscribe((element )=>{
        this.dataSource = element;
      });
    })
  }

  verAprendiz(email:string){
   this.router.navigate(['std-info',this.idTraining, email])
  }
}
