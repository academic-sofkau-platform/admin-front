import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StdInfoComponent } from './modules/std-info/std-info.component';
import { CursosComponent } from './pages/cursos/cursos.component';

const routes: Routes = [
  { path: '', redirectTo: '/std-info', pathMatch: 'full' },
  { path: 'std-info', component: StdInfoComponent },
  { path: 'cursos', component:CursosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
