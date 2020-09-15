import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddemployeesRoutingModule } from './addemployees-routing.module';
import { AddemployeesComponent } from './addemployees.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// import { DpDatePickerModule } from 'ng2-date-picker';

@NgModule({
  declarations: [AddemployeesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AccordionModule,
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgbModule,
    AddemployeesRoutingModule
  ]
})
export class AddemployeesModule { }
