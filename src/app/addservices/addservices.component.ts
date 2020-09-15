import { AddservicesService } from './addservices.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { JwtService } from 'src/app/login/jwt.service';
import { AdminService } from 'src/app/admin/admin.service';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';

@Component({
	selector: 'app-addservices',
	templateUrl: './addservices.component.html',
	styleUrls: ['./addservices.component.css']
})
export class AddservicesComponent implements OnInit {
	serviceForm: FormGroup;
	show = false;
	submitted = false;
	public serviceCats: any;
	data2: string = '0';
	public arrayColors: any = {
		color2: '#e920e9'
	};
	public color2: string = '#e920e9';
	constructor(
		private SpinnerService: NgxSpinnerService,
		private formBuilder: FormBuilder,
		public router: Router,
		private _route: ActivatedRoute,
		public toastr: ToastrManager,
		public addservicesService: AddservicesService,
		private jwtService: JwtService,
		private adminService: AdminService,
		private cpService: ColorPickerService
	) {
		this.serviceForm = this.formBuilder.group({
			service_cat_id: [],
			service_name: ['', Validators.required],
			price: ['', [Validators.required]],
			display_color: ['', Validators.required],
			barcode: ['', [Validators.required]],
			duration: ['', [Validators.required]],
			duration_minutes: ['', [Validators.required]],
			process_duration: ['', [Validators.required]],
			process_duration_minutes: ['', [Validators.required]],
			override_price: [''],
			override_duration: [''],
			loyalty_point: [''],
			loyalty_redeem: [''],
			allow_multiple_client: [''],
			show_online: [''],
			max_client: ['', Validators.required],
			online_name: ['', Validators.required],
			require_resource: [''],
			gst_free: [''],
			options: ['']
		});
	}

	ngOnInit() {
		this.getServiceCatByMerchantId();
		this.SpinnerService.show();
		setTimeout(() => {
			this.SpinnerService.hide();
		}, 5000);
	}

	get f() {
		return this.serviceForm.controls;
	}

	onSubmit() {
		this.submitted = true;
		if (!this.serviceForm.invalid) {
			let service_data = this.serviceForm.value;
			console.log(service_data);
			let duration = service_data.duration
				? service_data.duration + ':' + service_data.duration_minutes + ':00'
				: '00:00:00';
			let process_duration = service_data.process_duration
				? service_data.process_duration + ':' + service_data.process_duration_minutes + ':00'
				: '00:00:00';
			let data = {
				service_name: service_data.service_name || '',
				price: service_data.price || '',
				display_color: service_data.display_color || '',
				barcode: service_data.barcode || '',
				duration: duration,
				process_duration: process_duration,
				loyalty_point: service_data.loyalty_point || '',
				loyalty_redeem: service_data.loyalty_redeem || '',
				allow_multiple_client: service_data.allow_multiple_client == true ? 1 : 0,
				show_online: service_data.show_online == true ? 1 : 0,
				max_client: service_data.max_client || '',
				online_name: service_data.online_name || '',
				require_resource: service_data.require_resource == true ? 1 : 0,
				gst_free: service_data.gst_free == true ? 1 : 0,
				service_cat_id: service_data.service_cat_id,
				group_service: service_data.options == true ? 1 : 0
			};
			console.log(data);
			this.addservicesService.createService(data).subscribe(
				apiResponse => {
					if (apiResponse.code === 200) {
						this.toastr.successToastr('Service Added Successfully');
						this.router.navigate(['/admin']);
					} else {
						console.log('Hello');
						this.toastr.errorToastr(apiResponse.message);
					}
				}
				// er => {
				// 	console.log(er.error.errors['order'][0]);
				// 	console.log(er.error.errors);
				// 	console.log(er.error.errors['order']);
				// 	this.toastr.errorToastr(er.error.errors['order'][0]);
				// }
			);
		}
	}

	onReset() {
		this.submitted = false;
		this.serviceForm.reset();
	}

	public onChangeColor(color: string): void {
		console.log('Color changed:', color);
	}

	public onChangeColorHex8(color: string): string {
		console.log(color);
		this.serviceForm.controls.display_color.setValue(color);
		const hsva = this.cpService.stringToHsva(color, true);

		if (hsva) {
			return this.cpService.outputFormat(hsva, 'rgba', null);
		}

		return '';
	}

	public getServiceCatByMerchantId(): any {
		this.SpinnerService.show();
		this.adminService.getServiceCatByMerchantId({}).subscribe(
			data => {
				console.log(data);
				this.serviceCats = data['data'];

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


}
