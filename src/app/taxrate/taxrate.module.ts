import { TaxrateComponent } from './taxrate.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxrateRoutingModule } from './taxrate-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ng6-toastr-notifications';

@NgModule({
  declarations: [TaxrateComponent],
  imports: [
    CommonModule,
     FormsModule,
      NgbModule,
      HttpClientModule,
      UiSwitchModule,
      BsDatepickerModule.forRoot(),
      NgxSpinnerModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    TaxrateRoutingModule
  ]
})
export class TaxrateModule { }
