import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { TaxrateService } from 'src/app/taxrate/taxrate.service';

@Component({
	selector: 'app-taxrate',
	templateUrl: './taxrate.component.html',
	styleUrls: ['./taxrate.component.css']
})
export class TaxrateComponent implements OnInit {
	taxrateForm: FormGroup;
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
		public taxrateService: TaxrateService
	) {
		this.taxrateForm = this.formBuilder.group({
			tax_name: new FormControl(''),
			tax_amount: new FormControl(''),
			tax_description: new FormControl('')
		});
	}

	ngOnInit() {}

	get f() {
		return this.taxrateForm.controls;
	}
	onReset() {
		this.submitted = false;
		this.taxrateForm.reset();
	}

	onSubmit() {
		this.submitted = true;
		if (!this.taxrateForm.invalid) {
			let taxrate_data = this.taxrateForm.value;
			let data = {
				tax_name: taxrate_data.tax_name || '',
				tax_amount: taxrate_data.tax_amount || '',
				tax_description: taxrate_data.tax_description || ''
			};
			console.log(data);
			this.taxrateService.addTaxRates(data).subscribe(apiResponse => {
				if (apiResponse.code === 200) {
					this.toastr.successToastr('Tax Added Successfully');
					this.activeModal.close(data);
					this.taxrateForm.reset();
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
