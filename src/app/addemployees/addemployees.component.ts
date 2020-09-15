import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { AddemployeesService } from 'src/app/addemployees/addemployees.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
	selector: 'app-addemployees',
	templateUrl: './addemployees.component.html',
	styleUrls: ['./addemployees.component.css']
})
export class AddemployeesComponent implements OnInit {
	employeeForm: FormGroup;
	submitted = false;
	public email: any;
	public appointment_on: number;
	public rebook_rate: number;
	public state_id: number;
	public emp_level_id: number;
	public gift_voucher: number;
	public suburb: any;
	public order: number;
	public phone_no: number;
	public display_name: any;
	public client_per_day: number;
	public avg_client_per_day: number;
	public retail_sale: number;
	public wages_vs_sale: number;
	public password: any;
	public role: any;
	public package: number;
	public product_profit: number;
	public product_revenue: number;
	public service: number;
	public f_name: any;
	public surname: any;
	public twitter: any;
	public mobile: number;
	public gender: any;
	public birthday: any;
	public address: any;
	public postcode: number;
	public appoint_sms: number;
	public appoint_email: number;
	public promote_sms: any;
	public promote_email: any;
	public empLevelNames: any;
	public stateList:any;
	myModel = true;

	genders = [{ id: 1, name: 'Email' }, { id: 2, name: 'Phone' }];

	constructor(
		private formBuilder: FormBuilder,
		public router: Router,
		private _route: ActivatedRoute,
		public toastr: ToastrManager,
		public addemployeesService: AddemployeesService,
		private jwtService: JwtService
	) {
		this.employeeForm = this.formBuilder.group({
			display_name: ['', Validators.required],
			order: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
			state_id: [],
			phone_no: [],
			suburb: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			f_name: ['', Validators.required],
			surname: [],
			mobile: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
			gender: ['', Validators.required],
			birthday: [''],
			address: ['', Validators.required],
			postcode: ['', Validators.required],
			service: ['', [Validators.pattern('^[0-9]*$')]],
			product_revenue: ['', [Validators.pattern('^[0-9]*$')]],
			product_profit: ['', [Validators.pattern('^[0-9]*$')]],
			package: ['', [Validators.pattern('^[0-9]*$')]],
			gift_voucher: ['', [Validators.pattern('^[0-9]*$')]],
			emp_level_id: [],
			role: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(9)]],
			appointment_on: [],
			rebook_rate: ['', [Validators.pattern('^[0-9]*$')]],
			wages_vs_sale: ['', [Validators.pattern('^[0-9]*$')]],
			retail_sale: ['', [Validators.pattern('^[0-9]*$')]],
			client_per_day: ['', [Validators.pattern('^[0-9]*$')]],
			avg_client_per_day: ['', [Validators.pattern('^[0-9]*$')]],
			appoint_email: [],
			appoint_sms: [],
		});
	}
	get f() {
		return this.employeeForm.controls;
	}

	ngOnInit(): void {
		this.getEmpLevelName();
		this.getStates();
		let scriptPath = [
			'../assets/js/jquery.slimscroll.min.js',
			'../assets/js/jquery.slicknav.min.js',
			'../assets/js/scripts.js',
			'../assets/js/metisMenu.min.js',
			'../assets/js/plugin.js'
		];
		this.loadScript(scriptPath);
	}
	public loadScript(url) {
		for (let i in url) {
			const body = <HTMLDivElement>document.body;
			const script = document.createElement('script');
			script.innerHTML = '';
			script.src = url[i];
			script.async = false;
			script.defer = true;
			body.appendChild(script);
		}
	}

	onSubmit() {
		this.submitted = true;
		if (!this.employeeForm.invalid) {
				let employee_data = this.employeeForm.value;
				let birthday = employee_data.birthday
					? employee_data.birthday.year + '/' + employee_data.birthday.month + '/' + employee_data.birthday.day
					: '';
				let data = {
					display_name: employee_data.display_name || '',
					order: employee_data.order || '',
					f_name: employee_data.f_name || '',
					state_id: employee_data.state_id || '',
					appointment_on: employee_data.appointment_on || 0,
					surname: employee_data.surname || '',
					rebook_rate: employee_data.rebook_rate || '',
					gift_voucher: employee_data.gift_voucher || '',
					suburb: employee_data.suburb || '',
					mobile: employee_data.mobile || '',
					gender: employee_data.gender || '',
					phone_no: employee_data.phone_no || '',
					email: employee_data.email || '',
					birthday: birthday || '',
					address: employee_data.address || '',
					postcode: employee_data.postcode || '',
					appoint_sms: employee_data.appoint_sms  || 0,
					appoint_email: employee_data.appoint_email ||  0,
					promote_sms: employee_data.promote_sms || '',
					promote_email: employee_data.promote_email || '',
					service: employee_data.service || '',
					product_revenue: employee_data.product_revenue || '',
					product_profit: employee_data.product_profit || '',
					package: employee_data.package || '',
					role: employee_data.role || '',
					password: employee_data.password || '',
					wages_vs_sale: employee_data.wages_vs_sale || '',
					retail_sale: employee_data.retail_sale || '',
					client_per_day: employee_data.client_per_day || '',
					avg_client_per_day: employee_data.avg_client_per_day || '',
					emp_level_id: employee_data.emp_level_id,
				};
				console.log(data);
				this.addemployeesService.createEmployee(data).subscribe(
					apiResponse => {
							if (apiResponse.code === 200) {
								this.toastr.successToastr('Employee Added Successfully');
								this.router.navigate(['/admin']);
							} else {
								console.log("Hello");
								this.toastr.errorToastr(apiResponse.errors.order[0]);
							}
						}, er => {
							console.log(er.error.errors['order'][0]);
							console.log(er.error.errors);
							console.log(er.error.errors['order']);
							this.toastr.errorToastr(er.error.errors['order'][0]);
						});
			}
	}

	public getEmpLevelName(): any {
		this.addemployeesService.getEmplevelByMechantId({}).subscribe(
			data => {
				console.log(data);
				this.empLevelNames = data['data'];
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}

	public getStates(): any {
		let country_id = this.jwtService.getTokenByParams('country_id');
			let paramsData = {
									country_id: country_id
								};
								console.log(paramsData);
		this.addemployeesService.getStates(paramsData).subscribe(data => {
				console.log(data);
				this.stateList = data['data'];
			}, error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			});
	}
	onReset() {
		this.submitted = false;
		this.employeeForm.reset();
	}


}

