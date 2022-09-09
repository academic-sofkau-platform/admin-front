import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { StdInfoComponent } from './pages/std-info/std-info.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { CursosComponent } from './pages/cursos/cursos.component';
import { HomeComponent } from './pages/home/home.component';
import { RutaAprendizajeComponent } from './pages/ruta-aprendizaje/ruta-aprendizaje.component';
import { CreacionTrainingComponent } from './modules/creacion-training/creacion-training.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'std-info', component: StdInfoComponent},
  { path: 'cursos', component:CursosComponent},
  { path: 'ruta-aprendizaje', component: RutaAprendizajeComponent},
  { path: 'creacion-training', component: CreacionTrainingComponent},
];
//, canActivate: [AuthGuard]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
