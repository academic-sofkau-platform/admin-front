import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CursoModel } from '../models/curso';
import { environment } from 'src/environments/environment';
import { CrearCursoCommand } from '../commands/crearCursoCommand';
import { EliminarCursoCommand } from '../commands/eliminarCursoCommand';
import { CrearRutaAprendizajeCommand } from '../commands/CrearRutaAprendizajeCommand';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

constructor(private http: HttpClient) { }

//CURSOS
getCursos(): Observable<CursoModel[]> {
  return this.http.get<CursoModel[]>(environment.apiBase + '/curso');
}

crearCurso(command: CrearCursoCommand) {
  return this.http.post(environment.apiBase + '/curso/save',command);
}

deleteCurso(command: EliminarCursoCommand){
  return this.http.post(environment.apiBase + '/curso/delete/', command);
}

//RUTAS DE APRENDIZAJE
crearRutaAprendizaje(command: CrearRutaAprendizajeCommand) {
  return this.http.post(environment.apiBase + '/rutaAprendizaje/save', command)
}

}

