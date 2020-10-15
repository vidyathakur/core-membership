import { EditemployeeComponent } from './editemployee.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditemployeeRoutingModule } from './editemployee-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ng6-toastr-notifications';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@NgModule({
  declarations: [EditemployeeComponent],
  imports: [
    CommonModule,
     FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AccordionModule,
    NgbModule,
    ToastrModule.forRoot(),
    EditemployeeRoutingModule
  ]
})
export class EditemployeeModule { }
