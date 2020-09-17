import { AdminService } from './../admin/admin.service';
import { EditserviceService } from './editservice.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AddemployeesService } from 'src/app/addemployees/addemployees.service';
import { JwtService } from 'src/app/login/jwt.service';
import { ColorPickerService } from 'ngx-color-picker';

@Component({
	selector: 'app-editservice',
	templateUrl: './editservice.component.html',
	styleUrls: ['./editservice.component.css']
})
export class EditserviceComponent implements OnInit {
	serviceForm: FormGroup;
	public serviceCats: any;
	submitted = false;
	color2: string = '#e920e9';
	public arrayColors: any = {
		display_color: '#e920e9'
	};
	display_color: string = '#e920e9';
	constructor(
		public router: Router,
		public addemployeesService: AddemployeesService,
		private _route: ActivatedRoute,
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		public editserviceservice: EditserviceService,
		public adminService: AdminService,
		private cpService: ColorPickerService
	) {
		this.serviceForm = this.formBuilder.group({
			service_cat_id: ['', Validators.required],
			service_id: [],
			service_name: ['', Validators.required],
			price: [''],
			display_color: ['', Validators.required],
			barcode: ['', [Validators.required]],
			duration: [''],
			duration_minutes: [''],
			process_duration: [''],
			process_duration_minutes: [''],
			override_price: [''],
			override_duration: [''],
			loyalty_point: [''],
			loyalty_redeem: [''],
			allow_multiple_client: [''],
			show_online: [''],
			max_client: [''],
			online_name: [''],
			require_resource: [''],
			gst_free: [''],
			group_service: ['']
		});
	}

	get f() {
		return this.serviceForm.controls;
	}
	ngOnInit() {
		this.getServiceCatByMerchantId();
		let id = this._route.snapshot.paramMap.get('id');
		this.editserviceservice.getServiceById(id).subscribe(
			data => {
				let service_details = data['data'];
				let duration  = service_details.duration ? (service_details.duration).split(':') : [];
				let process_duration = service_details.process_duration ? (service_details.process_duration).split(':') : [];
				console.log(duration);
				console.log(duration[0]);
				console.log(service_details);
				this.serviceForm = this.formBuilder.group({
					service_name: [service_details.service_name, Validators.required],
					price: [service_details.price],
					display_color: [service_details.display_color, Validators.required],
					barcode: [service_details.barcode, Validators.required],
					duration: [duration[0]],
					duration_minutes: [duration[1]],
					process_duration: [process_duration[0]],
					process_duration_minutes: [process_duration[1]],
					max_client: [service_details.max_client],
					online_name: [service_details.online_name],
					override_price: [service_details.override_price],
					override_duration: [service_details.override_duration],
					loyalty_point: [service_details.loyalty_point],
					loyalty_redeem: [service_details.loyalty_redeem],
					allow_multiple_client: [service_details.allow_multiple_client],
					show_online: [service_details.show_online],
					require_resource: [service_details.require_resource],
					gst_free: [service_details.gst_free],
					service_cat_id: [service_details.service_cat_id,Validators.required],
					service_id: [id],
					group_service:[service_details.group_service]
				});
				console.log(this.serviceForm);
			},
			error => {
				console.log('some error occured');
			}
		);
	}

	public updateService(): any {
		this.submitted = true;
		let service_data = this.serviceForm.value;
		console.log(service_data);
		let data = {
			service_id: service_data.service_id,
			service_name: service_data.service_name || '',
			price: service_data.price || '',
			display_color: service_data.display_color || '',
			barcode: service_data.barcode || '',
			duration: service_data.duration,
			duration_minutes: service_data.duration_minutes || '',
			process_duration: service_data.process_duration || '',
			process_duration_minutes: service_data.process_duration_minutes || '',
			max_client: service_data.max_client || '',
			online_name: service_data.online_name || '',
			override_price: service_data.override_price || '',
			override_duration: service_data.override_duration || '',
			loyalty_point: service_data.loyalty_point || '',
			loyalty_redeem: service_data.loyalty_redeem || '',
			allow_multiple_client: service_data.allow_multiple_client || '',
			show_online: service_data.show_online,
			require_resource: service_data.require_resource,
			gst_free: service_data.gst_free || '',
			options: service_data.options || '',
			service_cat_id: service_data.service_cat_id || ''
		};
		console.log(data);
		this.editserviceservice.editService(data).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Service Updated Successfully');
				this.router.navigate(['/admin']);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('Some error occured', 'Oops!');
			}
		);
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
		this.adminService.getServiceCatByMerchantId({}).subscribe(
			data => {
				console.log(data);
				this.serviceCats = data['data'];
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}
}



