import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AddnewclientService } from 'src/app/addnewclient/addnewclient.service';
import { AddemployeesService } from 'src/app/addemployees/addemployees.service';
import { AdminService } from 'src/app/admin/admin.service';

@Component({
	selector: 'app-editclient',
	templateUrl: './editclient.component.html',
	styleUrls: ['./editclient.component.css']
})
export class EditclientComponent implements OnInit {
	clientForm: FormGroup;
	submitted = false;
	public stateList: any;
	public clients: any;
	//myModel = true;
	public clientCats = [];
	selectedValue = '0';
	public currentEmployees: any;
	constructor(
		private formBuilder: FormBuilder,
		public router: Router,
		private _route: ActivatedRoute,
		public toastr: ToastrManager,
		public addnewclientService: AddnewclientService,
		public addemployeesService: AddemployeesService,
		private jwtService: JwtService,
		private adminService: AdminService
	) {
		this.clientForm = this.formBuilder.group({
			f_name: new FormControl('', Validators.required),
			surname: new FormControl(''),
			mobile: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
			twitter: new FormControl(''),
			phone_no: new FormControl(''),
			email: new FormControl('', [Validators.required, Validators.email]),
			gender: new FormControl('', Validators.required),
			birthday: new FormControl(),
			employee_id: new FormControl(),
			referred_by: new FormControl('',[Validators.pattern('^[0-9]*$')]),
			refferral_type_id: new FormControl(''),
			barcode_no: new FormControl(''),
			address: new FormControl(''),
			suburb: new FormControl(''),
			postcode: new FormControl(''),
			state_id: new FormControl(),
			comments: new FormControl(''),
			appoints_sms: new FormControl(''),
			appoints_email: new FormControl(''),
			promote_sms: new FormControl(''),
			promote_email: new FormControl(''),
			online_booking: new FormControl(''),
			loyalty_point: new FormControl(''),
			client_cat_ids: this.formBuilder.array([]),
			client_id: new FormControl()
		});
	}

	ngOnInit(): void {
		this.getClientDetailsByMerchantID();
		this.getEmployees();
		this.getStates();
		let id = this._route.snapshot.paramMap.get('id');

			this.adminService.getClientCatDetailsByMerchantId({}).subscribe(data => {
					console.log(data);
					this.clientCats = data['data'];
				}, error => {
					console.log('some error occurred');
					this.toastr.errorToastr('some error occurred');
			});

		this.addnewclientService.getClientDetails(id).subscribe(
			data => {
				let client_details = data['data'];
				console.log(client_details);
				let birthday_data = client_details.birthday ? client_details.birthday.split('-') : ['0', '0', '0'];
				console.log(birthday_data);
				this.clientForm = this.formBuilder.group({
					f_name: [client_details.f_name, Validators.required],
					surname: [client_details.surname],
					mobile: [
						client_details.mobile,
						[Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]
					],
					twitter: [client_details.twitter],
					phone_no: [client_details.phone_no],
					email: [client_details.email, [Validators.required, Validators.email]],
					gender: [client_details.gender, Validators.required],
					birthday: [
						{
							year: Number(birthday_data[0]),
							month: Number(birthday_data[1]),
							day: Number(birthday_data[2])
						}
					],
					employee_id: [client_details.employee_id],
					referred_by: [client_details.referred_by],
					refferral_type_id: [client_details.refferral_type_id],
					barcode_no: [client_details.barcode_no],
					address: [client_details.address],
					suburb: [client_details.suburb],
					postcode: [client_details.postcode],
					state_id: [client_details.state_id],
					comments: [client_details.comments],
					appoints_sms: [client_details.appoints_sms],
					appoints_email: [client_details.appoints_email],
					promote_sms: [client_details.promote_sms],
					promote_email: [client_details.promote_email],
					online_booking: [client_details.online_booking],
					loyalty_point: [client_details.loyalty_point],
					client_id: [id],
					client_cat_ids: this.formBuilder.array([])
				});
				let aa = [];
				if(client_details.client_cats.length > 0){
					for(let i in client_details.client_cats){
						let id = client_details.client_cats[i].pivot.cat_id;
						aa.push(id);
					}
				}
				let tagsArray = [];
				let cat_data = this.clientCats;
				for(let k in cat_data){
					let object_data = cat_data[k];
				  if(aa.includes(cat_data[k].id)){						
						tagsArray.push(cat_data[k]);
					}
				}
				this.clientForm.setControl('client_cat_ids', this.formBuilder.array(tagsArray || []));
			},
			error => {
				console.log('some error occurred');
			}
		);

		
	
	}
	get f() {
		return this.clientForm.controls;
	}

	public updateClient(): any {
		this.submitted = true;
		let client_data = this.clientForm.value;
		console.log(client_data);
		let birthday = client_data.birthday
			? client_data.birthday.year + '/' + client_data.birthday.month + '/' + client_data.birthday.day
			: '';
		let data = {
			client_id: client_data.client_id,
			f_name: client_data.f_name || '',
			state_id: client_data.state_id || '',
			surname: client_data.surname || '',
			suburb: client_data.suburb || '',
			mobile: client_data.mobile || '',
			gender: client_data.gender || '',
			phone_no: client_data.phone_no || '',
			email: client_data.email || '',
			birthday: birthday || '',
			address: client_data.address || '',
			twitter: client_data.twitter || '',
			postcode: client_data.postcode || '',
			comments: client_data.comments || '',
			barcode_no: client_data.barcode_no || '',
			referred_by: client_data.referred_by || '',
			refferral_type_id: client_data.refferral_type_id || '',
			appoints_sms: client_data.appoints_sms,
			appoints_email: client_data.appoints_email,
			promote_sms: client_data.promote_sms,
			promote_email: client_data.promote_email,
			online_booking: client_data.online_booking,
			loyalty_point: client_data.loyalty_point || '',
			employee_id: client_data.employee_id || '',
			client_cat_ids: client_data.client_cat_ids
		};
		
		this.addnewclientService.editClient(data).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Client Updated Successfully');
				this.jwtService.setToken('tabId', 'clients-tab');
				this.router.navigate(['/admin']);
			},
			er => {
				this.toastr.errorToastr('some error occurred');
			}
		);
	}

	public getClientDetailsByMerchantID(): any {
		this.addnewclientService.getClientDetailsByMerchantID({}).subscribe(
			data => {
				console.log(data);
				this.clients = data['data'];
			},
			error => {
				console.log('some error occurred');
				this.toastr.errorToastr('some error occurred');
			}
		);
	}

	public getEmployees(): any {
		this.adminService.getEmpDetailByMerchantId({}).subscribe(
			data => {
				console.log(data);
				this.currentEmployees = data['data'];
			},
			error => {
				console.log('some error occurred');
				this.toastr.errorToastr('some error occurred');
			}
		);
	}

	

	onChange(clientCat: any, isChecked: boolean) {
		const control = <FormArray>this.clientForm.controls.client_cat_ids;
		if (isChecked) {
			control.push(new FormControl(clientCat));
		} else {
			const index = control.controls.findIndex(x => x.value === clientCat);
			control.removeAt(index);
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
				console.log('some error occurred');
				this.toastr.errorToastr('some error occurred');
			}
		);
	}

	goToClient() {
		this.jwtService.setToken('tabId', 'clients-tab');
		this.router.navigate(['/admin']);
	}
	onCancel() {
		this.jwtService.setToken('tabId', 'clients-tab');
		this.router.navigate(['/admin']);
	}
}
