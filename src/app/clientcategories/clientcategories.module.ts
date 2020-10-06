import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ng6-toastr-notifications';
import { ClientcategoriesRoutingModule } from './clientcategories-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [],
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
    ClientcategoriesRoutingModule
  ]
})
export class ClientcategoriesModule { }
