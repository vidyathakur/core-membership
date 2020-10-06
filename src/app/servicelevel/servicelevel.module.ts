
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicelevelRoutingModule } from './servicelevel-routing.module';
import { ToastrModule } from 'ng6-toastr-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ServicelevelRoutingModule
  ]
})
export class ServicelevelModule { }
