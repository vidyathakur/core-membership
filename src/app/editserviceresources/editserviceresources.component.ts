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
	selector: 'app-editserviceresources',
	templateUrl: './editserviceresources.component.html',
	styleUrls: ['./editserviceresources.component.css']
})
export class EditserviceresourcesComponent implements OnInit {
	serviceresourceForm: FormGroup;
	closeResult: string;
	@Input() public user_level_id;
	@Input() public servicelevelId;
	submitted = false;
	resourceid: any;
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
			service_resource_id: new FormControl('',Validators.required),
			resource_id: new FormControl('')
		});
	}

	ngOnInit() {
		this.getResource();
		let levelid = this.user_level_id;
		let id = this.servicelevelId;
		console.log(this.user_level_id);

		this.serviceresourceService.getServiceResourceById(id).subscribe(
			data => {
				let serviceResource_details = data['data'][0];
				console.log(serviceResource_details);
				this.serviceresourceForm = this.formBuilder.group({
					resource_id: serviceResource_details.resource_id,
          service_id: [levelid],
					service_resource_id: [id]
					
				});
			},
			error => {
				console.log('some error occured');
			}
		);
	}

	public updateServiceResource(): any {
		this.submitted = true;
		let serviceresource_data = this.serviceresourceForm.value;
		console.log(serviceresource_data);
		let data = {
			service_resource_id: serviceresource_data.service_resource_id,
			resource_id: serviceresource_data.resource_id
		};
		console.log(data);
		this.serviceresourceService.editServiceResource(data).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Service Resources Updated Successfully');
				this.closeModal();
				this.router.navigate(['/admin']);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('Some error occured', 'Oops!');
			}
		);
	}

	closeModal() {
		this.activeModal.close();
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
}
