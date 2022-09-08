import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StdInfoComponent } from './std-info.component';
import { HeatMapAllModule } from '@syncfusion/ej2-angular-heatmap';

@NgModule({
  imports: [
    CommonModule,
    HeatMapAllModule
  ],
  declarations: [
    StdInfoComponent,
  ]
})
export class StdInfoModule { }
