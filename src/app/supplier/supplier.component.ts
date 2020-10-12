import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { SupplierService } from 'src/app/supplier/supplier.service';
import { AddemployeesService } from 'src/app/addemployees/addemployees.service';

@Component({
	selector: 'app-supplier',
	templateUrl: './supplier.component.html',
	styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
	supplierForm: FormGroup;
	closeResult: string;
	@Input() public user_level_id;
	submitted = false;
	levelid: any;
	public stateList: any;
	constructor(
		public activeModal: NgbActiveModal,
		private SpinnerService: NgxSpinnerService,
		private modalService: NgbModal,
		public router: Router,
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		private _route: ActivatedRoute,
		public supplierService: SupplierService,
		public addemployeesService: AddemployeesService
	) {}

	ngOnInit() {
		this.getStates();
		this.supplierForm = this.formBuilder.group({
			supplier_name: new FormControl('', Validators.required),
			contact_name: new FormControl(''),
			phone_no: new FormControl(''),
			email: new FormControl('', [Validators.required, Validators.email]),
			mobile: new FormControl('', Validators.required),
			fax: new FormControl(''),
			address: new FormControl('', Validators.required),
			suburb: new FormControl(''),
			postcode: new FormControl(''),
			state: new FormControl()
		});
	}
	get f() {
		return this.supplierForm.controls;
	}

	onSubmit() {
		this.submitted = true;
		if (!this.supplierForm.invalid) {
			let supplier_data = this.supplierForm.value;
			console.log(supplier_data);
			let data = {
				supplier_name: supplier_data.supplier_name || '',
        contact_name: supplier_data.contact_name || '',
        phone_no: supplier_data.phone_no || '',
        email: supplier_data.email || '',
        mobile: supplier_data.mobile || '',
        fax: supplier_data.fax || '',
        address: supplier_data.address || '',
        suburb: supplier_data.suburb || '',
        postcode: supplier_data.postcode || '',
        state: supplier_data.state || ''
			};
			console.log(data);
			this.supplierService.createSupplier(data).subscribe(apiResponse => {
				if (apiResponse.code === 200) {
					this.toastr.successToastr('Supplier Added Successfully');
					this.closeModal();
					this.router.navigate(['/admin']);
				} else {
					console.log('Hello');
					this.toastr.errorToastr(apiResponse.message);
				}
			});
		}
	}

	public getStates(): any {
		let country_id = this.jwtService.getTokenByParams('country_id');
		let paramsData = {
			country_id: country_id
		};
		console.log(paramsData);
		this.addemployeesService.getStates(paramsData).subscribe(
			data => {
				console.log(data);
				this.stateList = data['data'];
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
