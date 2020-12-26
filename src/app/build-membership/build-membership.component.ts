import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MembershipService } from 'src/app/membership/membership.service';
import { BuildMembershipService } from 'src/app/build-membership/build-membership.service';

@Component({
	selector: 'app-build-membership',
	templateUrl: './build-membership.component.html',
	styleUrls: ['./build-membership.component.css']
})
export class BuildMembershipComponent implements OnInit {
	searchForm: FormGroup;
	closeResult: string;
	submitted = false;
	public empLevelNames: any;
	public serviceItem: any;
	public merchantData: any;
	merchant: any;
	constructor(
		public activeModal: NgbActiveModal,
		private SpinnerService: NgxSpinnerService,
		private modalService: NgbModal,
		public router: Router,
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		private _route: ActivatedRoute,
		public buildmembershipService: BuildMembershipService
	) {
		this.searchForm = this.formBuilder.group({
			search: ['', Validators.required]
		});
	}

	ngOnInit() {
		let merchant_id = this.jwtService.getTokenByParams('merchant_id');
		this.getMerchantById(merchant_id);
	}
	get f() {
		return this.searchForm.controls;
	}
	onSubmit() {
		this.submitted = true;
		if (!this.searchForm.invalid) {
			let searchData = this.searchForm.value;
			console.log(searchData);
			let data = {
				search: searchData.search || ''
			};
			console.log(data);
			this.buildmembershipService.isClientExists(data).subscribe(apiResponse => {
					if (apiResponse.code === 200) {
						let clients = apiResponse.data.client.id;
						let merchant_id = apiResponse.data.client.merchant_id;
						console.log('clientid', clients);
						console.log('merhcnat', merchant_id);
						this.router.navigate(['/membership/' + clients + '/' + merchant_id]);
					} else {
								this.toastr.errorToastr(apiResponse.errors['search'][0]);
								this.router.navigate(['/clientformembership']);
							}
				}, er => {
					  if (er.error.code === 401) {
								this.toastr.errorToastr(er.error.message);
								this.router.navigate(['/clientformembership']);
							} else {
									this.toastr.errorToastr(er.error.errors['search'][0]);
							}
				});
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
