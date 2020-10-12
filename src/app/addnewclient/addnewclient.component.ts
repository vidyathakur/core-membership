import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AddnewclientService } from 'src/app/addnewclient/addnewclient.service';
import { AddemployeesService } from 'src/app/addemployees/addemployees.service';
import { AdminService } from 'src/app/admin/admin.service';

@Component({
	selector: 'app-addnewclient',
	templateUrl: './addnewclient.component.html',
	styleUrls: ['./addnewclient.component.css']
})
export class AddnewclientComponent implements OnInit {
	clientForm: FormGroup;
	submitted = false;
	public stateList: any;
	//myModel = true;
	public clientCats = [];
	selected = [];
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
	) {}

	ngOnInit(): void {
		this.getClientCategories();
		this.getEmployees();
		this.getStates();
		this.clientForm = this.formBuilder.group({
			f_name: new FormControl('', Validators.required),
			surname: new FormControl(''),
			mobile: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
			twitter: new FormControl(''),
			phone_no: new FormControl(''),
			email: new FormControl('', [Validators.required, Validators.email]),
			gender: new FormControl(''),
			birthday: new FormControl(''),
			employee_id: new FormControl(''),
			referred_by: new FormControl(''),
			refferral_type_id: new FormControl(''),
			barcode_no: new FormControl(''),
			address: new FormControl(''),
			suburb: new FormControl(''),
			postcode: new FormControl(''),
			state_id: new FormControl(''),
			comments: new FormControl(''),
			appoints_sms: new FormControl(''),
			appoints_email: new FormControl(''),
			promote_sms: new FormControl(''),
			promote_email: new FormControl(''),
			online_booking: new FormControl(''),
			loyalty_point: new FormControl(''),
			client_cat_ids: new FormControl('')
		});
	}
	get f() {
		return this.clientForm.controls;
	}
	onSubmit() {
		this.submitted = true;
		if (!this.clientForm.invalid) {
			let client_data = this.clientForm.value;
			let birthday = client_data.birthday
				? client_data.birthday.year + '/' + client_data.birthday.month + '/' + client_data.birthday.day
				: '';
				if(this.selected.length > 0){
					client_data.client_cat_ids = [];
					let cat_id = this.selected;
					console.log(cat_id);
				
					for(let i in cat_id){
						  let object = {};
							object['id'] = cat_id[i].id;
							console.log(object);
							client_data.client_cat_ids.push(object);
					}
				}
			let data = {
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
				postcode: client_data.postcode || '',
				comments: client_data.comments || '',
				referred_by: client_data.referred_by || '',
				refferral_type_id: client_data.state_id || '',
				appoints_sms: client_data.appoints_sms || true ? 1 : 0,
				appoints_email: client_data.appoints_email || true ? 1 : 0,
				promote_sms: client_data.promote_sms || true ? 1 : 0,
				promote_email: client_data.promote_email || true ? 1 : 0,
				online_booking: client_data.online_booking || '',
				loyalty_point: client_data.loyalty_point || '',
				employee_id: client_data.employee_id,
				client_cat_ids: client_data.client_cat_ids || ''
			};
			console.log(data);
			this.addnewclientService.createClient(data).subscribe(apiResponse => {
				if (apiResponse.code === 200) {
					this.toastr.successToastr('Client Added Successfully');
					this.jwtService.setToken('tabId', 'clients-tab');
					this.router.navigate(['/admin']);
				} else {
					console.log('Hello');
					this.toastr.errorToastr(apiResponse.errors);
				}
			});
		}
	}

	public getEmployees(): any {
		this.adminService.getEmpDetailByMerchantId({}).subscribe(
			data => {
				console.log(data);
				this.currentEmployees = data['data'];
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}

	public getClientCategories(): any {
		this.adminService.getClientCatDetailsByMerchantId({}).subscribe(
			data => {
				console.log(data);
				this.clientCats = data['data'];
				if (data['data']) {
					data['data'].forEach((item, key) => {
						let object = {};
						object['id'] = item.id
						this.selected.push(object);
					});
				}
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}

	checked(item) {
		if (this.clientCats.indexOf(item) != -1) {
			return true;
		}
	}

	checkBoxChanged(checked, item) {
		if (checked) {
			this.selected.push(item);
		} else {
			this.selected.splice(this.selected.indexOf(item), 1);
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

	goToClient() {
		this.jwtService.setToken('tabId', 'clients-tab');
		this.router.navigate(['/admin']);
	}
	onCancel() {
		this.jwtService.setToken('tabId', 'clients-tab');
		this.router.navigate(['/admin']);
	}
}
