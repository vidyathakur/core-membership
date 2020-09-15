import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddnewclientRoutingModule } from './addnewclient-routing.module';
import { AddnewclientComponent } from './addnewclient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AddnewclientComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AccordionModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgbModule,
    AddnewclientRoutingModule
  ]
})
export class AddnewclientModule { }
