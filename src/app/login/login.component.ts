import { JwtService } from './jwt.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies';



@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	public email: any;
	public password: any;
	constructor(
		public loginService: LoginService,
		private jwtService: JwtService,
		public router: Router,
		public toastr: ToastrManager
	) {
	if (this.jwtService.getToken('session_token')) {
		this.router.navigate(['/dashboard']);
	}
}

	ngOnInit(): void {}

	public signinFunction() {
		if (!this.email) {
			this.toastr.warningToastr('please enter email');
		} else if (!this.password) {
			this.toastr.warningToastr('please enter password');
		} else {
			let data = { email: this.email, password: this.password};
			this.loginService.signinFunction(data).subscribe(
				apiResponse => {
					if (apiResponse.code === 200) {
						this.toastr.successToastr('Login Successfully');
							this.jwtService.setToken('jwt_token',apiResponse.data.session_token);
							this.router.navigate(['/dashboard']);
							this.loginService.getMerchant({}).subscribe(
								apiResponse =>{
									let merchant_details = apiResponse.data[0];
								  console.log(merchant_details.merchantplan_history[0].merchant_id);
									let merchant_id = merchant_details.merchantplan_history[0].merchant_id || '';
									let full_name = merchant_details.full_name || '';
									let country_id = merchant_details.country_id || '';
									let service_id = merchant_details.service_id || '';
									console.log(country_id);
									console.log(merchant_id);
									console.log(full_name);
									console.log(service_id);
								  this.jwtService.setToken('merchant_id', merchant_id);
								  this.jwtService.setToken('full_name', full_name);
								  this.jwtService.setToken('country_id', country_id);
									this.jwtService.setToken('service_id', service_id);
								}
							);
					  } else {
						this.jwtService.destroyToken();
						this.toastr.errorToastr(apiResponse.message);
					}
				},
				err => {
					this.jwtService.destroyToken();
					this.toastr.errorToastr(err.error['message']);
				}
			);
		}
	}
}
