import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddservicesRoutingModule } from './addservices-routing.module';
import { AddservicesComponent } from './addservices.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ng6-toastr-notifications';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AddservicesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ColorPickerModule,
    ToastrModule.forRoot(),
    AddservicesRoutingModule
  ]
})
export class AddservicesModule { }
