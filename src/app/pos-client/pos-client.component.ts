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
	clientList = [];
	data = [];
	posForm: FormGroup;
	closeResult: string;
	submitted = false;
	public empLevelNames: any;
	public serviceItem: any;
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
	}

	removeClients() {
		this.clientList = [];
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
		if (!this.posForm.invalid) {
			let posData = this.posForm.value;
			console.log(posData);
			let client  = this.clientList;
			let client_id = [];
			for(let c in client){
				client_id.push(client[c].id);
			}
			let data = {
				client_id:client_id[0],
				date_from: posData.date_from.year + '-' + posData.date_from.month + '-01', //+ posData.date_from.day,
				date_to: posData.date_to.year + '-' + posData.date_to.month + '-31' //+ posData.date_to.day
			};
			console.log(data);
			this.posclientService.getAppointmentByClientId(data).subscribe(apiResponse => {
				if (apiResponse.code === 200) {
					let responseData = apiResponse.data;
					let response = [];
					let price = [];
					for (let i in responseData) {
						let client = responseData[i];
						let object = { id: '', service_names: '', price: '' };
						let service_name = [];
						for (let k in client.services) {
							let service = client.services[k];
							service_name.push(service.service_name);
						}
						price.push(parseInt(client.price));
						object.id = client.id;
						object.service_names = service_name.join(',');
						object.price = client.price;
						response.push(object);
					}
					this.serviceItem = response;
					this.total_price = price.reduce((a, b) => a + b, 0);
				} else {
					console.log('Hello');
					this.toastr.errorToastr(apiResponse.message);
				}
			});
		}
	}

	closeModal() {
		this.activeModal.close();
	}
}
