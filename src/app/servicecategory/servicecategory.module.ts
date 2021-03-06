
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ng6-toastr-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ServicecategoryRoutingModule } from './servicecategory-routing.module';

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
    ServicecategoryRoutingModule
  ]
})
export class ServicecategoryModule { }
