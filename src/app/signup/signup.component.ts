import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SignupService } from 'src/app/signup/signup.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/signup/must-match.validator';
import { JwtService } from 'src/app/login/jwt.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	registerForm: FormGroup;
	submitted = false;
	public full_name: any;
	public name: any;
	public company_name: any;
	public country_id: any;
	public county_id: any;
	public mobile: any;
	public email: any;
	public referal_code: any;
	public plan_id: any;
	public start_date: any;
	public end_date: any;
	public password: any;
	public countryList;
	emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
	constructor(
		public router: Router,
		public toastr: ToastrManager,
		private formBuilder: FormBuilder,
		private jwtService: JwtService,
		public signupService: SignupService
	) {
		if (this.jwtService.getToken('session_token')) {
			this.router.navigate(['/dashboard']);
		}
		this.registerForm = this.formBuilder.group(
			{
				full_name: ['', Validators.required],
				company_name: ['', Validators.required],
				mobile: ['', Validators.required],
				referal_code: [''],
				email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
				password: ['', [Validators.required, Validators.minLength(8)]],
				confirmPassword: ['', Validators.required],
				country_id: ['', Validators.required]
			},
			{
				validator: MustMatch('password', 'confirmPassword')
			}
		);
	}
	get f() {
		return this.registerForm.controls;
	}
	ngOnInit() {
		this.getCountry();
	}
	public goToSignIn: any = () => {
		this.router.navigate(['/login']);
	};

	onSubmit() {
		this.submitted = true;
		let response_data = this.registerForm.value;
		let data = {
			full_name: response_data.full_name || '',
			name: response_data.name || '',
			company_name: response_data.company_name || '',
			mobile: response_data.mobile || '',
			email: response_data.email || '',
			referal_code: response_data.referal_code || '',
			country_id: response_data.country_id,
			plan_id: response_data.plan_id || '',
			start_date: response_data.start_date || '',
			end_date: response_data.end_date || '',
			password: response_data.password || ''
		};

		console.log(data);

			this.signupService.signupFunction(data).subscribe(apiResponse => {
					if (apiResponse.code === 200) {
						this.toastr.successToastr('Signup Successfull');
						this.router.navigate(['/login']);
					} 
					else {
						// this.toastr.errorToastr(apiResponse.errors.email[0]);
						// this.toastr.errorToastr(apiResponse.errors.mobile[0]);
					}
				}, er => {
					// console.log(er.error.errors['email'][0]);
					// console.log(er.error.errors);
					// console.log(er.error.errors['email']);
					if(er.error.errors['mobile']){
						//this.toastr.errorToastr('Mobile No. is already registered with us!');
						this.toastr.errorToastr(er.error.errors['mobile'][0]);
					}
					if (er.error.errors['email']) {
						this.toastr.errorToastr(er.error.errors['email'][0]);
					}
					//this.toastr.errorToastr(er.error.errors['email'][0]); 
					//this.toastr.errorToastr(er.error.errors['mobile'][0]);
				});
     }

	onReset() {
		this.submitted = false;
		this.registerForm.reset();
	}

	public getCountry(): any {
		this.signupService.getCountry().subscribe(
			data => {
				console.log(data);
				this.countryList = data['data'];
			},
			error => {
				console.log(error);
			}
		);
	}
}
