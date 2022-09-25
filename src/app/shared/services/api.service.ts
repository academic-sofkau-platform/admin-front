import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CursoModel } from '../models/curso';
import { environment } from 'src/environments/environment';
import { CrearCursoCommand } from '../commands/crearCursoCommand';
import { CrearRutaAprendizajeCommand } from '../commands/crearRutaAprendizajeCommand';
import { ModificarCursoCommand } from '../commands/modificarCursoCommand';
import { StudentModel } from '../models/student';
import { ActividadModel } from '../models/actividad';
import { RutaAprendizajeModel } from '../models/ruta-aprendizaje';
import { CrearTrainingCommand } from '../commands/crearTrainingCommand';
import { TrainingModel } from '../models/training';
import { ModificarRutaAprendizajeCommand } from '../commands/modificarRutaAprendizajeCommand';
import { AgregarRutaCommand } from '../commands/agregarRutaCommand';
import { AgregarAprendicesListCommand } from '../commands/agregarAprendicesListCommand';
import { ActiveTraining } from '../models/active-training';
import { UpdateNotaTareaCommand } from '../commands/updateNotaTareaCommand';

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

  deleteCurso(cursoId: string) {
    return this.http.post(environment.apiBase + '/curso/delete/', cursoId);
  }

  modificarCurso(cursoId: string, command: ModificarCursoCommand) {
    return this.http.post(environment.apiBase + '/curso/update/' + cursoId, command);
  }

  //RUTAS DE APRENDIZAJE
  crearRutaAprendizaje(command: CrearRutaAprendizajeCommand) {
    return this.http.post(environment.apiBase + '/rutaAprendizaje/save', command)
  }

  getRutasAprendizaje(): Observable<RutaAprendizajeModel[]> {
    return this.http.get<RutaAprendizajeModel[]>(environment.apiBase + '/rutaAprendizaje/findAll');
  }

  eliminarRutaAprendizaje(id:string){
    return this.http.post(environment.apiBase + '/rutaAprendizaje/delete', id);
  }

  getRutaAprendizaje(id:string): Observable<RutaAprendizajeModel>{
    return this.http.get<RutaAprendizajeModel>(environment.apiBase + '/rutaAprendizaje/findById/' + id);
  }

  modificarRutaAprendizaje(id:string, command: ModificarRutaAprendizajeCommand){
    return this.http.post(environment.apiBase + '/rutaAprendizaje/update/' + id, command)
  }

  quitarRuta(id:string, rutaId:string){
    return this.http.post(environment.apiBase + '/rutaAprendizaje/delete/route/' + id, rutaId)
  }

  agregarRuta(id:string , command: AgregarRutaCommand){
    return this.http.post(environment.apiBase + '/rutaAprendizaje/add/route/' + id, command)
  }

  controlCursoEnRutaAprendizaje(id:string) {
    return this.http.get(environment.apiBase + '/rutaAprendizaje/curso/' + id)
  }

  //ACTIVIDAD
  getActividad(trainingId: string, aprendizId: string): Observable <ActividadModel[]> {
    return this.http.get<ActividadModel[]>(environment.apiBase + '/activity/find-specific/' + trainingId + '/' + aprendizId);
  }

  getAprendiceByTrainingAndMail(trainingId: string, aprendizEmail: string): Observable <any> {
    return this.http.get<any>(environment.apiBase + '/trainings/aprendices/' + trainingId + '/' + aprendizEmail);
  }

  getTrainingById(trainingId: string): Observable <any>{
    return this.http.get<any>(environment.apiBase + '/trainings/findById/' + trainingId);
  }

  //APRENDICES
  aprendicesByTrainingId(trainingId: string): Observable<StudentModel[]> {
    return this.http.get<StudentModel[]>(environment.apiBase + '/trainings/getAprendicesByTrainingId/' + trainingId)
  }
  agregarApredicesByTrainingId(trainingId: string, command: AgregarAprendicesListCommand) {
    return this.http.put(environment.apiBase + '/trainings/agregarAprendices/' + trainingId, command)
  }


  //TRAINING
  crearTraining(command: CrearTrainingCommand) {
    return this.http.post(environment.apiBase + '/trainings/save', command)
  }
  deleteAprendizByEmail(trainingId:string, email:string){
    return this.http.post(environment.apiBase + '/trainings/deleteAprendiz/'+ trainingId, email);
  }
 /* getActiveTrainings(): Observable<TrainingModel[]> {
    return this.http.get<TrainingModel[]>(environment.apiBase + '/trainings/findAllTrainingActivos')
  }*/
  getActiveTrainings(): Observable<ActiveTraining[]> {
    console.log("desplegando trainings");
    return this.http.get<ActiveTraining[]>(environment.apiBase + '/trainings/findAllTrainingActivos')
  }

  getResultadoCursos(){
    return this.http.get(environment.apiBase + '/trainings/getResultadoCursos');
  }

  updateNotaTarea(trainingId:string, email:string, command:UpdateNotaTareaCommand) {
    return this.http.post(environment.apiBase + '/trainings/updateNotaTarea/' + trainingId + '/' + email , command)
  }

  getAllAprendicesParaCalificar(): Observable<any[]>{
    return this.http.get<any[]>(environment.apiBase + '/trainings/getAllAprendiz');
  }

  getAllTareasByEmail(trainingId:string, email:string): Observable<any[]>{
    return this.http.get<any[]>(environment.apiBase + '/trainings/getTareaAprendiz/' + trainingId + '/' + email);
  }


  }

  //RESULTADO DE LOS CURSOS
  // getResultadoCursos(): Observable<ResultadoCursosModel[]> {
  //   return this.http.get<ResultadoCursosModel[]>(environment.apiBase + '//////');
  // }

