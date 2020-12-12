import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ClientformembershipService } from 'src/app/clientformembership/clientformembership.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
	selector: 'app-clientformembership',
	templateUrl: './clientformembership.component.html',
	styleUrls: ['./clientformembership.component.css']
})
export class ClientformembershipComponent implements OnInit {
	clientmembershipForm: FormGroup;
	submitted = false;
	constructor(
		private SpinnerService: NgxSpinnerService,
		private formBuilder: FormBuilder,
		public router: Router,
		private _route: ActivatedRoute,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		private clientformembershipService: ClientformembershipService
	) {}

	ngOnInit() {
		this.clientmembershipForm = this.formBuilder.group({
			f_name: new FormControl('', Validators.required),
			surname: new FormControl('', Validators.required),
			gender: new FormControl('', Validators.required),
			mobile: new FormControl('', Validators.required),
			email: new FormControl('', Validators.required)
		});
	}

	get f() {
		return this.clientmembershipForm.controls;
	}

	onSubmit() {
		this.submitted = true;
		
		if (!this.clientmembershipForm.invalid) {
			let client_data = this.clientmembershipForm.value;
			let data = {
				f_name: client_data.f_name || '',
				surname: client_data.surname || '',
				mobile: client_data.mobile || '',
				gender: client_data.gender || '',
				email: client_data.email || ''
			};
			console.log(data);
			this.clientformembershipService.createClientForMembership(data).subscribe(apiResponse => {
				if (apiResponse.code === 200) {
					this.toastr.successToastr('Client Added Successfully');
					this.router.navigate(['/membership']);
					
				} else {
					console.log('Hello');
					this.toastr.errorToastr(apiResponse.errors);
				}
			});
		}
	}
}
