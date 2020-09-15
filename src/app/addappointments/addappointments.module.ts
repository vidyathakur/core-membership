import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddappointmentsRoutingModule } from './addappointments-routing.module';
import { AddappointmentsComponent } from './addappointments.component';

@NgModule({
  declarations: [AddappointmentsComponent],
  imports: [
    CommonModule,
    AddappointmentsRoutingModule
  ]
})
export class AddappointmentsModule { }
