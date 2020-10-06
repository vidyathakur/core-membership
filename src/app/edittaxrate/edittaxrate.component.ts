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
	selector: 'app-edittaxrate',
	templateUrl: './edittaxrate.component.html',
	styleUrls: ['./edittaxrate.component.css']
})
export class EdittaxrateComponent implements OnInit {
	taxrateForm: FormGroup;
	closeResult: string;
	@Input() public taxid;
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
			tax_rates_id: new FormControl(''),
			tax_name: new FormControl('', Validators.required),
			tax_amount: new FormControl('', Validators.required),
			tax_description: new FormControl('')
		});
	}

	ngOnInit() {
		console.log(this.taxid);
		let id = this.taxid;
		this.taxrateService.getTaxRatesById(id).subscribe(
			data => {
				let taxrate_details = data.data[0];
				console.log(taxrate_details);
				this.taxrateForm = this.formBuilder.group({
					tax_name: taxrate_details.tax_name,
					tax_amount: taxrate_details.tax_amount,
					tax_description: taxrate_details.tax_description,
					tax_rates_id: [id]
				});
			},
			error => {
				console.log('some error occured');
			}
		);
	}

	public updateTaxrate(): any {
		this.submitted = true;
		let taxrate_data = this.taxrateForm.value;
		console.log(taxrate_data);
		let data = {
			tax_rates_id: taxrate_data.tax_rates_id,
			tax_name: taxrate_data.tax_name || '',
			tax_amount: taxrate_data.tax_amount || '',
			tax_description: taxrate_data.tax_description || ''
		};
		console.log(data);
		this.taxrateService.editTaxRate(data).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Taxrate Updated Successfully');
				this.router.navigate(['/admin']);
				this.activeModal.close();
				this.ngOnInit();
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
}
