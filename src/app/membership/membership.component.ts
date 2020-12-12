import { ClientexistingComponent } from './../clientexisting/clientexisting.component';
import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MembershipService } from 'src/app/membership/membership.service';

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
	checkOutputDta: any[];
	constructor(
		private SpinnerService: NgxSpinnerService,
		public router: Router,
		private modalService: NgbModal,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		private formBuilder: FormBuilder,
		private _route: ActivatedRoute,
		public membershipService: MembershipService
	) {
		this.membershipForm = this.formBuilder.group({
			client_service_ids: [''],
			client_id: [''],
			price: [''],
			subscription_plan: ['']
		});
		this.selectedItems = [];
	}
	get f() {
		return this.membershipForm.controls;
	}

	ngOnInit() {
	this.modalService.open(ClientexistingComponent,{ centered: true });
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
		let arrayData = [];
		let price = 0;
		let radiosData = this.membershipForm.value;
		let subscription_plan = parseInt(radiosData.subscription_plan);
		let prices = this.getObjectDatas;
		console.log(this.getObjectDatas);
		for (let i in this.selectedItems) {
			price += prices[id].price;
			arrayData.push(prices[id]);
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

	onSubmit() {
		this.submitted = true;
		if (!this.membershipForm.invalid) {
			let membership_data = this.membershipForm.value;
			console.log(membership_data);
			let data = {
				subscription_plan: membership_data.subscription_plan || '',
				price: membership_data.price || '',
				client_service_ids: membership_data.client_service_ids,
				client_id: membership_data.client_id
			};
			console.log(data);
			this.membershipService.createCustomerMembership(data).subscribe(
				apiResponse => {
					if (apiResponse.code === 200) {
						this.toastr.successToastr('Membership Created Successfully');
					} else {
						console.log('Hello');
						this.toastr.errorToastr('Some error occurred');
					}
				},
				er => {
					console.log('some error occurred');
					// console.log(er.error.errors);
					// console.log(er.error.errors['order']);
					// this.toastr.errorToastr(er.error.errors['order'][0]);
				}
			);
		}
	}
}
