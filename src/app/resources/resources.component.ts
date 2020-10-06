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
	selector: 'app-resources',
	templateUrl: './resources.component.html',
	styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
	resourcesForm: FormGroup;
	closeResult: string;
	@Input() fromParent;
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
			resource_name: new FormControl('', Validators.required),
			resource_describe: new FormControl('')
		});
	}

	ngOnInit() {}
	get f() {
		return this.resourcesForm.controls;
	}
	onReset() {
		this.submitted = false;
		this.resourcesForm.reset();
	}

	onSubmit() {
   	this.submitted = true;
		if (!this.resourcesForm.invalid) {
			let resource_data = this.resourcesForm.value;
			let data = {
			resource_name: resource_data.resource_name || '',
			resource_describe: resource_data.resource_describe || '',
			};
			console.log(data);
			this.resourcesService.addResource(data).subscribe(apiResponse => {
				if (apiResponse.code === 200) {
					this.toastr.successToastr('Resource Added Successfully');
					this.closeModal();
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
