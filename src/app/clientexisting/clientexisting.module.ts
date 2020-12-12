import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientexistingRoutingModule } from './clientexisting-routing.module';
import { ClientexistingComponent } from './clientexisting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ng6-toastr-notifications';

@NgModule({
  declarations: [ClientexistingComponent],
  imports: [
    CommonModule,
    FormsModule,
     NgbModule.forRoot(),
      HttpClientModule,
      NgxSpinnerModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ClientexistingRoutingModule
  ]
})
export class ClientexistingModule { }
