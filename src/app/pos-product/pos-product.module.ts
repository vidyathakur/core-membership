import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosProductRoutingModule } from './pos-product-routing.module';
import { PosProductComponent } from './pos-product.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PosProductComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    NgxSpinnerModule,
    SharedModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    PosProductRoutingModule
  ]
})
export class PosProductModule { }
