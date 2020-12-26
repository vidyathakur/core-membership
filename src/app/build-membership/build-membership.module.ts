import { BuildMembershipRoutingModule } from './build-membership-routing.module';

import { BuildMembershipComponent } from 'src/app/build-membership/build-membership.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ng6-toastr-notifications';

@NgModule({
	declarations: [BuildMembershipComponent],
	imports: [
		CommonModule,
		FormsModule,
		NgbModule.forRoot(),
		HttpClientModule,
		NgxSpinnerModule,
		ReactiveFormsModule,
		ToastrModule.forRoot(),
    BuildMembershipRoutingModule
	]
})
export class BuildMembershipModule {}
