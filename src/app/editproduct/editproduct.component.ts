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
	selector: 'app-editproduct',
	templateUrl: './editproduct.component.html',
	styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
	productForm: FormGroup;
	submitted = false;
	public productBrands: any;
	public suppliers: any;
	constructor(
		private SpinnerService: NgxSpinnerService,
		private modalService: NgbModal,
		public router: Router,
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		private _route: ActivatedRoute,
		public productbrandService: ProductbrandService,
		public productservice: ProductService,
		public supplierService: SupplierService
	) {}

	ngOnInit() {
		this.getProduct();
		this.getSupplier();
		this.getProductbrand();
		this.productForm = this.formBuilder.group({
			product_id: [],
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
			loyalty_point_redeeme:['', [Validators.pattern('^[0-9]*$')]],
			barcode: [''],
			salon_use: [''],
			tax_free: ['']
		});
	}

	public updateProduct(): any {
		this.submitted = true;
		let product_data = this.productForm.value;
		console.log(product_data);
		let data = {
			product_id: product_data.product_id,
			product_name: product_data.product_name || '',
			min_qty: product_data.min_qty || 0,
			max_qty: product_data.max_qty || 0,
			qty: product_data.qty || '',
			retail_pice: product_data.retail_pice,
			wholesale_price: product_data.wholesale_price || 0,
			supplier_code: product_data.supplier_code || '',
			loyalty_point: product_data.loyalty_point || 0,
			loyalty_point_redeeme:product_data.loyalty_point_redeeme || 0,
			barcode: product_data.barcode || '',
			salon_use: product_data.salon_use,
			tax_free: product_data.tax_free,
			brand_id: product_data.brand_id,
      supplier_id: product_data.supplier_id
		};
		console.log(data);
		this.productservice.editProduct(data).subscribe(data => {
				console.log(data);
				this.toastr.successToastr(' Product Updated Successfully');
				this.jwtService.setToken('tabId', 'products-tab');
				this.router.navigate(['/admin']);
			}, er => {
				this.toastr.errorToastr('some error occured');
			});
	}
	get f() {
		return this.productForm.controls;
	}
	onCancel() {
		this.jwtService.setToken('tabId', 'products-tab');
		this.router.navigate(['/admin']);
	}

	getProduct() {
		let productId = this._route.snapshot.paramMap.get('id');
		this.productservice.getProductById(productId).subscribe(
			data => {
				let product_details = data['data'][0];
				this.productForm = this.formBuilder.group({
					product_id: [productId],
					brand_id: [product_details.brand_id, Validators.required],
					supplier_id: [product_details.supplier_id, Validators.required],
					product_name: [product_details.product_name, Validators.required],
					min_qty: [product_details.min_qty],
					max_qty: [product_details.max_qty],
					qty: [product_details.qty, Validators.required],
					retail_pice: [product_details.retail_pice, Validators.required],
					wholesale_price: [product_details.wholesale_price],
					supplier_code: [product_details.supplier_code],
					loyalty_point: [product_details.loyalty_point],
					loyalty_point_redeeme:[product_details.loyalty_point_redeeme],
					barcode: [product_details.barcode],
					salon_use: [product_details.salon_use],
					tax_free: [product_details.tax_free]
				});
				console.log(this.productForm);
			},
			error => {
				console.log('some error occurred');
			}
		);
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
				this.toastr.errorToastr('some error occurred');
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
				console.log('some error occurred');
				this.toastr.errorToastr('some error occurred');
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
