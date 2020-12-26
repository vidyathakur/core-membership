import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosRoutingModule } from './pos-routing.module';
import { PosComponent } from './pos.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PosComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    UiSwitchModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    PosRoutingModule
  ]
})
export class PosModule { }
