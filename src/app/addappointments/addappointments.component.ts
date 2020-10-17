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
	checkedList: [];
	servicesData: {};
	selectedItems: [];
	model;
	addappointmentForm: FormGroup;
	closeResult: string;
	@Input() fromParent;
	submitted = false;
	public serviceCats: any;
	public services: any;
	selectedValue = '09';
	public clients: any;
	public currentEmployees: any;
	checkOutputDta: any[];
	events: string[] = [];
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
			start_date: [''],
			duration: ['']
		});
		this.selectedItems = [];
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
				duration: appoint_data.duration,
				start_date: appoint_data.start_date
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

	changeServiceCat(e) {
		let id = e.target.value;
		this.addappointmentsservice.getServiceByCatId(id).subscribe(
			data => {
				console.log(data);
				let responseData = {};
				data['data'].forEach(item => {
					responseData[item.id] = item;
				});
				this.servicesData = responseData;
				this.services = data['data'];
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);

		console.log(e.target.value);
	}

	// 	onCheckboxChange(option, event) {
	// 		console.log(option);
	// 		let data = [];
	// 		if(event.target.checked) {
	// 			data.push(option.id);
	// 		}
	// 	 	console.log(data);
	//    }
	select(d,id:string) {
		console.log(d);
		
	}
	onCheckboxChange(e: any, id: string) {
		if (e.target.checked) {
			this.selectedItems.push(id);
		} else {
			console.log(id + ' unchecked');
			this.selectedItems = this.selectedItems.filter(m => m != id);
		}
		let arrayData = [];
		for (let i in this.selectedItems) {
			console.log(this.selectedItems[i]);
			arrayData.push(this.servicesData[this.selectedItems[i]]);
		}
		this.checkOutputDta = arrayData;
	}

	removeServices(id) {
		console.log(id);
		this.selectedItems = this.selectedItems.filter(m => m != id);
		let arrayData = [];
		for (let i in this.selectedItems) {
			console.log(this.selectedItems[i]);
			arrayData.push(this.servicesData[this.selectedItems[i]]);
		}
		this.checkOutputDta = arrayData;
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
