import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditclientcategoriesRoutingModule } from './editclientcategories-routing.module';
import { ToastrModule } from 'ng6-toastr-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

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
    EditclientcategoriesRoutingModule
  ]
})
export class EditclientcategoriesModule { }
