import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { ProductService } from 'src/app/product/product.service';
import { ProductbrandService } from 'src/app/productbrand/productbrand.service';
import { SupplierService } from 'src/app/supplier/supplier.service';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
	productForm: FormGroup;
	submitted = false;
	public productBrands: any;
	public suppliers:any;
	constructor(
		private SpinnerService: NgxSpinnerService,
		private modalService: NgbModal,
		public router: Router,
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		private _route: ActivatedRoute,
		public productbrandService: ProductbrandService,
		public productService: ProductService,
		public supplierService: SupplierService
	) {}

	ngOnInit() {
		this.getSupplier();
		this.getProductbrand();
		this.productForm = this.formBuilder.group({
			brand_id: ['', Validators.required],
			supplier_id: ['', Validators.required],
			product_name: ['', Validators.required],
			min_qty: [''],
			max_qty: [''],
			qty: ['', Validators.required],
			retail_pice: ['', Validators.required],
			wholesale_price: [''],
			supplier_code: [''],
			loyalty_point: [],
			barcode: [''],
			salon_use: [''],
			tax_free: ['']
		});
	}
	get f() {
		return this.productForm.controls;
	}
	onCancel() {
		this.jwtService.setToken('tabId', 'products-tab');
		this.router.navigate(['/admin']);
	}

	onSubmit() {
		this.submitted = true;
		console.log('hello');
		if (!this.productForm.invalid) {
			let product_data = this.productForm.value;
			console.log(product_data);
			let data = {
				product_name: product_data.product_name || '',
				min_qty: product_data.min_qty || '',
				max_qty: product_data.max_qty || '',
				qty: product_data.qty || '',
				retail_pice: product_data.retail_pice || '',
				wholesale_price: product_data.wholesale_price || '',
				supplier_code: product_data.supplier_code || '',
				loyalty_point: product_data.loyalty_point || '',
				barcode: product_data.barcode || '',
				salon_use: product_data.salon_use == true ? 1 : 0,
				tax_free: product_data.tax_free == true ? 1 : 0,
				brand_id: product_data.brand_id,
				supplier_id: product_data.supplier_id
			};
			console.log(data);
			this.productService.createProduct(data).subscribe(apiResponse => {
				if (apiResponse.code === 200) {
					this.toastr.successToastr('Product Added Successfully');
					this.jwtService.setToken('tabId', 'products-tab');
					this.router.navigate(['/admin']);
				} else {
					console.log('Hello');
					this.toastr.errorToastr(apiResponse.message);
				}
			});
		}
	}

	public getSupplier(): any {
		this.SpinnerService.show();
		this.supplierService.getSupplierDetailByMerchantId().subscribe(
			data => {
				console.log(data);
				this.suppliers = data['data'];
				setTimeout(() => {
					this.SpinnerService.hide();
				}, 2000);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}
	public getProductbrand(): any {
		this.SpinnerService.show();
		this.productbrandService.getProductBrandByMerchantId().subscribe(
			data => {
				console.log(data);
				this.productBrands = data['data'];
				setTimeout(() => {
					this.SpinnerService.hide();
				}, 2000);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}
	goToProductBrand() {
		this.jwtService.setToken('tabId', 'brands-tab');
		this.router.navigate(['/admin']);
	}
	goToProduct() {
		this.jwtService.setToken('tabId', 'products-tab');
		this.router.navigate(['/admin']);
	}
}
