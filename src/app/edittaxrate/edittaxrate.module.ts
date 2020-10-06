import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EdittaxrateRoutingModule } from './edittaxrate-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ng6-toastr-notifications';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
     FormsModule,
      NgbModule,
      HttpClientModule,
      NgxSpinnerModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    EdittaxrateRoutingModule
  ]
})
export class EdittaxrateModule { }
