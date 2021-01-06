import { PosServicesService } from './pos-services.service';
import { AutoCompleteComponent, FilterType, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { PosClientService } from 'src/app/pos-client/pos-client.service';
import { isEmbeddedView } from '@angular/core/src/view/util';

@Component({
	selector: 'app-pos-services',
	templateUrl: './pos-services.component.html',
	styleUrls: ['./pos-services.component.css'],
	providers: [AutoCompleteComponent]
})
export class PosServicesComponent implements OnInit {
	total_price: number;
	query: string;
	keyword = 'name';
	clientList = [];
	serviceList = [];
	data = [];
	selectedItems: any;
	posForm: FormGroup;
	posaddForm: FormGroup;
	showbtn = false;
	closeResult: string;
	submitted = false;
	showselectedbtn = false;
	public empLevelNames: any;
	public serviceItem: any;
	isMasterSel: boolean;
	isDisabled: boolean;
	showtotalprice = false;
	checkedCategoryList: any[];
	constructor(
		public activeModal: NgbActiveModal,
		private SpinnerService: NgxSpinnerService,
		private modalService: NgbModal,
		public router: Router,
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		private _route: ActivatedRoute,
		public autoCompleteObj: AutoCompleteComponent,
		public posclientService: PosClientService,
		public posservicesService: PosServicesService
	) {}

	ngOnInit() {
		this.posForm = this.formBuilder.group({
			search: new FormControl('', Validators.required),
			date_from: new FormControl(''),
			date_to: new FormControl('')
		});
	}

	selectEvent(item) {
		this.clientList = [];
		this.clientList.push(item);
	}

	onChangeSearch(val: string) {
		this.showbtn = true;
		this.showselectedbtn = true;
		this.posclientService.searchClient({ search: val }).subscribe(apiResponse => {
			if (apiResponse.code === 200) {
				let response = [];
				apiResponse.data.client.forEach(item => {
					let object = {
						id: item.id,
						name: item.f_name,
						mobile: item.mobile,
						email: item.email
					};
					response.push(object);
				});
				this.data = response;
			} else {
				this.toastr.errorToastr(apiResponse.message);
			}
		});
	}

	onChangeSearchService(val: string) {
		this.showbtn = true;
		let price = [];
		this.posclientService.searchServiceByMerchantId({ search: val }).subscribe(apiResponse => {
			if (apiResponse.code === 200) {
				let response = [];
				apiResponse.data.forEach(item => {
					let service_name = item.service_name + ((item.gender=='Male') ? '- Men Fashion' : (item.gender=='Female') ? '- Women Fashion' : '')
					let object = { id: item.id, name: service_name, time:item.duration, price:item.price };
					price.push((item.price) ? parseInt(item.price) : 0);
					response.push(object);
				});
				this.data = response;
				//this.total_price = price.reduce((a, b) => a + b, 0);
				console.log(response);
			} else {
				this.toastr.errorToastr(apiResponse.message);
			}
		});
	}

	removeServices(id, index) {
		let ouputData = this.serviceList;
		delete ouputData[index];
		for (var i = 0; i < ouputData.length; i++) {
			if (i === index) {
				ouputData.splice(i, 1);
			}
		}
		this.serviceList = ouputData;
		let price = [];
		for (var i = 0; i < this.serviceList.length; i++) {
			let item = this.serviceList[i];
			price.push(item.price ? item.price : 0);
		}
		this.total_price = price.reduce((a, b) => a + b, 0);
	}

	selectServiceEvent(item) {
		this.serviceList.push(item);
		this.checkedCategoryList = [];
		let price = [];
		for (var i = 0; i < this.serviceList.length; i++) {
			let item = this.serviceList[i];
			price.push(item.price ? item.price : 0);
		}
		this.total_price = price.reduce((a, b) => a + b, 0);
	}

	searchCleared() {
		this.clientList = [];
		// this.serviceItem = [];
		this.showtotalprice = false;
		this.showselectedbtn = false;
	}

	searchServiceCleared() {
		//this.serviceList = [];
	}

	removeClients() {
		this.clientList = [];
		this.serviceItem = [];
		this.showtotalprice = false;
		this.showselectedbtn = false;
		this.data = [];
		this.query = '';
	}

	onFocused(e) {
		// do something when input is focused
	}
	get f() {
		return this.posForm.controls;
	}

	closeModal() {
		this.activeModal.close();
	}

	generateBill() {
		let appointment = [];
		let service_id = [];
		let client_id = [];
		for (var i = 0; i < this.serviceList.length; i++) {
			let item = this.serviceList[i];
			if (item.isSelected) {
				let service = item.service_id.split(',');
				appointment.push(item.appointment_id);
				for (let s in service) {
					service_id.push(service[s]);
				}
				client_id.push(item.client_id);
			}
		}
		let client = client_id.filter(function(item, pos) {
			return client_id.indexOf(item) == pos;
		});
		let data = new Date();
		let [year, month, day] = [data.getFullYear(), data.getMonth() + 1, data.getDate()];
		let current_date = day + '-' + month + '-' + year;
		let object = {
			type: 'appointment',
			payment_method: 'cash',
			total_amount: this.total_price,
			appointment_ids: appointment,
			paid_on: current_date,
			client_ids: client,
			services_ids: service_id
		};
		this.posclientService.createPos(object).subscribe(apiResponse => {
			if (apiResponse.code === 200) {
				this.toastr.successToastr(apiResponse.message);
				this.activeModal.close();
				this.router.navigate(['/pos']);
			} else {
				this.toastr.errorToastr(apiResponse.message);
			}
		});
	}
}
