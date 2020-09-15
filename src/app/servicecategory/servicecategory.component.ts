import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { PublicholidayService } from 'src/app/publicholiday/publicholiday.service';
import { ServicecategoryService } from 'src/app/servicecategory/servicecategory.service';

@Component({
	selector: 'app-servicecategory',
	templateUrl: './servicecategory.component.html',
	styleUrls: ['./servicecategory.component.css']
})
export class ServicecategoryComponent implements OnInit {
	servicecategoryForm: FormGroup;
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
		public servicecategoryService: ServicecategoryService
	) {
		this.servicecategoryForm = this.formBuilder.group({
			name: new FormControl('')
		});
	}

	ngOnInit() {}
	get f() {
		return this.servicecategoryForm.controls;
	}
	onReset() {
		this.submitted = false;
		this.servicecategoryForm.reset();
	}

	onSubmit() {
		this.submitted = true;
		if (!this.servicecategoryForm.invalid) {
			let serviceCat_data = this.servicecategoryForm.value;
			let data = {
				name: serviceCat_data.name || ''
			};
			console.log(data);
			this.servicecategoryService.addServiceCat(data).subscribe(apiResponse => {
				if (apiResponse.code === 200) {
					this.toastr.successToastr('Service category Added Successfully');
					this.activeModal.close(data);
					this.servicecategoryForm.reset();
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
}
