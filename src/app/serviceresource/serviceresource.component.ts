import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { ServiceresourceService } from 'src/app/serviceresource/serviceresource.service';

@Component({
	selector: 'app-serviceresource',
	templateUrl: './serviceresource.component.html',
	styleUrls: ['./serviceresource.component.css']
})
export class ServiceresourceComponent implements OnInit {
	serviceresourceForm: FormGroup;
	closeResult: string;
	@Input() public user_level_id;
	submitted = false;
	levelid: any;
	public empLevelNames: any;
	public resources: any;
	constructor(
		public activeModal: NgbActiveModal,
		private SpinnerService: NgxSpinnerService,
		private modalService: NgbModal,
		public router: Router,
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		private _route: ActivatedRoute,
		public serviceresourceService: ServiceresourceService
	) {
		this.serviceresourceForm = this.formBuilder.group({
			service_id: new FormControl(),
			resource_id: new FormControl('', Validators.required)
		});
	}

	ngOnInit() {
		this.getResource();
		this.levelid = this.user_level_id;
		console.log(this.levelid);
	}
	get f() {
		return this.serviceresourceForm.controls;
	}

	onSubmit() {
		this.submitted = true;
		if (!this.serviceresourceForm.invalid) {
			let serviceresource_data = this.serviceresourceForm.value;
			console.log(serviceresource_data);
			let data = {
				service_id: this.levelid,
				resource_id: serviceresource_data.resource_id
			};
			console.log(data);
			this.serviceresourceService.addServiceResource(data).subscribe(apiResponse => {
				if (apiResponse.code === 200) {
					this.toastr.successToastr('Service Resource Added Successfully');
					this.closeModal();
					this.router.navigate(['/admin']);
				} else {
					console.log('Hello');
					this.toastr.errorToastr(apiResponse.message);
				}
			});
		}
	}

	public getResource(): any {
		this.serviceresourceService.getResource().subscribe(
			data => {
				console.log(data);
				this.resources = data['data'];
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}

	closeModal() {
		this.activeModal.close();
	}
}
