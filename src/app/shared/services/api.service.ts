import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CursoModel } from '../models/curso';
import { environment } from 'src/environments/environment';
import { CrearCursoCommand } from '../commands/crearCursoCommand';
import { EliminarCursoCommand } from '../commands/eliminarCursoCommand';
import { CrearRutaAprendizajeCommand } from '../commands/crearRutaAprendizajeCommand';
import { ModificarCursoCommand } from '../commands/modificarCursoCommand';
import { StudentModel } from '../models/student';
import { RutaAprendizajeModel } from '../models/ruta-aprendizaje';
<<<<<<< HEAD
import { CrearTrainingCommand } from '../commands/crearTrainingCommand';
=======
import { TrainingModel } from '../models/training';
>>>>>>> aae9b7f2866b374f026681d564d00cf5bc21b791


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //CURSOS
  getCursos(): Observable<CursoModel[]> {
    return this.http.get<any[]>(environment.apiBase + '/curso');
  }

  crearCurso(command: CrearCursoCommand) {
    return this.http.post(environment.apiBase + '/curso/save', command);
  }

  deleteCurso(cursoId:string){
    return this.http.post(environment.apiBase + '/curso/delete/', cursoId);
  }

  modificarCurso(cursoId:string, command: ModificarCursoCommand){
    return this.http.post(environment.apiBase + '/curso/update/' +cursoId , command);
  }

  //RUTAS DE APRENDIZAJE
  crearRutaAprendizaje(command: CrearRutaAprendizajeCommand) {
    console.log(command);
    return this.http.post(environment.apiBase + '/rutaAprendizaje/save', command)
  }

  getRutasAprendizaje(): Observable<RutaAprendizajeModel[]>{
    return this.http.get<RutaAprendizajeModel[]>(environment.apiBase + '/rutaAprendizaje/findAll');
  }

  eliminarRutaAprendizaje(id:string){
    return this.http.post(environment.apiBase + '/rutaAprendizaje/delete', id);
  }

  getRutaAprendizaje(id:string): Observable<RutaAprendizajeModel>{
    return this.http.get<RutaAprendizajeModel>(environment.apiBase + '/rutaAprendizaje/findById/' + id);
  }

  //ACTIVIDAD
  getActividad(cursoId: string, aprendizId: string): Observable<CursoModel[]> {
    return this.http.get<any[]>(environment.apiBase + '/find-specific/' + cursoId + '/' + aprendizId);
  }


  //APRENDICES
  aprendicesByTrainingId(trainingId: string): Observable<StudentModel[]> {
    return this.http.get<StudentModel[]>(environment.apiBase + '/trainings/getAprendicesByTrainingId/' + trainingId)
  }

<<<<<<< HEAD
  //CREAR TRAINING
  crearTraining(command: CrearTrainingCommand) {
    console.log(command);
    //return this.http.post(environment.apiBase + '/trainings/save', command)
  }
=======
//TRAININGS ACTIVOS
getActiveTrainings():Observable<TrainingModel[]>{
  console.log("desplegando trainings");
  return this.http.get<TrainingModel[]>(environment.apiBase + '/trainings/findAllTrainingActivos')
}
>>>>>>> aae9b7f2866b374f026681d564d00cf5bc21b791

}
