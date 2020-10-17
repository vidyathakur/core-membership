import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddappointmentsRoutingModule } from './addappointments-routing.module';
import { AddappointmentsComponent } from './addappointments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AddappointmentsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    AccordionModule,
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgbModule,
    AddappointmentsRoutingModule
  ]
})
export class AddappointmentsModule { }
