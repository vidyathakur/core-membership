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
	selector: 'app-pos-client',
	templateUrl: './pos-client.component.html',
	styleUrls: ['./pos-client.component.css'],
	providers: [AutoCompleteComponent]
})
export class PosClientComponent implements OnInit {
	total_price: any;
	query: string;
	keyword = 'name';
	// searchKeyword: string;
	// keyword = ["name", "email"];
	clientList = [];
	data = [];
	posForm: FormGroup;
	showbtn = false;
	closeResult: string;
	submitted = false;
	showselectedbtn = false;
	public empLevelNames: any;
	public serviceItem: any;
	isMasterSel: boolean;
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
		public posclientService: PosClientService
	) {
		this.isMasterSel = false;
	}

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

	searchCleared() {
		this.clientList = [];
		this.serviceItem = [];
		this.showtotalprice = false;
		this.showselectedbtn = false;
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

	onSubmit() {
		this.submitted = true;
		this.showbtn = true;
		this.showselectedbtn = true;
		if (!this.posForm.invalid) {
			let posData = this.posForm.value;
			console.log(posData);
			let client = this.clientList;
			console.log(client);
			let client_id = [];
			for (let c in client) {
				client_id.push(client[c].id);
			}
			console.log(posData);
			let data = {
				client_id: client_id[0],
				date_from: posData.date_from
					? posData.date_from.year + '-' + posData.date_from.month + '-' + posData.date_from.day
					: '',
				date_to: posData.date_to
					? posData.date_to.year + '-' + posData.date_to.month + '-' + posData.date_to.day
					: ''
			};
			console.log(data);
			this.posclientService.getAppointmentByClientId(data).subscribe(apiResponse => {
				this.showtotalprice = true;
				if (apiResponse.code === 200) {
					console.log(apiResponse);
					let responseData = apiResponse.data;
					let response = [];
					let price = [];
					for (let i in responseData) {
						let client = responseData[i];
						let object = {
							id: '',
							service_names: '',
							price: '',
							isSelected: false,
							service_id: '',
							barcode_no: client.client.barcode_no,
							appointment_id: client.id,
							client_id: client.client_id
						};
						let service_name = [];
						let service_id = [];
						for (let k in client.services) {
							let service = client.services[k];
							service_name.push(service.service_name);
							service_id.push(service.id);
						}
						price.push(parseInt(client.price));
						object.id = client.id;
						object.service_names = service_name.join(',');
						object.price = client.price;
						object.service_id = service_id.join(',');
						response.push(object);
					}
					this.serviceItem = response;
					console.log(this.serviceItem);
					this.total_price = 0; //price.reduce((a, b) => a + b, 0);
				} else {
					this.toastr.errorToastr(apiResponse.message);
				}
			});
		}
	}

	closeModal() {
		this.activeModal.close();
	}

	checkUncheckAll() {
		for (var i = 0; i < this.serviceItem.length; i++) {
			this.serviceItem[i].isSelected = this.isMasterSel;
		}
		this.getCheckedItemList();
	}

	isAllSelected() {
		this.isMasterSel = this.serviceItem.every(function(item: any) {
			return item.isSelected == true;
		});
		this.getCheckedItemList();
	}

	getCheckedItemList() {
		this.checkedCategoryList = [];
		let price = [];
		for (var i = 0; i < this.serviceItem.length; i++) {
			let item = this.serviceItem[i];
			item.isSelected = item.isSelected ? true : false;
			//	if(item.isSlecled)
			price.push(item.isSelected ? parseFloat(item.price) : 0);
			this.checkedCategoryList.push(this.serviceItem[i]);
		}
		this.total_price = price.reduce((a, b) => a + b, 0);
		this.serviceItem = this.checkedCategoryList;
	}

	generateBill() {
		let appointment = [];
		let service_id = [];
		let client_id = [];
		for (var i = 0; i < this.serviceItem.length; i++) {
			let item = this.serviceItem[i];
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
			paid_on: current_date,
			appointment_ids: appointment,
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
