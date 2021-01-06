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
	public show: boolean = false;
	addappointmentForm: FormGroup;
	closeResult: string;
	@Input() fromParent;
	submitted = false;
	public serviceCats: any;
	public services: any;
	selectedValue = '09';
	clients: any;
	public currentEmployees: any;
	public allTime:any;
	checkOutputDta: any[];
	events: string[] = [];
	clientDetails = { f_name: '', email: '', mobile: '', address: '' };
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
		this.getClientDetailsByMerchantID();
		this.getServiceCatByMerchantId();
		this.getEmployees();
	}

	changeServiceCat(e) {
		let id = e.target.value;
		this.selectedItems = [];
		this.checkOutputDta = [];
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
		
		this.show = true;
		let id = e.target.value;
		console.log(id);
		this.addnewclientService.getClientDetailsByMerchantID().subscribe(
			data => {
				let details = data.data;
				let response = {};
				details.forEach((item, key) => {
					if (!response.hasOwnProperty(item.id)) {
						response[item.id] = [];
					}
					response[item.id].push(item);
				});
				details = response[id][0];
				this.clientDetails['f_name'] = details.f_name;
				this.clientDetails['email'] = details.email;
				this.clientDetails['address'] = details.address;
				this.clientDetails['mobile'] = details.mobile;
			},
			error => {
				console.log('some error occurred');
				this.toastr.errorToastr('some error occurred');
			}
		);
	}

	// 	onCheckboxChange(option, event) {
	// 		console.log(option);
	// 		let data = [];
	// 		if(event.target.checked) {
	// 			data.push(option.id);
	// 		}
	// 	 	console.log(data);
	//    }

	addService(id) {
		console.log(this.checkOutputDta);
		this.selectedItems.push(id);
		console.log(this.selectedItems);
		// let arrayData = [];
		let totalTime = 0;
		let price = 0;
		for (let i in this.selectedItems) {
			let items = this.selectedItems[i];
			let splitsData = this.servicesData[items].duration.split(':');
			price += parseInt(this.servicesData[items].price);
			totalTime += parseInt(splitsData[0]) * 60 + parseInt(splitsData[1]);
			// arrayData.push(this.servicesData[items]);
		}
		// this.checkOutputDta = arrayData;
		this.totalTime = totalTime;
		this.price = price;
		console.log(this.price);
		console.log(this.servicesData);
	}

	// onCheckboxChange(e: any, id: string) {
	// 	if (e.target.checked == true) {
	// 		this.selectedItems.push(id);
	// 	} else {
	// 		console.log(id + ' unchecked');
	// 		this.selectedItems = this.selectedItems.filter(m => m != id);
	// 	}
	// 	let arrayData = [];
	// 	let totalTime = 0;
	// 	let price = 0;
	// 	for (let i in this.selectedItems) {
	// 		let items = this.selectedItems[i];
	// 		let splitsData = this.servicesData[items].duration.split(':');
	// 		price += parseInt(this.servicesData[items].price);
	// 		totalTime += parseInt(splitsData[0]) * 60 + parseInt(splitsData[1]);
	// 		arrayData.push(this.servicesData[items]);
	// 	}
	// 	this.checkOutputDta = arrayData;
	// 	this.totalTime = totalTime;
	// 	this.price = price;
	// }

	removeServices(id, index) {
		let totalTime = 0;
		let price = 0;
		let ouputData = this.checkOutputDta;
		delete ouputData[index];
		for (var i = 0; i < ouputData.length; i++) {
			if (i === index) {
				ouputData.splice(i, 1);
				this.selectedItems.splice(i, 1);
			}
		}
		console.log(ouputData);

		for (let k in ouputData) {
			let item = ouputData[k];
			let splitsData = item.duration.split(':');
			price += parseInt(item.price);
			totalTime += parseInt(splitsData[0]) * 60 + parseInt(splitsData[1]);
		}
		this.checkOutputDta = ouputData;
		this.totalTime = totalTime;
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
		this.addnewclientService.getClientDetailsByMerchantID().subscribe(
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
				console.log('some error occurred');
				this.toastr.errorToastr('some error occurred');
			}
		);
	}

	openTimeslotsModel() {
		const modalRef = this.modalService.open(TimeslotsComponent, { size: 'lg', windowClass: 'myCustomModalClass' });
		modalRef.result.then(result => {}, reason => {});
	}

	modelChangeDate(e) {
		let id = e.target.value;
		console.log(id);
	}

	// changeStaff(e) {
	// 	let id = e.target.value;
	// 	console.log(id);
	// }

	//  changeTime(e){
	//  let time = e.target.value;
	//  console.log(time);
	// 	};

	// onChange(e) {
	// 	let change_date = this.addappointmentForm.value;
	// 	let start_date = change_date.start_date
	// 		? change_date.start_date.year + '-' + change_date.start_date.month + '-' + change_date.start_date.day
	// 		: '';
	// 	console.log(change_date);
	// 	console.log(start_date);
	// 	let employee_id = change_date.employee_id;
	// 	console.log(employee_id);
	// 	this.addappointmentsservice.getTimeSlotForAppointByEmpId(employee_id, start_date).subscribe(
	// 		data => {
	// 			console.log(data);
	// 			//this.currentEmployees = data['data'];
	// 		},
	// 		error => {
	// 			console.log('some error occurred');
	// 			this.toastr.successToastr('Please Select Any Employee First');
	// 		}
	// 	);
	// }

	// public getTimeSlotForAppointByEmpId(employee_id, start_date): any {
	// 	this.addappointmentsservice.getTimeSlotForAppointByEmpId(employee_id, start_date).subscribe(data => {
	// 			console.log(data);
	// 			this.allTime = data['data'];
	// 		}, error => {
	// 			console.log('some error occurred');
	// 			this.toastr.errorToastr('some error occurred');
	// 		});
	// }
	onCancel() {
		this.router.navigate(['/appointments']);
	}
}
