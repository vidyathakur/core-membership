import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditclientRoutingModule } from './editclient-routing.module';
import { EditclientComponent } from './editclient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ng6-toastr-notifications';

@NgModule({
  declarations: [EditclientComponent],
  imports: [
    CommonModule,
   FormsModule,
    HttpClientModule,
    AccordionModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgbModule,
    EditclientRoutingModule
  ]
})
export class EditclientModule { }
