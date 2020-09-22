import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/admin/admin.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientcategoriesComponent } from 'src/app/clientcategories/clientcategories.component';
import { PublicholidayComponent } from 'src/app/publicholiday/publicholiday.component';
import { ServicecategoryComponent } from 'src/app/servicecategory/servicecategory.component';
import { TaxrateComponent } from 'src/app/taxrate/taxrate.component';
import { EditservicecategoryComponent } from 'src/app/editservicecategory/editservicecategory.component';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	emplevel_id: any;
	closeResult: string;
	empForm: FormGroup;
	openingForm: FormGroup;
	modalReference: NgbModalRef;
	submitted = false;
	public name: any;
	public merchantid: any;
	public emplevel_name: any;
	public currentEmp: any;
	public clientCats: any;
	public serviceCats: any;
	public taxRate: any;
	public services: any;
	public publicHoliday: any;
	public currentEmployees: any;
	public allEmpData: any;
	public responseData: any;
	public activeTab;
	isSundayDisabled = true;
	isMondayDisabled = true;
	isTuesdayDisabled = true;
	isWedDisabled = true;
	isThurDisabled = true;
	isFridDisabled = true;
	isSatDisabled = true;
	selectedendTime = '18:00:00';
	selectedstartTime = '09:00:00';
	selectedMonendTime = '18:00:00';
	selectedMonstartTime = '09:00:00';
	selectedTueendTime = '18:00:00';
	selectedTuestartTime = '09:00:00';
	selectedWedendTime = '18:00:00';
	selectedWedstartTime = '09:00:00';
	selectedThurendTime = '18:00:00';
	selectedThurstartTime = '09:00:00';
	selectedFriendTime = '18:00:00';
	selectedFristartTime = '09:00:00';
	selectedSatendTime = '18:00:00';
	selectedSatstartTime = '09:00:00';
	public startTimeArray = [
		{ start: '00:00:00', value: 'Midnight' },
		{ start: '00:15:00', value: '12:15 AM' },
		{ start: '00:30:00', value: '12:30 AM' },
		{ start: '00:45:00', value: '12:45 AM' },
		{ start: '01:00:00', value: '1:00 AM' },
		{ start: '01:15:00', value: '1:15 AM' },
		{ start: '01:30:00', value: '1:30 AM' },
		{ start: '01:45:00', value: '1:45 AM' },
		{ start: '02:00:00', value: '2:00 AM' },
		{ start: '02:15:00', value: '2:15 AM' },
		{ start: '02:30:00', value: '2:30 AM' },
		{ start: '02:45:00', value: '2:45 AM' },
		{ start: '03:00:00', value: '3:00 AM' },
		{ start: '03:15:00', value: '3:15 AM' },
		{ start: '03:30:00', value: '3:30 AM' },
		{ start: '03:45:00', value: '3:45 AM' },
		{ start: '04:00:00', value: '4:00 AM' },
		{ start: '04:15:00', value: '4:15 AM' },
		{ start: '04:30:00', value: '4:30 AM' },
		{ start: '04:45:00', value: '4:45 AM' },
		{ start: '05:00:00', value: '5:00 AM' },
		{ start: '05:15:00', value: '5:15 AM' },
		{ start: '05:30:00', value: '5:30 AM' },
		{ start: '05:45:00', value: '5:45 AM' },
		{ start: '06:00:00', value: '6:00 AM' },
		{ start: '06:15:00', value: '6:15 AM' },
		{ start: '06:30:00', value: '6:30 AM' },
		{ start: '06:45:00', value: '6:45 AM' },
		{ start: '07:00:00', value: '7:00 AM' },
		{ start: '07:15:00', value: '7:15 AM' },
		{ start: '07:30:00', value: '7:30 AM' },
		{ start: '07:45:00', value: '7:45 AM' },
		{ start: '08:00:00', value: '8:00 AM' },
		{ start: '08:15:00', value: '8:15 AM' },
		{ start: '08:30:00', value: '8:30 AM' },
		{ start: '08:45:00', value: '8:45 AM' },
		{ start: '09:00:00', value: '9:00 AM' },
		{ start: '09:15:00', value: '9:15 AM' },
		{ start: '09:30:00', value: '9:30 AM' },
		{ start: '09:45:00', value: '9:45 AM' },
		{ start: '10:00:00', value: '10:00 AM' },
		{ start: '10:15:00', value: '10:15 AM' },
		{ start: '10:30:00', value: '10:30 AM' },
		{ start: '10:45:00', value: '10:45 AM' },
		{ start: '11:00:00', value: '11:00 AM' },
		{ start: '11:15:00', value: '11:15 AM' },
		{ start: '11:30:00', value: '11:30 AM' },
		{ start: '11:45:00', value: '11:45 AM' },
		{ start: '12:00:00', value: 'Noon' },
		{ start: '00:15:00', value: '12:15 PM' },
		{ start: '00:30:00', value: '12:30 PM' },
		{ start: '00:45:00', value: '12:45 PM' },
		{ start: '01:00:00', value: '1:00 PM' },
		{ start: '01:15:00', value: '1:15 PM' },
		{ start: '01:30:00', value: '1:30 PM' },
		{ start: '01:45:00', value: '1:45 PM' },
		{ start: '02:00:00', value: '2:00 PM' },
		{ start: '02:15:00', value: '2:15 PM' },
		{ start: '02:30:00', value: '2:30 PM' },
		{ start: '02:45:00', value: '2:45 PM' },
		{ start: '03:00:00', value: '3:00 PM' },
		{ start: '03:15:00', value: '3:15 PM' },
		{ start: '03:30:00', value: '3:30 PM' },
		{ start: '03:45:00', value: '3:45 PM' },
		{ start: '04:00:00', value: '4:00 PM' },
		{ start: '04:15:00', value: '4:15 PM' },
		{ start: '04:30:00', value: '4:30 PM' },
		{ start: '04:45:00', value: '4:45 PM' },
		{ start: '05:00:00', value: '5:00 PM' },
		{ start: '05:15:00', value: '5:15 PM' },
		{ start: '05:30:00', value: '5:30 PM' },
		{ start: '05:45:00', value: '5:45 PM' },
		{ start: '06:00:00', value: '6:00 PM' },
		{ start: '06:15:00', value: '6:15 PM' },
		{ start: '06:30:00', value: '6:30 PM' },
		{ start: '06:45:00', value: '6:45 PM' },
		{ start: '07:00:00', value: '7:00 PM' },
		{ start: '07:15:00', value: '7:15 PM' },
		{ start: '07:30:00', value: '7:30 PM' },
		{ start: '07:45:00', value: '7:45 PM' },
		{ start: '08:00:00', value: '8:00 PM' },
		{ start: '08:15:00', value: '8:15 PM' },
		{ start: '08:30:00', value: '8:30 PM' },
		{ start: '08:45:00', value: '8:45 PM' },
		{ start: '09:00:00', value: '9:00 PM' },
		{ start: '09:15:00', value: '9:15 PM' },
		{ start: '09:30:00', value: '9:30 PM' },
		{ start: '09:45:00', value: '9:45 PM' },
		{ start: '10:00:00', value: '10:00 PM' },
		{ start: '10:15:00', value: '10:15 PM' },
		{ start: '10:30:00', value: '10:30 PM' },
		{ start: '10:45:00', value: '10:45 PM' },
		{ start: '11:00:00', value: '11:00 PM' },
		{ start: '11:15:00', value: '11:15 PM' },
		{ start: '11:30:00', value: '11:30 PM' },
		{ start: '11:45:00', value: '11:45 PM' },
		{ start: '00:00:00', value: 'Midnight' }
	];
	public endTimeArray = [
		{ start: '00:00:00', value: 'Midnight' },
		{ start: '00:15:00', value: '12:15 AM' },
		{ start: '00:30:00', value: '12:30 AM' },
		{ start: '00:45:00', value: '12:45 AM' },
		{ start: '01:00:00', value: '1:00 AM' },
		{ start: '01:15:00', value: '1:15 AM' },
		{ start: '01:30:00', value: '1:30 AM' },
		{ start: '01:45:00', value: '1:45 AM' },
		{ start: '02:00:00', value: '2:00 AM' },
		{ start: '02:15:00', value: '2:15 AM' },
		{ start: '02:30:00', value: '2:30 AM' },
		{ start: '02:45:00', value: '2:45 AM' },
		{ start: '03:00:00', value: '3:00 AM' },
		{ start: '03:15:00', value: '3:15 AM' },
		{ start: '03:30:00', value: '3:30 AM' },
		{ start: '03:45:00', value: '3:45 AM' },
		{ start: '04:00:00', value: '4:00 AM' },
		{ start: '04:15:00', value: '4:15 AM' },
		{ start: '04:30:00', value: '4:30 AM' },
		{ start: '04:45:00', value: '4:45 AM' },
		{ start: '05:00:00', value: '5:00 AM' },
		{ start: '05:15:00', value: '5:15 AM' },
		{ start: '05:30:00', value: '5:30 AM' },
		{ start: '05:45:00', value: '5:45 AM' },
		{ start: '06:00:00', value: '6:00 AM' },
		{ start: '06:15:00', value: '6:15 AM' },
		{ start: '06:30:00', value: '6:30 AM' },
		{ start: '06:45:00', value: '6:45 AM' },
		{ start: '07:00:00', value: '7:00 AM' },
		{ start: '07:15:00', value: '7:15 AM' },
		{ start: '07:30:00', value: '7:30 AM' },
		{ start: '07:45:00', value: '7:45 AM' },
		{ start: '08:00:00', value: '8:00 AM' },
		{ start: '08:15:00', value: '8:15 AM' },
		{ start: '08:30:00', value: '8:30 AM' },
		{ start: '08:45:00', value: '8:45 AM' },
		{ start: '09:00:00', value: '9:00 AM' },
		{ start: '09:15:00', value: '9:15 AM' },
		{ start: '09:30:00', value: '9:30 AM' },
		{ start: '09:45:00', value: '9:45 AM' },
		{ start: '10:00:00', value: '10:00 AM' },
		{ start: '10:15:00', value: '10:15 AM' },
		{ start: '10:30:00', value: '10:30 AM' },
		{ start: '10:45:00', value: '10:45 AM' },
		{ start: '11:00:00', value: '11:00 AM' },
		{ start: '11:15:00', value: '11:15 AM' },
		{ start: '11:30:00', value: '11:30 AM' },
		{ start: '11:45:00', value: '11:45 AM' },
		{ start: '12:00:00', value: 'Noon' },
		{ start: '00:15:00', value: '12:15 PM' },
		{ start: '00:30:00', value: '12:30 PM' },
		{ start: '00:45:00', value: '12:45 PM' },
		{ start: '13:00:00', value: '1:00 PM' },
		{ start: '13:15:00', value: '1:15 PM' },
		{ start: '13:30:00', value: '1:30 PM' },
		{ start: '13:45:00', value: '1:45 PM' },
		{ start: '14:00:00', value: '2:00 PM' },
		{ start: '14:15:00', value: '2:15 PM' },
		{ start: '14:30:00', value: '2:30 PM' },
		{ start: '14:45:00', value: '2:45 PM' },
		{ start: '15:00:00', value: '3:00 PM' },
		{ start: '15:15:00', value: '3:15 PM' },
		{ start: '15:30:00', value: '3:30 PM' },
		{ start: '15:45:00', value: '3:45 PM' },
		{ start: '16:00:00', value: '4:00 PM' },
		{ start: '16:15:00', value: '4:15 PM' },
		{ start: '16:30:00', value: '4:30 PM' },
		{ start: '16:45:00', value: '4:45 PM' },
		{ start: '17:00:00', value: '5:00 PM' },
		{ start: '17:15:00', value: '5:15 PM' },
		{ start: '17:30:00', value: '5:30 PM' },
		{ start: '17:45:00', value: '5:45 PM' },
		{ start: '18:00:00', value: '6:00 PM' },
		{ start: '18:15:00', value: '6:15 PM' },
		{ start: '18:30:00', value: '6:30 PM' },
		{ start: '18:45:00', value: '6:45 PM' },
		{ start: '19:00:00', value: '7:00 PM' },
		{ start: '19:15:00', value: '7:15 PM' },
		{ start: '19:30:00', value: '7:30 PM' },
		{ start: '19:45:00', value: '7:45 PM' },
		{ start: '20:00:00', value: '8:00 PM' },
		{ start: '20:15:00', value: '8:15 PM' },
		{ start: '20:30:00', value: '8:30 PM' },
		{ start: '20:45:00', value: '8:45 PM' },
		{ start: '21:00:00', value: '9:00 PM' },
		{ start: '21:15:00', value: '9:15 PM' },
		{ start: '21:30:00', value: '9:30 PM' },
		{ start: '21:45:00', value: '9:45 PM' },
		{ start: '22:00:00', value: '10:00 PM' },
		{ start: '22:15:00', value: '10:15 PM' },
		{ start: '22:30:00', value: '10:30 PM' },
		{ start: '22:45:00', value: '10:45 PM' },
		{ start: '23:00:00', value: '11:00 PM' },
		{ start: '23:15:00', value: '11:15 PM' },
		{ start: '23:30:00', value: '11:30 PM' },
		{ start: '23:45:00', value: '11:45 PM' },
		{ start: '00:00:00', value: 'Midnight' }
	];
	constructor(
		private SpinnerService: NgxSpinnerService,
		private modalService: NgbModal,
		public router: Router,
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		private _route: ActivatedRoute,
		public adminService: AdminService
	) {
		this.empForm = this.formBuilder.group({
			id: new FormControl('', Validators.required),
			name: new FormControl('', Validators.required),
			birthday: new FormControl('', Validators.required)
		});
		this.openingForm = this.formBuilder.group({
			mom_start_time: [''],
			mom_end_time: [''],
			tue_start_time: [''],
			tue_end_time: [''],
			wed_start_time: [''],
			wed_end_time: [''],
			thur_start_time: [''],
			thur_end_time: [''],
			fri_start_time: [''],
			fri_end_time: [''],
			sat_start_time: [''],
			sat_end_time: [''],
			sun_start_time: [''],
			sun_end_time: [''],
			sunday_disable_option:[''],
			monday_disable_option:[''],
			tuesday_disable_option:[''],
			wednesday_disable_option:[''],
			thrusday_disable_option:[''],
			friday_disable_option:[''],
			saturday_disable_option:['']
		});
	}

	get f() {
		return this.empForm.controls;
	}
	@ViewChild('tabset') tabset: TabsetComponent;
	onReset() {
		this.submitted = false;
		this.empForm.reset();
	}
	ngOnInit(): void {
		this.openingForm.get('mom_start_time').disable();
		this.openingForm.get('mom_end_time').disable();
		this.openingForm.get('sun_end_time').disable();
		this.openingForm.get('sun_start_time').disable();
		this.openingForm.get('sat_end_time').disable();
		this.openingForm.get('sat_start_time').disable();
		this.openingForm.get('fri_end_time').disable();
		this.openingForm.get('fri_start_time').disable();
		this.openingForm.get('thur_start_time').disable();
		this.openingForm.get('thur_end_time').disable();
		this.openingForm.get('wed_end_time').disable();
		this.openingForm.get('wed_start_time').disable();
		this.openingForm.get('tue_start_time').disable();
		this.openingForm.get('tue_end_time').disable();
		let tab_id = this.jwtService.getTokenByParams('tabId');
		//console.log(tab_id);
		if (tab_id) {
			this.activeTab = tab_id;
			this.jwtService.destroyTokenTab('tabId');
		} else {
			this.activeTab = 'services-tab';
		}
		this.getServiceCatByMerchantId();
		this.getEmployees();
		this.getEmplevel();
		this.getClientCategories();
		this.getHoliday();
		this.getServiceByMerchantId();
		this.getTaxRates();
	}
	OnChangeofOptions() {
		console.log('changing');
	}
	onSubmit() {
		this.submitted = true;
		let response_data = this.empForm.value;
		let data = {
			name: response_data.name || ''
		};
		console.log(data);
		this.adminService.createEmpLevel(data).subscribe(apiResponse => {
			console.log(apiResponse);
			if (apiResponse.code === 200) {
				this.toastr.successToastr('Employee Level Added Successfully');
				this.modalService.dismissAll('Cross click');
				this.ngOnInit();
				this.submitted = false;
				this.empForm.reset();
			} else {
				this.toastr.errorToastr(apiResponse.message);
			}
		});
	}
	public getEmplevel(): any {
		this.SpinnerService.show();
		this.adminService.getEmplevelByMechantId({}).subscribe(
			data => {
				console.log(data);
				this.jwtService.getToken('session_token');
				let employee_data = data['data'];
				this.currentEmp = employee_data;
				let emp_array = {};
				employee_data.forEach(item => {
					if (!emp_array.hasOwnProperty(item.id)) {
						emp_array[item.id] = [];
					}
					emp_array[item.id] = item;
				});
				this.allEmpData = emp_array;
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
		this.SpinnerService.show();
		this.adminService.getEmpDetailByMerchantId({}).subscribe(
			data => {
				console.log(data);
				this.currentEmployees = data['data'];
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
	public getClientCategories(): any {
		this.SpinnerService.show();
		this.adminService.getClientCatDetailsByMerchantId({}).subscribe(
			data => {
				console.log(data);
				this.clientCats = data['data'];
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
	public getHoliday(): any {
		this.SpinnerService.show();
		this.adminService.getHolidayDate({}).subscribe(
			data => {
				console.log(data);
				this.publicHoliday = data['data'];
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
	public getServiceCatByMerchantId(): any {}
	public getServiceByMerchantId(): any {
		this.SpinnerService.show();
		this.adminService.getServiceByMerchantId().subscribe(
			data => {
				console.log(data);
				this.services = data['data'];
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
	public getTaxRates(): any {
		this.SpinnerService.show();
		this.adminService.getTaxRates({}).subscribe(
			data => {
				console.log(data);
				this.taxRate = data['data'];
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
	open(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			result => {
				this.closeResult = `Closed with: ${result}`;
			},
			reason => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			}
		);
	}
	openmyModal() {
		const modalRef = this.modalService.open(ClientcategoriesComponent, {
			windowClass: 'myCustomModalClass'
		});
		modalRef.result.then(
			result => {
				this.getClientCategories();
			},
			reason => {}
		);
	}
	// onNoClick(): void {
	// 	this.getEmployees();
	// }
	// onServicecatClick(): void {
	// 	this.adminService.getServiceCatByMerchantId({}).subscribe(
	// 		data => {
	// 			console.log(data);
	// 			this.serviceCats = data['data'];
	// 		},
	// 		error => {
	// 			console.log('some error occured');
	// 			this.toastr.errorToastr('some error occured');
	// 		}
	// 	);
	// }
	openservicecatModal(id) {
		console.log(id);
		const modalRef = this.modalService.open(EditservicecategoryComponent, {
			windowClass: 'myCustomModalClass'
		});
		let data = {
			id: id
		};
		console.log(data);
		modalRef.componentInstance.fromParent = data;
		modalRef.result.then(
			result => {
				this.getServiceCatByMerchantId();
			},
			reason => {}
		);
	}
	openholidayModal() {
		const modalRef = this.modalService.open(PublicholidayComponent, {
			windowClass: 'myCustomModalClass'
		});
		modalRef.result.then(
			result => {
				this.getHoliday();
				console.log(result);
			},
			reason => {}
		);
	}
	openserviceModal() {
		const modalRef = this.modalService.open(ServicecategoryComponent, { windowClass: 'myCustomModalClass' });
		modalRef.result.then(
			result => {
				this.getServiceCatByMerchantId();
				console.log(result);
			},
			reason => {}
		);
	}
	opentaxModal() {
		const modalRef = this.modalService.open(TaxrateComponent, { windowClass: 'myCustomModalClass' });
		modalRef.result.then(
			result => {
				this.getTaxRates();
				console.log(result);
			},
			reason => {}
		);
	}
	openclientcatupdateModal() {
		this.modalService.open(ClientcategoriesComponent, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			result => {
				this.closeResult = `Closed with: ${result}`;
			},
			reason => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			}
		);
	}
	opentaxmodal(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			result => {
				this.closeResult = `Closed with: ${result}`;
				this.ngOnInit();
			},
			reason => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			}
		);
	}
	openservicemodal(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			result => {
				this.closeResult = `Closed with: ${result}`;
				this.ngOnInit();
			},
			reason => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			}
		);
	}
	openupdatemodal(content, id) {
		let details = this.allEmpData[id];
		content.emp_details = this.allEmpData[id];
		this.emplevel_name = details.name;
		this.emplevel_id = details.id;
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			result => {
				this.closeResult = `Closed with: ${result}`;
			},
			reason => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			}
		);
	}
	public updateEmpLevel(): any {
		let data = {
			empLevel_id: this.emplevel_id,
			name: this.emplevel_name
		};
		this.adminService.editEmpLevel(data).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Employee Level Updated Successfully');
				this.modalService.dismissAll('Cross click');
				this.ngOnInit();
				this.empForm.reset();
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('Some error occured', 'Oops!');
			}
		);
	}
	public deleteEmpLevel(empLevel_id): any {
		this.adminService
			.deleteEmpLevel({
				empLevel_id: empLevel_id
			})
			.subscribe(
				data => {
					console.log(data);
					this.toastr.successToastr(' Employee Level Deleted Successfully');
					this.modalService.dismissAll('Cross click');
					this.ngOnInit();
				},
				error => {
					console.log('some error occured');
					this.toastr.errorToastr('Some error occured', 'Oops!');
				}
			);
	}
	public deleteEmployee(employee_id): any {
		this.adminService.deleteEmployee({ employee_id: employee_id }).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Employee Deleted Successfully');
				this.ngOnInit();
				this.getEmployees();
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('Some error occured', 'Oops!');
			}
		);
	}
	public deleteServiceCat(id): any {
		this.adminService.deleteServiceCat(id).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Service Category Deleted Successfully');
				this.ngOnInit();
				this.getServiceCatByMerchantId();
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('Some error occured', 'Oops!');
			}
		);
	}
	public deleteService(id): any {
		this.adminService.deleteService(id).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Service Deleted Successfully');
				this.ngOnInit();
				this.getServiceByMerchantId();
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('Some error occured', 'Oops!');
			}
		);
	}

	onChangeDate(event: any, disable_type_from, disable_type_to) {
		if (event.target.checked) {
			this.openingForm.get(disable_type_from).enable();
			this.openingForm.get(disable_type_to).enable();
			/*this[disable_type] = false;
			console.log('false');*/
		} else {
			this.openingForm.get(disable_type_from).disable();
			this.openingForm.get(disable_type_to).disable();
		}
	}

	addOpening() {
		this.submitted = true;
		if (!this.openingForm.invalid) {
			let openingHours_data = this.openingForm.value;
			console.log(openingHours_data);
			let data = {
				mom_start_time: (openingHours_data.monday_disable_option==1) ? openingHours_data.mom_start_time : '',
				mom_end_time: (openingHours_data.monday_disable_option==1) ? openingHours_data.mom_end_time : '',
				tue_start_time: (openingHours_data.tuesday_disable_option==1) ? openingHours_data.tue_start_time : '',
				tue_end_time: (openingHours_data.tuesday_disable_option==1) ? openingHours_data.tue_end_time : '', 
				wed_start_time: (openingHours_data.wednesday_disable_option==1) ? openingHours_data.wed_start_time : '',
				wed_end_time: (openingHours_data.wednesday_disable_option==1) ? openingHours_data.wed_end_time : '',
				thur_start_time: (openingHours_data.thrusday_disable_option==1) ? openingHours_data.thur_start_time : '',
				thur_end_time: (openingHours_data.thrusday_disable_option==1) ? openingHours_data.thur_end_time : '',
				fri_start_time: (openingHours_data.friday_disable_option==1) ? openingHours_data.fri_start_time : '',
				fri_end_time: (openingHours_data.friday_disable_option==1) ? openingHours_data.fri_end_time : '',
				sat_start_time: (openingHours_data.saturday_disable_option==1) ? openingHours_data.sat_start_time : '',
				sat_end_time: (openingHours_data.saturday_disable_option==1) ?openingHours_data.sat_end_time : '',
				sun_start_time: (openingHours_data.sunday_disable_option==1) ? openingHours_data.sun_start_time : '',
				sun_end_time: (openingHours_data.sunday_disable_option==1) ? openingHours_data.sun_end_time : ''
			};
			console.log(data); 
			this.adminService.addOpeningDay(data).subscribe(apiResponse => {
				if (apiResponse.code === 200) {
					this.toastr.successToastr('Openinghours Added Successfully');
					this.router.navigate(['/admin']);
				} else {
					console.log('Hello');
					this.toastr.errorToastr(apiResponse.message);
				}
			});
		}
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
}
