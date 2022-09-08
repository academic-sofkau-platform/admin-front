import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StdInfoModule } from './modules/std-info/std-info.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { LoginModule } from './modules/login/login.module';
import { HeaderComponent } from './component/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './pages/home/home.component';
import { AuthService } from './shared/services/auth.service';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CursosComponent } from './pages/cursos/cursos.component';
import { ListaAprendicesComponent } from './pages/lista-aprendices/lista-aprendices.component';
import { ListaTrainingActivosComponent } from './pages/lista-training-activos/lista-training-activos.component';
import { RutaAprendizajeComponent } from './pages/ruta-aprendizaje/ruta-aprendizaje.component';
import { TrainingComponent } from './pages/training/training.component';
import { MatSelect, MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CursosComponent,
    ListaAprendicesComponent,
    ListaTrainingActivosComponent,
    RutaAprendizajeComponent,
    TrainingComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StdInfoModule,
    LoginModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    NgbModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatListModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    LoginModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
