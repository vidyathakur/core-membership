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
	selector: 'app-editserviceitem',
	templateUrl: './editserviceitem.component.html',
	styleUrls: ['./editserviceitem.component.css']
})
export class EditserviceitemComponent implements OnInit {
	serviceItemForm: FormGroup;
	closeResult: string;
	@Input() public user_level_id;
	@Input() public servicelevelId;
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
			serviceItem_id: new FormControl('', Validators.required),
			item_service_id: new FormControl('')
		});
	}

	ngOnInit() {
		this.getServiceByMerchantIdByGroup();
		let levelid = this.user_level_id;
		let id = this.servicelevelId;
		console.log(this.user_level_id);
		this.serviceitemService.getServiceItem(id).subscribe(
			data => {
				let serviceItem_details = data['data'];
				console.log(serviceItem_details);
				this.serviceItemForm = this.formBuilder.group({
					serviceItem_id: [id],
					service_id: [levelid],
					item_service_id: serviceItem_details.item_service_id
				});
				console.log(this.serviceItemForm);
			},
			error => {
				console.log('some error occured');
			}
		);
	}

	public updateServiceItem(): any {
		this.submitted = true;
		let serviceitem_data = this.serviceItemForm.value;
		console.log(serviceitem_data);
		let data = {
			serviceItem_id: serviceitem_data.serviceItem_id,
			item_service_id: serviceitem_data.item_service_id
		};
		console.log(data);
		this.serviceitemService.editServiceItem(data).subscribe(data => {
				console.log(data);
				this.toastr.successToastr(' Service Item Updated Successfully');
				this.closeModal();
				this.router.navigate(['/admin']);
			}, error => {
				console.log('some error occured');
				this.toastr.errorToastr('Some error occured', 'Oops!');
			});
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
