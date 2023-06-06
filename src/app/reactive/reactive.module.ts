import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ReactiveRoutingModule } from './reactive-routing.module';
import { BasicPageComponent } from './pages/basic-page/basic-page.component';
import { DinamicPageComponent } from './pages/dinamic-page/dinamic-page.component';
import { SwitchPageComponent } from './pages/switch-page/switch-page.component';

@NgModule({
  declarations: [BasicPageComponent, DinamicPageComponent, SwitchPageComponent],
  imports: [CommonModule, ReactiveRoutingModule, ReactiveFormsModule],
})
export class ReactiveModule {}
