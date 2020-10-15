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
import { ResourcesComponent } from 'src/app/resources/resources.component';
import { EditresourcesComponent } from 'src/app/editresources/editresources.component';
import { ServicelevelComponent } from 'src/app/servicelevel/servicelevel.component';
import { ServicelevelService } from 'src/app/servicelevel/servicelevel.service';
import { Input } from '@angular/core';
import { EditservicelevelComponent } from 'src/app/editservicelevel/editservicelevel.component';
import { ServiceresourceComponent } from 'src/app/serviceresource/serviceresource.component';
import { ServiceresourceService } from 'src/app/serviceresource/serviceresource.service';
import { EditserviceresourcesComponent } from 'src/app/editserviceresources/editserviceresources.component';
import { ServiceitemComponent } from 'src/app/serviceitem/serviceitem.component';
import { ServiceitemService } from 'src/app/serviceitem/serviceitem.service';
import { EditserviceitemComponent } from 'src/app/editserviceitem/editserviceitem.component';
import { EditclientcategoriesComponent } from 'src/app/editclientcategories/editclientcategories.component';
import { ClientcategoriesService } from 'src/app/clientcategories/clientcategories.service';
import { EdittaxrateComponent } from 'src/app/edittaxrate/edittaxrate.component';
import { TaxrateService } from 'src/app/taxrate/taxrate.service';
import { EditpublicholidayComponent } from 'src/app/editpublicholiday/editpublicholiday.component';
import { PublicholidayService } from 'src/app/publicholiday/publicholiday.service';
import { ProductbrandComponent } from 'src/app/productbrand/productbrand.component';
import { ProductbrandService } from 'src/app/productbrand/productbrand.service';
import { EditproductbrandComponent } from 'src/app/editproductbrand/editproductbrand.component';
import { SupplierComponent } from 'src/app/supplier/supplier.component';
import { SupplierService } from 'src/app/supplier/supplier.service';
import { EditsupplierComponent } from 'src/app/editsupplier/editsupplier.component';
import { EmployeehoursComponent } from 'src/app/employeehours/employeehours.component';
import { ProductService } from 'src/app/product/product.service';
import { EmployeehoursService } from 'src/app/employeehours/employeehours.service';
import { AddnewclientService } from 'src/app/addnewclient/addnewclient.service';
@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	roster_id: any;
	serviceLevelData: { price: ''; duration: '' };
	@Input() public user_level_id;
	service_level_id: any;
	id: any;
	levelid: any;
	resourceid: any;
	productBrands: any;
	emplevel_id: any;
	opening_hours_id: any;
	closeResult: string;
	empForm: FormGroup;
	openingForm: FormGroup;
	modalReference: NgbModalRef;
	submitted = false;
	public name: any;
	public show: boolean = false;
	public resourceshow: boolean = false;
	public itemsshow: boolean = false;
	public serviceshow: boolean = true;
	public merchantid: any;
	public emplevel_name: any;
	public serviceitems: any;
	public currentEmp: any;
	public clients: any;
	public resources: any;
	public servicelevels: any;
	public clientCats: any;
	public serviceCats: any;
	public serviceresources: any;
	public taxRate: any;
	public services: any;
	public publicHoliday: any;
	public currentEmployees: any;
	public allEmpData: any;
	public responseData: any;
	public suppliers: any;
	public activeTab;
	public empRosters: any;
	public products: any;
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
		public adminService: AdminService,
		private route: ActivatedRoute,
		public servicelevelService: ServicelevelService,
		public clientcategoriesService: ClientcategoriesService,
		public serviceresourceService: ServiceresourceService,
		public serviceitemService: ServiceitemService,
		public taxrateService: TaxrateService,
		public publicholidayService: PublicholidayService,
		public productbrandService: ProductbrandService,
		public supplierService: SupplierService,
		public productService: ProductService,
		private employeehoursservice: EmployeehoursService,
		public addnewclientService: AddnewclientService
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
			sunday_disable_option: [''],
			monday_disable_option: [''],
			tuesday_disable_option: [''],
			wednesday_disable_option: [''],
			thrusday_disable_option: [''],
			friday_disable_option: [''],
			saturday_disable_option: [''],
			opening_hours_id: ['']
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
		this.getClientDetailsByMerchantID();
		this.getEmpRosterHoursByMechantId();
		this.getProducts();
		this.getSupplier();
		this.getProductbrand();
		this.getOpeningDay();
		this.getResource();
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
	public getServiceByMerchantId(): any {
		this.adminService.getServiceByMerchantId().subscribe(
			data => {
				console.log(data);
				this.services = data['data'];
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
	public getResource(): any {
		this.SpinnerService.show();
		this.adminService.getResource().subscribe(
			data => {
				console.log(data);
				this.resources = data['data'];
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
	public getProductbrand(): any {
		this.SpinnerService.show();
		this.productbrandService.getProductBrandByMerchantId().subscribe(
			data => {
				console.log(data);
				this.productBrands = data['data'];
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
	public getSupplier(): any {
		this.SpinnerService.show();
		this.supplierService.getSupplierDetailByMerchantId().subscribe(
			data => {
				console.log(data);
				this.suppliers = data['data'];
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
	public getProducts(): any {
		this.SpinnerService.show();
		this.productService.getProductByMerchantId().subscribe(
			data => {
				console.log(data);
				this.products = data['data'];
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
	public getServiceEmpLevelByServiceId(id): any {
		this.servicelevelService.getServiceEmpLevelByServiceId(id).subscribe(
			data => {
				console.log(data);
				this.servicelevels = data['data'];
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}

	public getServiceResourceByServiceId(id): any {
		this.serviceresourceService.getServiceResourceByServiceId(id).subscribe(
			data => {
				console.log(data);
				this.serviceresources = data['data'];
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}

	public getServiceItemByServiceId(id): any {
		this.serviceitemService.getServiceItemByServiceId(id).subscribe(
			data => {
				console.log(data);
				this.serviceitems = data['data'];
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}

	public getOpeningDay(): any {
		this.SpinnerService.show();
		this.adminService.getOpeningDay().subscribe(
			data => {
				console.log(data);
				let openingdata = data['data'][0];
				if (openingdata.sun_start_time) {
					this.openingForm.get('sun_start_time').enable();
					this.openingForm.get('sun_end_time').enable();
				}
				if (openingdata.mom_start_time) {
					this.openingForm.get('mom_start_time').enable();
					this.openingForm.get('mom_end_time').enable();
				}
				if (openingdata.tue_start_time) {
					this.openingForm.get('tue_start_time').enable();
					this.openingForm.get('tue_end_time').enable();
				}
				if (openingdata.wed_start_time) {
					this.openingForm.get('wed_start_time').enable();
					this.openingForm.get('wed_end_time').enable();
				}
				if (openingdata.thur_start_time) {
					this.openingForm.get('thur_start_time').enable();
					this.openingForm.get('thur_end_time').enable();
				}
				if (openingdata.fri_start_time) {
					this.openingForm.get('fri_start_time').enable();
					this.openingForm.get('fri_end_time').enable();
				}
				if (openingdata.sat_start_time) {
					this.openingForm.get('sat_start_time').enable();
					this.openingForm.get('sat_end_time').enable();
				}
				this.openingForm = this.formBuilder.group({
					sun_start_time: [openingdata.sun_start_time],
					sun_end_time: openingdata.sun_end_time,
					mom_start_time: openingdata.mom_start_time,
					mom_end_time: openingdata.mom_end_time,
					tue_start_time: openingdata.tue_start_time,
					tue_end_time: openingdata.tue_end_time,
					wed_start_time: openingdata.wed_start_time,
					wed_end_time: openingdata.wed_end_time,
					thur_start_time: openingdata.thur_start_time,
					thur_end_time: openingdata.thur_end_time,
					fri_start_time: openingdata.fri_start_time,
					fri_end_time: openingdata.fri_end_time,
					sat_start_time: openingdata.sat_start_time,
					sat_end_time: openingdata.sat_end_time,
					sunday_disable_option: [openingdata.sun_start_time ? 1 : 0],
					monday_disable_option: [openingdata.mom_start_time ? 1 : 0],
					tuesday_disable_option: [openingdata.tue_start_time ? 1 : 0],
					wednesday_disable_option: [openingdata.wed_start_time ? 1 : 0],
					thrusday_disable_option: [openingdata.thur_start_time ? 1 : 0],
					friday_disable_option: [openingdata.fri_start_time ? 1 : 0],
					saturday_disable_option: [openingdata.fri_end_time ? 1 : 0],
					opening_hours_id: [openingdata.id]
				});
				console.log(openingdata);
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
	public getEmpRosterHoursByMechantId(): any {
		this.employeehoursservice.getEmpRosterHoursByMechantId().subscribe(
			data => {
				console.log(data);
				this.empRosters = data['data'];
				console.log(this.empRosters);
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
	goToBackService() {
		this.jwtService.setToken('tabId', 'services-tab');
		this.router.navigate(['/admin']);
	}
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
				console.log(result);
			},
			reason => {}
		);
	}
	openbrandModal() {
		const modalRef = this.modalService.open(ProductbrandComponent, {
			windowClass: 'myCustomModalClass'
		});
		modalRef.result.then(
			result => {
				this.getProductbrand();
				console.log(result);
			},
			reason => {}
		);
	}

	opensuppliersModal() {
		const modalRef = this.modalService.open(SupplierComponent, {
			windowClass: 'myCustomModalClass'
		});
		modalRef.result.then(
			result => {
				this.getSupplier();
				console.log(result);
			},
			reason => {}
		);
	}
	employeehoursModel(id) {
		this.employeehoursservice.getEmpRosterHoursByEmpId(id).subscribe(
			data => {
				console.log(data);
				let emproasterdata = data['data'];
				this.roster_id = emproasterdata.id;
				if (emproasterdata.sun_start_time) {
					this.openingForm.get('sun_start_time').enable();
					this.openingForm.get('sun_end_time').enable();
				}
				if (emproasterdata.mom_start_time) {
					this.openingForm.get('mom_start_time').enable();
					this.openingForm.get('mom_end_time').enable();
				}
				if (emproasterdata.tue_start_time) {
					this.openingForm.get('tue_start_time').enable();
					this.openingForm.get('tue_end_time').enable();
				}
				if (emproasterdata.wed_start_time) {
					this.openingForm.get('wed_start_time').enable();
					this.openingForm.get('wed_end_time').enable();
				}
				if (emproasterdata.thur_start_time) {
					this.openingForm.get('thur_start_time').enable();
					this.openingForm.get('thur_end_time').enable();
				}
				if (emproasterdata.fri_start_time) {
					this.openingForm.get('fri_start_time').enable();
					this.openingForm.get('fri_end_time').enable();
				}
				if (emproasterdata.sat_start_time) {
					this.openingForm.get('sat_start_time').enable();
					this.openingForm.get('sat_end_time').enable();
				}
				if (emproasterdata.emp_id) {
					this.opening_hours_id = emproasterdata.id;
				}
				this.openingForm = this.formBuilder.group({
					sun_start_time: [emproasterdata.sun_start_time],
					sun_end_time: emproasterdata.sun_end_time,
					mom_start_time: emproasterdata.mom_start_time,
					mom_end_time: emproasterdata.mom_end_time,
					tue_start_time: emproasterdata.tue_start_time,
					tue_end_time: emproasterdata.tue_end_time,
					wed_start_time: emproasterdata.wed_start_time,
					wed_end_time: emproasterdata.wed_end_time,
					thur_start_time: emproasterdata.thur_start_time,
					thur_end_time: emproasterdata.thur_end_time,
					fri_start_time: emproasterdata.fri_start_time,
					fri_end_time: emproasterdata.fri_end_time,
					sat_start_time: emproasterdata.sat_start_time,
					sat_end_time: emproasterdata.sat_end_time,
					sunday_disable_option: [emproasterdata.sun_start_time ? 1 : 0],
					monday_disable_option: [emproasterdata.mom_start_time ? 1 : 0],
					tuesday_disable_option: [emproasterdata.tue_start_time ? 1 : 0],
					wednesday_disable_option: [emproasterdata.wed_start_time ? 1 : 0],
					thrusday_disable_option: [emproasterdata.thur_start_time ? 1 : 0],
					friday_disable_option: [emproasterdata.fri_start_time ? 1 : 0],
					saturday_disable_option: [emproasterdata.fri_end_time ? 1 : 0],
					empRosterhours_id: [emproasterdata.id]
				});
				console.log(emproasterdata);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
		const modalRef = this.modalService.open(EmployeehoursComponent, {
			windowClass: 'myCustomModalClass',
			size: 'lg'
		});
		modalRef.componentInstance.emproster_id = id;
		modalRef.componentInstance.roster_id = this.roster_id;
		console.log(id);
		modalRef.result.then(
			result => {
				this.getEmpRosterHoursByMechantId();
				console.log(result);
			},
			reason => {}
		);
	}
	openEditholidayModel(id) {
		const modalRef = this.modalService.open(EditpublicholidayComponent, { windowClass: 'myCustomModalClass' });
		modalRef.componentInstance.holidayid = id;
		console.log(id);
		modalRef.result.then(
			result => {
				this.getHoliday();
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
	openresourcesModal() {
		const modalRef = this.modalService.open(ResourcesComponent, {
			windowClass: 'myCustomModalClass'
		});
		modalRef.result.then(
			result => {
				this.getResource();
				console.log(result);
			},
			reason => {}
		);
	}
	openeditresourcesModal(id) {
		const modalRef = this.modalService.open(EditresourcesComponent, {
			windowClass: 'myCustomModalClass'
		});
		modalRef.componentInstance.resourceid = id;
		console.log(id);
		modalRef.result.then(
			result => {
				this.getResource();
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
	openedittaxModal(id) {
		const modalRef = this.modalService.open(EdittaxrateComponent, { windowClass: 'myCustomModalClass' });
		modalRef.componentInstance.taxid = id;
		console.log(id);
		modalRef.result.then(
			result => {
				this.getTaxRates();
			},
			reason => {}
		);
	}
	openclientcatupdateModal(id) {
		const modalRef = this.modalService.open(EditclientcategoriesComponent, { windowClass: 'myCustomModalClass' });
		modalRef.componentInstance.clientcatid = id;
		console.log(id);
		modalRef.result.then(
			result => {
				this.getClientCategories();
			},
			reason => {}
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
	openServicelevelModal(id) {
		const modalRef = this.modalService.open(ServicelevelComponent, { windowClass: 'myCustomModalClass' });
		modalRef.componentInstance.user_level_id = id;
		modalRef.result.then(
			result => {
				this.getServiceEmpLevelByServiceId(id);
			},
			reason => {}
		);
	}

	openServiceResourcesModal(id) {
		const modalRef = this.modalService.open(ServiceresourceComponent, { windowClass: 'myCustomModalClass' });
		modalRef.componentInstance.user_level_id = id;
		modalRef.result.then(
			result => {
				this.getServiceResourceByServiceId(id);
			},
			reason => {}
		);
	}
	openServiceItemsModal(id) {
		const modalRef = this.modalService.open(ServiceitemComponent, { windowClass: 'myCustomModalClass' });
		modalRef.componentInstance.user_level_id = id;
		console.log(id);
		modalRef.result.then(
			result => {
				this.getServiceItemByServiceId(id);
			},
			reason => {}
		);
	}

	openEditservicelevelModal(id, service_id) {
		const modalRef = this.modalService.open(EditservicelevelComponent, { windowClass: 'myCustomModalClass' });
		modalRef.componentInstance.servicelevelId = id;
		modalRef.componentInstance.user_level_id = service_id;
		console.log(id);
		modalRef.result.then(
			result => {
				this.getServiceEmpLevelByServiceId(service_id);
			},
			reason => {}
		);
	}

	openEditserviceresourcesModal(id, service_id) {
		const modalRef = this.modalService.open(EditserviceresourcesComponent, { windowClass: 'myCustomModalClass' });
		modalRef.componentInstance.servicelevelId = id;
		modalRef.componentInstance.user_level_id = service_id;
		console.log(service_id);
		modalRef.result.then(
			result => {
				this.getServiceResourceByServiceId(service_id);
			},
			reason => {}
		);
	}

	openEditserviceitemModal(id, service_id) {
		const modalRef = this.modalService.open(EditserviceitemComponent, { windowClass: 'myCustomModalClass' });
		modalRef.componentInstance.servicelevelId = id;
		modalRef.componentInstance.user_level_id = service_id;
		console.log(service_id);
		modalRef.result.then(
			result => {
				this.getServiceItemByServiceId(service_id);
			},
			reason => {}
		);
	}
	openEditproductbrandModal(id) {
		const modalRef = this.modalService.open(EditproductbrandComponent, { windowClass: 'myCustomModalClass' });
		modalRef.componentInstance.productbrandId = id;
		console.log(id);
		modalRef.result.then(
			result => {
				this.getProductbrand();
			},
			reason => {}
		);
	}

	openeditsupplierModal(id) {
		const modalRef = this.modalService.open(EditsupplierComponent, { windowClass: 'myCustomModalClass' });
		modalRef.componentInstance.supplierId = id;
		console.log(id);
		modalRef.result.then(
			result => {
				this.getSupplier();
			},
			reason => {}
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
	openRosterModal(id) {
		const modalRef = this.modalService.open(EmployeehoursComponent, {
			windowClass: 'myCustomModalClass',
			size: 'lg'
		});
		modalRef.componentInstance.emproster_id = id;
		modalRef.result.then(
			result => {
				//	this.getEmpRosterHoursByMechantId();
				console.log(result);
			},
			reason => {}
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
	public deleteResources(id): any {
		this.adminService.deleteResource(id).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Resource Deleted Successfully');
				this.ngOnInit();
				this.getResource();
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('Some error occured', 'Oops!');
			}
		);
	}
	public deleteServicelevel(id, service_id): any {
		this.servicelevelService.deleteServicelevel(id).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Service Level Deleted Successfully');
				this.getServiceEmpLevelByServiceId(service_id);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('Some error occured', 'Oops!');
			}
		);
	}
	public deleteServiceResource(id, service_id): any {
		this.serviceresourceService.deleteServiceResource(id).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Service Resource Deleted Successfully');
				this.getServiceResourceByServiceId(service_id);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('Some error occured', 'Oops!');
			}
		);
	}

	public deleteServiceItem(id, service_id): any {
		this.serviceitemService.deleteServiceItem(id).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Service Item Deleted Successfully');
				this.getServiceItemByServiceId(service_id);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('Some error occured', 'Oops!');
			}
		);
	}
	public deleteclientcatModal(clientCat_id): any {
		this.clientcategoriesService.deleteClientCat({ clientCat_id: clientCat_id }).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Clientcategory Deleted Successfully');
				this.getClientCategories();
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('Some error occured', 'Oops!');
			}
		);
	}
	public deleteHoliday(holiday_id): any {
		this.publicholidayService.deleteHoliday({ holiday_id: holiday_id }).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Holiday Deleted Successfully');
				this.getHoliday();
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('Some error occured', 'Oops!');
			}
		);
	}

	public deletEedittax(tax_rates_id): any {
		this.taxrateService.deleteTaxRate({ tax_rates_id: tax_rates_id }).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Tax Deleted Successfully');
				this.getTaxRates();
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('Some error occured', 'Oops!');
			}
		);
	}

	public deleteProductbrand(id): any {
		this.productbrandService.deleteProductBrand(id).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Product Brand Deleted Successfully');
				this.getProductbrand();
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('Some error occured', 'Oops!');
			}
		);
	}

	public deleteSupplier(id): any {
		this.supplierService.deleteSupplier(id).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Supplier Deleted Successfully');
				this.getSupplier();
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('Some error occured', 'Oops!');
			}
		);
	}

	public deleteProduct(id): any {
		this.productService.deleteProduct(id).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Product Deleted Successfully');
				this.getProducts();
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('Some error occured', 'Oops!');
			}
		);
	}

	public deleteClient(id): any {
		this.addnewclientService.deleteClient(id).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Client Deleted Successfully');
				this.getClientDetailsByMerchantID();
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
				mom_start_time: openingHours_data.monday_disable_option == 1 ? openingHours_data.mom_start_time : '',
				mom_end_time: openingHours_data.monday_disable_option == 1 ? openingHours_data.mom_end_time : '',
				tue_start_time: openingHours_data.tuesday_disable_option == 1 ? openingHours_data.tue_start_time : '',
				tue_end_time: openingHours_data.tuesday_disable_option == 1 ? openingHours_data.tue_end_time : '',
				wed_start_time: openingHours_data.wednesday_disable_option == 1 ? openingHours_data.wed_start_time : '',
				wed_end_time: openingHours_data.wednesday_disable_option == 1 ? openingHours_data.wed_end_time : '',
				thur_start_time:
					openingHours_data.thrusday_disable_option == 1 ? openingHours_data.thur_start_time : '',
				thur_end_time: openingHours_data.thrusday_disable_option == 1 ? openingHours_data.thur_end_time : '',
				fri_start_time: openingHours_data.friday_disable_option == 1 ? openingHours_data.fri_start_time : '',
				fri_end_time: openingHours_data.friday_disable_option == 1 ? openingHours_data.fri_end_time : '',
				sat_start_time: openingHours_data.saturday_disable_option == 1 ? openingHours_data.sat_start_time : '',
				sat_end_time: openingHours_data.saturday_disable_option == 1 ? openingHours_data.sat_end_time : '',
				sun_start_time: openingHours_data.sunday_disable_option == 1 ? openingHours_data.sun_start_time : '',
				sun_end_time: openingHours_data.sunday_disable_option == 1 ? openingHours_data.sun_end_time : ''
			};
			if (openingHours_data.opening_hours_id) {
				data['opening_hours_id'] = openingHours_data.opening_hours_id;
			}
			this.adminService.addOpeningDay(data).subscribe(apiResponse => {
				if (apiResponse.code === 200) {
					if (openingHours_data.opening_hours_id) {
						this.toastr.successToastr('Openinghours Updated Successfully');
					} else {
						this.toastr.successToastr('Openinghours Added Successfully');
					}
					this.router.navigate(['/admin']);
				} else {
					console.log('Hello');
					this.toastr.errorToastr(apiResponse.message);
				}
			});
		}
	}

	toggleLevel(id) {
		this.show = true;
		this.resourceshow = false;
		this.itemsshow = false;
		this.serviceshow = false;
		console.log(id);
		this.levelid = id;
		let dataResponse = [];
		let serviceData = this.services;
		this.adminService.getServiceByMerchantId().subscribe(
			data => {
				console.log(data);
				data['data'].forEach((item, key) => {
					if (!dataResponse.hasOwnProperty(item.id)) {
						dataResponse[item.id] = {};
					}
					let object = { service_name: '' };
					object.service_name = item.service_name;
					dataResponse[item.id] = object;
				});
				this.serviceLevelData = dataResponse[id];
				console.log(this.serviceLevelData);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);

		if (dataResponse[id]) {
			console.log(dataResponse[id]);
		}
		this.getServiceEmpLevelByServiceId(id);
	}
	toggleBacktoService() {
		this.serviceshow = true;
		this.show = false;
		this.resourceshow = false;
		this.itemsshow = false;
		this.getServiceByMerchantId();
	}

	toggleresources(id) {
		this.resourceshow = true;
		this.show = false;
		this.serviceshow = false;
		console.log(id);
		this.levelid = id;
		let dataResponse = [];
		let serviceData = this.services;
		this.adminService.getServiceByMerchantId().subscribe(
			data => {
				console.log(data);
				data['data'].forEach((item, key) => {
					if (!dataResponse.hasOwnProperty(item.id)) {
						dataResponse[item.id] = {};
					}
					let object = { service_name: '' };
					object.service_name = item.service_name;
					dataResponse[item.id] = object;
				});
				this.serviceLevelData = dataResponse[id];
				console.log(this.serviceLevelData);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);

		if (dataResponse[id]) {
			console.log(dataResponse[id]);
		}
		this.getServiceResourceByServiceId(id);
	}
	toggleItems(id) {
		this.itemsshow = true;
		this.show = false;
		this.serviceshow = false;
		console.log(id);
		this.levelid = id;
		let dataResponse = [];
		let serviceData = this.services;
		this.adminService.getServiceByMerchantId().subscribe(
			data => {
				console.log(data);
				data['data'].forEach((item, key) => {
					if (!dataResponse.hasOwnProperty(item.id)) {
						dataResponse[item.id] = {};
					}
					let object = { service_name: '' };
					object.service_name = item.service_name;
					dataResponse[item.id] = object;
				});
				this.serviceLevelData = dataResponse[id];
				console.log(this.serviceLevelData);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);

		if (dataResponse[id]) {
			console.log(dataResponse[id]);
		}
		this.getServiceItemByServiceId(id);
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
