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
	selector: 'app-editproductbrand',
	templateUrl: './editproductbrand.component.html',
	styleUrls: ['./editproductbrand.component.css']
})
export class EditproductbrandComponent implements OnInit {
	productbrandForm: FormGroup;
	closeResult: string;
	@Input() public productbrandId;
	submitted = false;
	levelid: any;
	public empLevelNames: any;
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
		this.editProductBrand();
		this.productbrandForm = this.formBuilder.group({
			brand_name: new FormControl('', Validators.required),
			product_brand_id: new FormControl('', Validators.required)
		});
	}

	editProductBrand() {
		let productId = this.productbrandId;
		console.log(productId);
		this.productbrandService.getProductBrandById(productId).subscribe(
			data => {
				let productbrand_details = data['data'][0];
				console.log(productbrand_details);
				this.productbrandForm = this.formBuilder.group({
					brand_name: [productbrand_details.brand_name],
					product_brand_id: [productId]
				});
			},
			error => {
				console.log('some error occured');
			}
		);
	}

	public updateProductbrand(): any {
		this.submitted = true;
		let productbrand_data = this.productbrandForm.value;
		console.log(productbrand_data);
		let data = {
			product_brand_id: productbrand_data.product_brand_id,
			brand_name: productbrand_data.brand_name || ''
		};
		console.log(data);
		this.productbrandService.editProductBrand(data).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr('Product Brand Updated Successfully');
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

	closeModal(sendData) {
		this.activeModal.close(sendData);
	}
}
