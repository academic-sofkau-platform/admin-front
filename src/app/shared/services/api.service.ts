import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

constructor(private http:HttpClient, public afs:AngularFirestore) { }

}

getActiveTrainings():Observable<Training>{
  console.log("desplegando trainings");
  return this.http.get<Training[]>(environment.apiBase + '/')
}