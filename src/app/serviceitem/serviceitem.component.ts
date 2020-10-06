import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { ServiceitemService } from 'src/app/serviceitem/serviceitem.service';

@Component({
	selector: 'app-serviceitem',
	templateUrl: './serviceitem.component.html',
	styleUrls: ['./serviceitem.component.css']
})
export class ServiceitemComponent implements OnInit {
	serviceItemForm: FormGroup;
	closeResult: string;
	@Input() public user_level_id;
	submitted = false;
	levelid: any;
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
		public serviceitemService: ServiceitemService
	) {
		this.serviceItemForm = this.formBuilder.group({
			service_id: new FormControl(),
			item_service_id: new FormControl('', Validators.required)
		});
	}

	ngOnInit() {
		this.getServiceByMerchantIdByGroup();
		this.levelid = this.user_level_id;
		console.log(this.levelid);
	}
	get f() {
		return this.serviceItemForm.controls;
	}

	onSubmit() {
		this.submitted = true;
		if (!this.serviceItemForm.invalid) {
			let serviceresource_data = this.serviceItemForm.value;
			console.log(serviceresource_data);
			let data = {
				service_id: this.levelid,
				item_service_id: serviceresource_data.item_service_id
			};
			console.log(data);
			this.serviceitemService.addServiceItem(data).subscribe(apiResponse => {
				if (apiResponse.code === 200) {
					this.toastr.successToastr('Service Item Added Successfully');
					this.closeModal();
					this.router.navigate(['/admin']);
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

	public getServiceByMerchantIdByGroup(): any {
		this.serviceitemService.getServiceByMerchantIdByGroup().subscribe(
			data => {
				console.log(data);
				this.serviceItem = data['data'];
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}
}
