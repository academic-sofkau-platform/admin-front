import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { LoginModule } from './modules/login/login.module';
import { HeaderComponent } from './component/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeComponent } from './pages/home/home.component';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ListaAprendicesComponent } from './pages/lista-aprendices/lista-aprendices.component';
import { ListaTrainingActivosComponent } from './pages/lista-training-activos/lista-training-activos.component';
import { RutaAprendizajeComponent } from './pages/ruta-aprendizaje/ruta-aprendizaje.component';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import { CreacionTrainingComponent } from './pages/creacion-training/creacion-training.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { ApiService } from './shared/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeatMapAllModule } from '@syncfusion/ej2-angular-heatmap';
import { StdInfoComponent } from './pages/std-info/std-info.component';
import { ListaRutaAprendizajeComponent } from './pages/lista-ruta-aprendizaje/lista-ruta-aprendizaje.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ListasComponent } from './pages/listas/listas.component';
import { FooterComponent } from './component/footer/footer.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ResultadoCursosComponent } from './pages/resultado-cursos/resultado-cursos.component';
import { InformacionCalificacionAprendizComponent } from './pages/Informacion-calificacion-aprendiz/Informacion-calificacion-aprendiz.component';

import { AgregarAprendicesTrainingActivoComponent } from './pages/agregar-aprendices-training-activo/agregar-aprendices-training-activo.component';
import { TareaAprendizComponent } from './pages/tarea-aprendiz/tarea-aprendiz.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListaAprendicesComponent,
    HomeComponent,
    ListasComponent,
    CursosComponent,
    ListaAprendicesComponent,
    ListaTrainingActivosComponent,
    RutaAprendizajeComponent,
    CreacionTrainingComponent,
    CursosComponent,
    StdInfoComponent,
    ListaRutaAprendizajeComponent,
    FooterComponent,
    ResultadoCursosComponent,
    InformacionCalificacionAprendizComponent,
    AgregarAprendicesTrainingActivoComponent,
    TareaAprendizComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatListModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatMenuModule,
    MatTabsModule,
    MatButtonModule,
    HeatMapAllModule,
    MatPaginatorModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
