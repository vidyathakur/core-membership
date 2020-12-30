import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosBillwalkRoutingModule } from './pos-billwalk-routing.module';
import { PosBillwalkComponent } from './pos-billwalk.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PosBillwalkComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    NgxSpinnerModule,
    SharedModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    PosBillwalkRoutingModule
  ]
})
export class PosBillwalkModule { }
