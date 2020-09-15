import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ng6-toastr-notifications';
import { PublicholidayRoutingModule } from './publicholiday-routing.module';
import { PublicholidayComponent } from 'src/app/publicholiday/publicholiday.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDate,NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UiSwitchModule } from 'ngx-toggle-switch';

@NgModule({
  declarations: [PublicholidayComponent],
  imports: [
    CommonModule,
     FormsModule,
     NgbModule.forRoot(),
      HttpClientModule,
      UiSwitchModule,
      NgxSpinnerModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    PublicholidayRoutingModule
  ]
})
export class PublicholidayModule { }
