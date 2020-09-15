import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditserviceRoutingModule } from './editservice-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ng6-toastr-notifications';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { EditserviceComponent } from 'src/app/editservice/editservice.component';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [EditserviceComponent],
  imports: [
    CommonModule,
     FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AccordionModule,
    NgbModule,
    ColorPickerModule,
     BsDatepickerModule.forRoot(),
    ToastrModule.forRoot(),
    EditserviceRoutingModule
  ]
})
export class EditserviceModule { }
