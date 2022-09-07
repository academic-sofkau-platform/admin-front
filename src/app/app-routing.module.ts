import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { StdInfoComponent } from './modules/std-info/std-info.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { CursosComponent } from './pages/cursos/cursos.component';
import { RutaAprendizajeComponent } from './pages/ruta-aprendizaje/ruta-aprendizaje.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate:[AuthGuard] },
  { path: 'std-info', component: StdInfoComponent, canActivate:[AuthGuard] },
  { path: 'cursos', component:CursosComponent, canActivate:[AuthGuard] },
  { path: 'ruta-aprendizaje', component: RutaAprendizajeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
