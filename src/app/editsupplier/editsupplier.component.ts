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
	selector: 'app-editsupplier',
	templateUrl: './editsupplier.component.html',
	styleUrls: ['./editsupplier.component.css']
})
export class EditsupplierComponent implements OnInit {
	supplierForm: FormGroup;
	closeResult: string;
	@Input() public supplierId;
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
		this.editSupplier();
		this.getStates();
		this.supplierForm = this.formBuilder.group({
			supplier_id: new FormControl('', Validators.required),
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

	editSupplier() {
		let suppliers_id = this.supplierId;
		console.log(suppliers_id);
		this.supplierService.getSupplierDetailById(suppliers_id).subscribe(
			data => {
				let productbrand_details = data['data'][0];
				console.log(productbrand_details);
				this.supplierForm = this.formBuilder.group({
					supplier_name: [productbrand_details.supplier_name],
					contact_name: [productbrand_details.contact_name],
					phone_no: [productbrand_details.phone_no],
					email: [productbrand_details.email],
					mobile: [productbrand_details.mobile],
					fax: [productbrand_details.fax],
					address: [productbrand_details.address],
					suburb: [productbrand_details.suburb],
					postcode: [productbrand_details.postcode],
					state: [productbrand_details.state],
					supplier_id: [suppliers_id]
				});
			},
			error => {
				console.log('some error occured');
			}
		);
	}

	public updateSupplier(): any {
		this.submitted = true;
		let supplier_data = this.supplierForm.value;
		console.log(supplier_data);
		let data = {
			supplier_id: supplier_data.supplier_id,
			supplier_name: supplier_data.supplier_name || '',
      brand_name: supplier_data.brand_name || '',
      contact_name: supplier_data.contact_name || '',
      phone_no: supplier_data.phone_no || '',
      email: supplier_data.email || '',
      mobile: supplier_data.mobile || '',
      fax: supplier_data.fax || '',
      address: supplier_data.address || '',
      suburb: supplier_data.suburb || '',
      postcode: supplier_data.postcode || '',
      state: supplier_data.state || '',
		};
		console.log(data);
		this.supplierService.editSupplier(data).subscribe(data => {
				console.log(data);
				this.toastr.successToastr('Supplier Updated Successfully');
				this.router.navigate(['/admin']);
				this.activeModal.close();
				this.ngOnInit();
			}, error => {
				console.log('some error occured');
				this.toastr.errorToastr('Some error occured', 'Oops!');
			});
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
