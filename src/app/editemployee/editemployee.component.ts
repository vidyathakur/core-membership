import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EditemployeeService } from 'src/app/editemployee/editemployee.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AddemployeesService } from 'src/app/addemployees/addemployees.service';
import { JwtService } from 'src/app/login/jwt.service';

@Component({
	selector: 'app-editemployee',
	templateUrl: './editemployee.component.html',
	styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent implements OnInit {
	birthday: any;
	employees_id: string;
	public currentEmp: any;
	employeeid: any;
	employeeForm: FormGroup;
	submitted = false;
	public email: any;
	public appointmenton: number;
	public rebookrate: number;
	public stateid: number;
	public giftvoucher: number;
	public suburbs: any;
	public orders: number;
	public phoneno: number;
	public displayname: any;
	public clientperday: number;
	public avgclientperday: number;
	public retailsale: number;
	public wagesvssale: number;
	public passwords: any;
	public roles: any;
	public packages: number;
	public productprofit: number;
	public productrevenue: number;
	public services: number;
	public fname: any;
	public surName: any;
	public twitter: any;
	public mobiles: number;
	public genders: any;
	public birthDay: any;
	public Address: any;
	public postCode: number;
	public appointsms: number;
	public appointemail: number;
	public promote_sms: any;
	public promote_email: any;
	public empLevelNames: any;
	public display_name: any;
	public stateList: any;
	public emplevel_id: number;
	constructor(
		public router: Router,
		public addemployeesService: AddemployeesService,
		private _route: ActivatedRoute,
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		public editemployeeService: EditemployeeService
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
			birthday: [],
			address: ['', Validators.required],
			postcode: ['', Validators.required],
			service: ['', [Validators.pattern('^[0-9]*$')]],
			product_revenue: ['', [Validators.pattern('^[0-9]*$')]],
			product_profit: ['', [Validators.pattern('^[0-9]*$')]],
			package: ['', [Validators.pattern('^[0-9]*$')]],
			gift_voucher: ['', [Validators.pattern('^[0-9]*$')]],
			emp_level_id: ['', Validators.required],
			role: ['', Validators.required],
			// password: ['', [Validators.required, Validators.minLength(9)]],
			appointment_on: [],
			rebook_rate: ['', [Validators.pattern('^[0-9]*$')]],
			wages_vs_sale: ['', [Validators.pattern('^[0-9]*$')]],
			retail_sale: ['', [Validators.pattern('^[0-9]*$')]],
			client_per_day: ['', [Validators.pattern('^[0-9]*$')]],
			avg_client_per_day: ['', [Validators.pattern('^[0-9]*$')]],
			appoint_email: [],
			appoint_sms: [],
			employee_id: ['']
		});
	}
	get f() {
		return this.employeeForm.controls;
	}

	ngOnInit() {
		this.getStates();
		this.getEmpLevelName();
		let myEmployeeId = this._route.snapshot.paramMap.get('id');
		console.log(myEmployeeId);
		let paramsData = {
			employees_id: myEmployeeId
		};

		this.editemployeeService.getEmployeesDetailsById(paramsData).subscribe(
			data => {
				let employee_details = data['data'];
				console.log(employee_details);
				let birthday_data = employee_details.birthday ? employee_details.birthday.split('-') : ['0', '0', '0'];
				console.log(birthday_data);
				this.employeeForm = this.formBuilder.group({
					display_name: [employee_details.display_name, Validators.required],
					order: [employee_details.order, [Validators.pattern('^[0-9]*$')]],
					appointment_on: [
						employee_details.appointment_on ? employee_details.appointment_on.toString() : '0',
						Validators.required
					],
					state_id: [
						employee_details.state_id ? employee_details.state_id.toString() : '',
						Validators.required
					],
					phone_no: [employee_details.phone_no],
					rebook_rate: [employee_details.rebook_rate, [Validators.pattern('^[0-9]*$')]],
					gift_voucher: [employee_details.gift_voucher, [Validators.pattern('^[0-9]*$')]],
					suburb: [employee_details.suburb, Validators.required],
					email: [employee_details.email, Validators.required],
					f_name: [employee_details.f_name, Validators.required],
					surname: [employee_details.surname, Validators.required],
					mobile: [
						employee_details.mobile,
						[Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]
					],
					gender: [employee_details.gender, Validators.required],
					birthday: [
						{
							year: Number(birthday_data[0]),
							month: Number(birthday_data[1]),
							day: Number(birthday_data[2])
						}
					],
					address: [employee_details.address, Validators.required],
					postcode: [employee_details.postcode, Validators.required],
					appoint_sms: [
						employee_details.appoint_sms ? employee_details.appoint_sms.toString() : '0',
						Validators.required
					],
					appoint_email: [
						employee_details.appoint_email ? employee_details.appoint_email.toString() : '0',
						Validators.required
					],
					service: [employee_details.service, [Validators.pattern('^[0-9]*$')]],
					product_revenue: [employee_details.product_revenue, [Validators.pattern('^[0-9]*$')]],
					product_profit: [employee_details.product_profit, [Validators.pattern('^[0-9]*$')]],
					package: [employee_details.package, [Validators.pattern('^[0-9]*$')]],
					role: [employee_details.role, Validators.required],
					// password: [employee_details.password, [Validators.required, Validators.minLength(9)]],
					wages_vs_sale: [employee_details.wages_vs_sale, [Validators.pattern('^[0-9]*$')]],
					retail_sale: [employee_details.retail_sale, [Validators.pattern('^[0-9]*$')]],
					client_per_day: [employee_details.client_per_day, [Validators.pattern('^[0-9]*$')]],
					avg_client_per_day: [employee_details.avg_client_per_day, [Validators.pattern('^[0-9]*$')]],
					emp_level_id: [
						employee_details.emp_level_id ? employee_details.emp_level_id.toString() : '',
						[Validators.required]
					],
					employee_id: [myEmployeeId]
				});
			},
			error => {
				console.log('some error occured');
			}
		);
	}

	public getEmpLevelName(): any {
		this.editemployeeService.getEmplevelByMechantId({}).subscribe(
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
		this.addemployeesService.getStates(paramsData).subscribe(
			data => {
				console.log(data);
				this.stateList = data['data'];
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}

	public updateEmployee(): any {
		this.submitted = true;
		let employee_data = this.employeeForm.value;
		console.log(employee_data);
		let birthday = employee_data.birthday
			? employee_data.birthday.year + '/' + employee_data.birthday.month + '/' + employee_data.birthday.day
			: '';
		let data = {
			employee_id: employee_data.employee_id,
			display_name: employee_data.display_name || '',
			order: employee_data.order || '',
			f_name: employee_data.f_name || '',
			state_id: employee_data.state_id || '',
			appointment_on: employee_data.appointment_on,
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
			appoint_sms: employee_data.appoint_sms,
			appoint_email: employee_data.appoint_email,
			promote_sms: employee_data.promote_sms || '',
			promote_email: employee_data.promote_email || '',
			service: employee_data.service || '',
			product_revenue: employee_data.product_revenue || '',
			product_profit: employee_data.product_profit || '',
			package: employee_data.package || '',
			role: employee_data.role || '',
			// password: employee_data.password || '',
			wages_vs_sale: employee_data.wages_vs_sale || '',
			retail_sale: employee_data.retail_sale || '',
			client_per_day: employee_data.client_per_day || '',
			avg_client_per_day: employee_data.avg_client_per_day || '',
			emp_level_id: employee_data.emp_level_id
		};
		console.log(data);
		this.editemployeeService.editEmployee(data).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Employee Updated Successfully');
				this.jwtService.setToken('tabId', 'employees-tab');
				this.router.navigate(['/admin']);
			},
			er => {
				// console.log(er.error.errors['order'][0]);
				// console.log(er.error.errors);
				// console.log(er.error.errors['order']);
				// this.toastr.errorToastr(er.error.errors['order'][0]);
				this.toastr.errorToastr('some error occured');
			}
		);
	}

	goToEditEmp() {
		this.jwtService.setToken('tabId', 'employees-tab');
		this.router.navigate(['/admin']);
	}
	onCancel() {
		this.jwtService.setToken('tabId', 'employees-tab');
		this.router.navigate(['/admin']);
	}
}
