import { TimeslotsComponent } from './../timeslots/timeslots.component';
import { parseIntAutoRadix } from '@angular/common/src/i18n/format_number';
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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-addappointments',
	templateUrl: './addappointments.component.html',
	styleUrls: ['./addappointments.component.css']
})
export class AddappointmentsComponent implements OnInit {
	price: number;
	totalTime: number;
	//selectedItems: {};
	//checkedList: [];
	servicesData: any;
	selectedItems: any;
	checked = true;
	model;
	addappointmentForm: FormGroup;
	closeResult: string;
	@Input() fromParent;
	submitted = false;
	public serviceCats: any;
	public services: any;
	selectedValue = '09';
	clients: any;
	public currentEmployees: any;
	checkOutputDta: any[];
	events: string[] = [];
	constructor(
		private SpinnerService: NgxSpinnerService,
		public router: Router,
		private modalService: NgbModal,
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
				let responseArray = [];
				data['data'].forEach(item => {
					responseData[item.id] = item;
					Object.assign(item, { checked: false });
					responseArray.push(item);
				});
				this.servicesData = responseData;
				//this.services = data['data'];
				console.log(responseArray);
				this.services = responseArray;
			},
			error => {
				console.log('some error occurred');
				this.toastr.errorToastr('some error occurred');
			}
		);

		console.log(e.target.value);
	}

	changeServiceClient(e) {
		let id = e.target.value;
		this.addnewclientService.getClientDetailsByMerchantID(id).subscribe(
			data => {
				console.log(data);
				let dataResponse = {};
				data['data'].forEach((item, key) => {
					if (!dataResponse.hasOwnProperty(item.id)) {
						dataResponse[item.id] = [];
					}
					let object = { f_name: '' };
					object.f_name = item.f_name;
					dataResponse[item.id] = object;
				});
				this.clients = dataResponse[id];
				console.log(this.clients);
			},
			error => {
				console.log('some error occurred');
				this.toastr.errorToastr('some error occurred');
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
	select(d, id: string) {
		console.log(d);
	}
	onCheckboxChange(e: any, id: string) {
		if (e.target.checked == true) {
			this.selectedItems.push(id);
		} else {
			console.log(id + ' unchecked');
			this.selectedItems = this.selectedItems.filter(m => m != id);
		}
		let arrayData = [];
		let totalTime = 0;
		let price = 0;
		console.log(this.selectedItems);
		for (let i in this.selectedItems) {
			let items = this.selectedItems[i];
			let splitsData = this.servicesData[items].duration.split(':');
			price += parseInt(this.servicesData[items].price);
			totalTime += parseInt(splitsData[0]) * 60 + parseInt(splitsData[1]);
			arrayData.push(this.servicesData[items]);
		}
		this.checkOutputDta = arrayData;
		this.totalTime = totalTime;
		this.price = price;
	}

	removeServices(id, index) {
		let service_id = id;
		let objectsData = [];
		this.checkOutputDta = [];
		this.selectedItems = [];
		let totalTime = 0;
		let price = 0;
		for (let k in this.services) {
			let item = this.services[k];
			if (service_id == item.id) {
				item.checked = false;
			} else {
				if (item.checked == true) {
					let splitsData = item.duration.split(':');
					price += parseInt(item.price);
					totalTime += parseInt(splitsData[0]) * 60 + parseInt(splitsData[1]);
					this.selectedItems.push(item);
					this.checkOutputDta.push(item);
				}
			}
			objectsData.push(item);
		}
		this.totalTime = totalTime;
		this.services = objectsData;
		console.log(this.services);
		this.price = price;
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
				console.log(this.clients);
				setTimeout(() => {
					this.SpinnerService.hide();
				}, 2000);
			},
			error => {
				console.log('some error occurred');
				this.toastr.errorToastr('some error occurred');
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

	openTimeslotsModel() {
		const modalRef = this.modalService.open(TimeslotsComponent, {size: 'lg', windowClass: 'myCustomModalClass' });
		modalRef.result.then(
			result => {
			},
			reason => {}
		);
	}
}

