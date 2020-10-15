import { AddnewclientService } from '../addnewclient/addnewclient.service';
import { AppointmentsService } from '../appointments/appointments.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddappointmentsService } from 'src/app/addappointments/addappointments.service';

@Component({
	selector: 'app-addappointments',
	templateUrl: './addappointments.component.html',
	styleUrls: ['./addappointments.component.css']
})
export class AddappointmentsComponent implements OnInit {
	addappointmentForm: FormGroup;
	closeResult: string;
	@Input() fromParent;
	submitted = false;
	public serviceCats: any;
	public services: any;
	selectedValue = '09';
	public clients: any;
	public currentEmployees: any;
	constructor(
		private SpinnerService: NgxSpinnerService,
		public router: Router,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		private formBuilder: FormBuilder,
		private _route: ActivatedRoute,
		public appointmentsService: AppointmentsService,
		public addappointmentsservice: AddappointmentsService,
		public adminService: AdminService,
		public addnewclientService: AddnewclientService
	) {
		this.addappointmentForm = this.formBuilder.group({
			service_cat_id: [''],
			client_id: [''],
			employee_id: [''],
			duration: ['']
		});
	}

	onSubmit() {
		this.submitted = true;
		if (!this.addappointmentForm.invalid) {
			let appoint_data = this.addappointmentForm.value;
			console.log(appoint_data);
			let data = {
				service_cat_id: appoint_data.service_cat_id,
				client_id: appoint_data.client_id,
				employee_id: appoint_data.employee_id,
				duration: appoint_data.duration
			};
			console.log(data);
			this.appointmentsService.createAppointment(data).subscribe(apiResponse => {
				if (apiResponse.code === 200) {
					this.toastr.successToastr('Appointment Added Successfully');
				} else {
					console.log('Hello');
					this.toastr.errorToastr(apiResponse.message);
				}
			});
		}
	}
	ngOnInit() {
		//this.getServiceByMerchantId();
		this.getClientDetailsByMerchantID();
		this.getServiceCatByMerchantId();
		this.getEmployees();
	}

	// public getServiceByMerchantId(): any {
	// 	this.adminService.getServiceByMerchantId().subscribe(
	// 		data => {
	// 			console.log(data);
	// 			this.services = data['data'];
	// 		},
	// 		error => {
	// 			console.log('some error occured');
	// 			this.toastr.errorToastr('some error occured');
	// 		}
	// 	);
	// }
	// filterForeCasts(filterVal: any) {
	// 	if (filterVal == '0') this.forecasts = this.cacheForecasts;
	// 	else this.forecasts = this.cacheForecasts.filter(item => item.summary == filterVal);
	// }
	public getServiceByCatId(id): any {
		this.addappointmentsservice.getServiceByCatId(id).subscribe(data => {
				console.log(data);
				this.services = data['data'];
			}, error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			});
	}

	changeServiceCat(e,id) {
			// this.services = [e.target.value];
			// console.log(this.services);
			this.addappointmentsservice.getServiceByCatId(id).subscribe(data => {
					console.log(data);
					this.services = data['data'];
				}, error => {
					console.log('some error occured');
					this.toastr.errorToastr('some error occured');
				});
	
		console.log(e.target.value);
	}

	public getServiceCatByMerchantId(): any {
		this.adminService.getServiceCatByMerchantId({}).subscribe(
			data => {
				console.log(data);
				this.serviceCats = data['data'];
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}

	public getClientDetailsByMerchantID(): any {
		this.SpinnerService.show();
		this.addnewclientService.getClientDetailsByMerchantID({}).subscribe(
			data => {
				console.log(data);
				this.clients = data['data'];
				setTimeout(() => {
					this.SpinnerService.hide();
				}, 2000);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}

	public getEmployees(): any {
		this.adminService.getEmpDetailByMerchantId({}).subscribe(
			data => {
				console.log(data);
				this.currentEmployees = data['data'];
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}
}
