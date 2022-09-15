import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { StdInfoComponent } from './pages/std-info/std-info.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { CursosComponent } from './pages/cursos/cursos.component';
import { HomeComponent } from './pages/home/home.component';
import { RutaAprendizajeComponent } from './pages/ruta-aprendizaje/ruta-aprendizaje.component';
import { ListaTrainingActivosComponent } from './pages/lista-training-activos/lista-training-activos.component';
import { ListaAprendicesComponent } from './pages/lista-aprendices/lista-aprendices.component';
import { CreacionTrainingComponent } from './pages/creacion-training/creacion-training.component';
import { ListaRutaAprendizajeComponent } from './pages/lista-ruta-aprendizaje/lista-ruta-aprendizaje.component';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },//borrar por ser reduntante ++

  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'std-info/:id/:email', component: StdInfoComponent},
  { path: 'cursos', component:CursosComponent},
  { path: 'list-aprendices/:id', component:ListaAprendicesComponent},
  { path: 'ruta-aprendizaje', component: RutaAprendizajeComponent},
  { path: 'creacion-training', component: CreacionTrainingComponent},
  //cualquier otra cosa me redirectea a 404
  { path: '**', redirectTo:'login'}, //++
  { path: 'list-ruta-aprendizaje', component: ListaRutaAprendizajeComponent},
  { path: 'lista-training-activos', component: ListaTrainingActivosComponent},
  { path: 'ruta-aprendizaje/:id', component: RutaAprendizajeComponent}
];
//, canActivate: [AuthGuard]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
