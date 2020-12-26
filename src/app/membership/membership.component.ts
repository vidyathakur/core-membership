
import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal,NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MembershipService } from 'src/app/membership/membership.service';
import { BuildMembershipService } from 'src/app/build-membership/build-membership.service';
import { BuildMembershipComponent } from 'src/app/build-membership/build-membership.component';

@Component({
	selector: 'app-membership',
	templateUrl: './membership.component.html',
	styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {
	changePrice: number;
	subscription_plan: any;
	getObjectDatas: {};
	membershipForm: FormGroup;
	showHeader = false;
	services: any;
	price: number;
	submitted = false;
	selectedItems: any;
	serviceData: any;
	public merchantData: any;
	checkOutputDta: any[];
	modalOption: NgbModalOptions = {};
	clientId: any;
	merchant: any;
	// data2: string = '1';
	constructor(
		private SpinnerService: NgxSpinnerService,
		public router: Router,
		private modalService: NgbModal,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		private formBuilder: FormBuilder,
		private _route: ActivatedRoute,
		public membershipService: MembershipService,
		public buildmembershipService: BuildMembershipService
	) {
		this.membershipForm = this.formBuilder.group({
			client_service_ids: [''],
			client_id: [''],
			price: [''],
			subscription_plan: ['', Validators.required]
		});
		this.selectedItems = [];
		this.clientId = this._route.snapshot.params['client_id'];
		this.merchant = this._route.snapshot.params['merchant_id'];
		console.log(this._route.snapshot.params);
	}
	get f() {
		return this.membershipForm.controls;
	}

	ngOnInit() {
		let merchant_id = this.jwtService.getTokenByParams('merchant_id');
		this.getMerchantById(merchant_id);
		if (!this.clientId && !this.merchant) {
			this.modalService.open(BuildMembershipComponent, {
				centered: true,
				backdrop: 'static',
				keyboard: false
			});
		}
		this.getServiceByMerchantId();
	}

	public getServiceByMerchantId(): any {
		this.membershipService.getServiceByMerchantId().subscribe(
			data => {
				let object = {};
				data['data'].forEach((item, key) => {
					if (!object.hasOwnProperty(item.id)) {
						object[item.id] = [];
					}
					object[item.id] = item;
				});
				//console.log(object);
				this.getObjectDatas = object;
				this.services = data['data'];
			},
			error => {
				console.log('some error occurred');
				this.toastr.errorToastr('some error occurred');
			}
		);
	}

	addService(id) {
		this.selectedItems.push(id);
		console.log(this.selectedItems);
		let arrayData = [];
		let price = 0;
		let radiosData = this.membershipForm.value;
		let subscription_plan = parseInt(radiosData.subscription_plan);
		let prices = this.getObjectDatas;
		console.log(prices);
		console.log(this.getObjectDatas);
		for (let i in this.selectedItems) {
			price += prices[this.selectedItems[i]].price;
			arrayData.push(prices[this.selectedItems[i]]);
		}
		this.checkOutputDta = arrayData;
		this.changePrice = price ? price : 0;
		this.price = subscription_plan ? price * subscription_plan : price;
	}

	serviceEvent(e) {
		let subscription_plan = e.target.value;
		this.price = parseInt(subscription_plan) * this.changePrice;
		console.log(e.target.value);
	}

	removeServices(id, index) {
		let price = 0;
		let ouputData = this.checkOutputDta;
		let radiosData = this.membershipForm.value;
		let subscription_plan = parseInt(radiosData.subscription_plan);
		delete ouputData[index];
		for (var i = 0; i < ouputData.length; i++) {
			if (i === index) {
				ouputData.splice(i, 1);
				this.selectedItems.splice(i, 1);
			}
		}
		for (let k in ouputData) {
			let item = ouputData[k];
			price += parseInt(item.price);
		}
		this.checkOutputDta = ouputData;
		this.price = subscription_plan ? price * subscription_plan : price;
	}

	// openExistingclientModel() {
	// 	const modalRef = this.modalService.open(ClientexistingComponent, {
	// 		windowClass: 'myCustomModalClass',
	// 	});
	// 	modalRef.result.then(
	// 		result => {
	// 			// this.getProductbrand();
	// 			console.log(result);
	// 		},
	// 		reason => {}
	// 	);
	// }

	onCancel() {
		this.router.navigate(['/dashboard']);
	}

	onSubmit() {
		this.submitted = true;

		if (!this.membershipForm.invalid) {
			let membership_data = this.membershipForm.value;
			let client_service_ids = [];
			for (let k in this.selectedItems) {
				let object = { service_id: this.selectedItems[k] };
				client_service_ids.push(object);
			}
			let membership = { '1': 'monthly', '3': 'quarterly', '12': 'Yearly' };
			let data = {
				subscription_plan: membership[membership_data.subscription_plan],
				price: this.price,
				client_service_ids: client_service_ids,
				client_id: this.clientId
			};
			this.membershipService.createCustomerMembership(data).subscribe(
				apiResponse => {
					if (apiResponse.code === 200) {
						this.toastr.successToastr('Membership Created Successfully');
					} else {
						console.log('Hello');
						this.toastr.errorToastr(apiResponse.errors.price[0]);
					}
				},
				er => {
					console.log('some error occurred');
					this.toastr.errorToastr(er.error.errors['price'][0]);
				}
			);
		}
	}

	public getMerchantById(merchant_id): any {
		this.buildmembershipService.getMerchantById(merchant_id).subscribe(data => {
				console.log(data);
				this.merchantData = data['data'];
			}, error => {
				console.log('some error occurred');
				this.toastr.errorToastr('some error occurred');
			});
	}
}
