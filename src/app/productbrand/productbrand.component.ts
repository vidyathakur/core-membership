import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { ProductbrandService } from 'src/app/productbrand/productbrand.service';

@Component({
	selector: 'app-productbrand',
	templateUrl: './productbrand.component.html',
	styleUrls: ['./productbrand.component.css']
})
export class ProductbrandComponent implements OnInit {
	productbrandForm: FormGroup;
	closeResult: string;
	submitted = false;
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
		public productbrandService: ProductbrandService
	) {}

	ngOnInit() {
		this.productbrandForm = this.formBuilder.group({
			brand_name: new FormControl('', Validators.required)
		});
	}
	get f() {
		return this.productbrandForm.controls;
	}

	onSubmit() {
		this.submitted = true;
		if (!this.productbrandForm.invalid) {
			let productbrand_data = this.productbrandForm.value;
			console.log(productbrand_data);
			let data = {
				brand_name: productbrand_data.brand_name
			};
			console.log(data);
			this.productbrandService.createProductBrand(data).subscribe(apiResponse => {
				if (apiResponse.code === 200) {
					this.toastr.successToastr('Product Brand Added Successfully');
					this.closeModal();
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
