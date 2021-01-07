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
	selector: 'app-pos-product',
	templateUrl: './pos-product.component.html',
	styleUrls: ['./pos-product.component.css'],
	providers: [AutoCompleteComponent]
})
export class PosProductComponent implements OnInit {
	total_price: any;
	query: string;
	keyword = 'name';
	clientList = [];
	productList = [];
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
	inputnumber = 0;
	qtd: any[] = [];
	price_increase: any[] = [];
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

	plus(id) {
		this.qtd[id] = parseInt(this.qtd[id]) + 1;
		let outputData = this.productList;
		let updatePrice = [];
		let price = {};
		let totalPrice = 0;
		for (let k in outputData) {
			let item = outputData[k];
			let prices = parseInt(item.retail_pice) * this.qtd[item.id];
			totalPrice += prices;
			if (!price.hasOwnProperty(item.id)) {
				price[item.id] = [];
			}
			price[item.id].push(prices);
		}
		this.price_increase[id] = price[id][0];
		this.total_price = totalPrice;
		//console.log(Object.values(price));
	}

	minus(id) {
		console.log(id);
		console.log(this.qtd[id]);
		if (this.qtd[id] - 1 > 0) {
			this.qtd[id] = parseInt(this.qtd[id]) - 1;
			let outputData = this.productList;
			let updatePrice = [];
			let price = {};
			let totalPrice = 0;
			for (let k in outputData) {
				let item = outputData[k];
				let prices = parseInt(item.retail_pice) * this.qtd[item.id];
				totalPrice += prices;
				if (!price.hasOwnProperty(item.id)) {
					price[item.id] = [];
				}
				price[item.id].push(prices);
			}
			this.price_increase[id] = price[id][0];
			this.total_price = totalPrice;
		} else {
			this.qtd[id] = 1;
		}
	}

	onChangeSearchProduct(val: string) {
		this.showbtn = true;
		this.posclientService.searchProductByMerchantId({ search: val }).subscribe(apiResponse => {
			if (apiResponse.code === 200) {
				let response = [];
				apiResponse.data.forEach(item => {
					let object = { id: item.id, name: item.product_name, retail_pice: item.retail_pice };
					response.push(object);
				});
				this.data = response;
			} else {
				this.toastr.errorToastr(apiResponse.message);
			}
		});
	}

	removeProducts(id, index) {
		let ouputData = this.productList;
		console.log(this.productList);
		delete ouputData[index];
		for (var i = 0; i < ouputData.length; i++) {
			if (i === index) {
				ouputData.splice(i, 1);
			}
		}
		this.price_increase[id] = 0;
		this.qtd[id] = 1;
		this.productList = ouputData;
		let retail_pice = [];
		for (var i = 0; i < this.productList.length; i++) {
			let item = this.productList[i];
			this.qtd[item.id] = this.qtd[item.id] ? this.qtd[item.id] : 1;
			this.price_increase[item.id] = this.price_increase[item.id]
				? this.price_increase[item.id]
				: item.retail_pice;
			retail_pice.push(this.price_increase[item.id] ? this.price_increase[item.id] : 0);
		}
		this.total_price = retail_pice.reduce((a, b) => a + b, 0);
	}

	selectProductEvent(item) {
		this.productList.push(item);
		this.checkedCategoryList = [];
		let retail_pice = [];
		for (var i = 0; i < this.productList.length; i++) {
			let item = this.productList[i];
			this.qtd[item.id] = this.qtd[item.id] ? this.qtd[item.id] : 1;
			this.price_increase[item.id] = this.price_increase[item.id]
				? this.price_increase[item.id]
				: item.retail_pice;
			retail_pice.push(this.price_increase[item.id] ? this.price_increase[item.id] : 0);
		}
		this.total_price = retail_pice.reduce((a, b) => a + b, 0);
		console.log(this.total_price);
	}

	searchCleared() {
		this.clientList = [];
		// this.serviceItem = [];
		this.showtotalprice = false;
		this.showselectedbtn = false;
	}

	searchProductCleared() {
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
		for (var i = 0; i < this.productList.length; i++) {
			let pitem = this.productList[i];
			service_id.push(pitem.id);
		}
		for (var i = 0; i < this.clientList.length; i++) {
			let citem = this.clientList[i];
			client_id.push(citem.id);
		}
		let data = new Date();
		let [year, month, day] = [data.getFullYear(), data.getMonth() + 1, data.getDate()];
		let current_date = day + '-' + month + '-' + year;
		let object = {
			type: 'walk-in',
			payment_method: 'cash',
			total_amount: this.total_price,
			paid_on: current_date,
			appointment_ids: appointment,
			client_ids: client_id,
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

	goToClient() {
		this.activeModal.close();
		this.router.navigate(['/addnewclient']);
	}
}
