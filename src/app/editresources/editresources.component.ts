import { Component, OnInit } from '@angular/core';
import { ResourcesService } from 'src/app/resources/resources.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Input } from '@angular/core';

@Component({
	selector: 'app-editresources',
	templateUrl: './editresources.component.html',
	styleUrls: ['./editresources.component.css']
})
export class EditresourcesComponent implements OnInit {
	resourcesForm: FormGroup;
	closeResult: string;
	@Input() public resourceid;
	submitted = false;
	constructor(
		public activeModal: NgbActiveModal,
		private SpinnerService: NgxSpinnerService,
		private modalService: NgbModal,
		public router: Router,
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		private _route: ActivatedRoute,
		public resourcesService: ResourcesService
	) {
		this.resourcesForm = this.formBuilder.group({
			resource_id: new FormControl(''),
			resource_name: new FormControl('', Validators.required),
			resource_describe: new FormControl('')
		});
	}

	ngOnInit() {
		console.log(this.resourceid);
		let id = this.resourceid;
		this.resourcesService.getResourceById(id).subscribe(
			data => {
				let resource_details = data.data[0];
				console.log(resource_details);
				this.resourcesForm = this.formBuilder.group({
					resource_name: resource_details.resource_name,
					resource_describe: resource_details.resource_describe,
					resource_id: [id]
				});
			},
			error => {
				console.log('some error occured');
			}
		);
	}

	public updateResources(): any {
		this.submitted = true;
		let resources_data = this.resourcesForm.value;
		console.log(resources_data);
		let data = {
			resource_id: resources_data.resource_id,
			resource_name: resources_data.resource_name || '',
			resource_describe: resources_data.resource_describe || '',
		};
		console.log(data);
		this.resourcesService.editResource(data).subscribe(data => {
				console.log(data);
				this.toastr.successToastr(' Resources Updated Successfully');
				this.router.navigate(['/admin']);
				this.activeModal.close();
				this.ngOnInit();
			}, error => {
				console.log('some error occured');
				this.toastr.errorToastr('Some error occured', 'Oops!');
			});
	}
	closeModal() {
		this.activeModal.close();
	}
}
