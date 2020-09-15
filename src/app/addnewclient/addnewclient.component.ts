import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-addnewclient',
	templateUrl: './addnewclient.component.html',
	styleUrls: ['./addnewclient.component.css']
})
export class AddnewclientComponent implements OnInit {
	myForm: FormGroup;
	public f_name;
	public surname;
	public twitter: string;
	public mobile: string;
	public gender: string;
	public birthday: string;
	public address: string;
	public postcode: string;
	public appoints_sms: string;
	public appoints_email: string;
	public promote_sms: string;
	public promote_email: string;

	genders = [{ id: 1, name: 'Email' }, { id: 2, name: 'Phone' }];

	constructor() {
		// this.myForm = new FormGroup({
		// 	f_name: new FormControl('', Validators.required),
		// 	surname: new FormControl('', Validators.required),
		// 	twitter: new FormControl('', Validators.required),
		// 	mobile: new FormControl('', Validators.required),
		// 	gender: new FormControl('', Validators.required),
		// 	birthday: new FormControl('', Validators.required),
		// 	address: new FormControl('', Validators.required),
		// 	postcode: new FormControl('', Validators.required),
		// 	appoints_sms: new FormControl('', Validators.required),
		// 	appoints_email: new FormControl('', Validators.required),
		// 	promote_sms: new FormControl('', Validators.required),
		// 	promote_email: new FormControl('', Validators.required)
		// });
	}

	ngOnInit(): void {}

	public createClient(): any {
		// let clientData = {
		// 	f_name: this.f_name,
		// 	surname: this.surname,
		// 	twitter: this.twitter,
		// 	mobile: this.mobile,
		// 	gender: this.gender,
		// 	birthday: this.birthday,
		// 	address: this.address,
		// 	postcode: this.postcode,
		// 	appoints_sms: this.appoints_sms,
		// 	appoints_email: this.appoints_email,
		// 	promote_sms: this.promote_sms,
		// 	promote_email: this.promote_email
		// };
		// console.log(clientData);
	}
}
