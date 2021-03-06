import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientformembershipRoutingModule } from './clientformembership-routing.module';
import { ClientformembershipComponent } from './clientformembership.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ng6-toastr-notifications';

@NgModule({
  declarations: [ClientformembershipComponent],
  imports: [
    CommonModule,
    FormsModule,
     NgbModule.forRoot(),
      HttpClientModule,
      NgxSpinnerModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ClientformembershipRoutingModule
  ]
})
export class ClientformembershipModule { }
