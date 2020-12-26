import { Injectable } from '@angular/core';
import { JwtService } from 'src/app/login/jwt.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
	providedIn: 'root'
})
export class BuildMembershipService {
	public session_token: any;
	constructor(public http: HttpClient, private jwtService: JwtService) {
		this.session_token = this.jwtService.getToken('session_token');
	}

	setHeader() {
		return new HttpHeaders().set('session_token', localStorage.getItem('jwt_token'));
	}

	public getServiceByMerchantId(): any {
		let myResponse = this.http.get(`${environment.BASE_URL}/getServiceByMerchantId `, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public isClientExists(data): Observable<any> {
		console.log(data);
		return this.http.post(`${environment.BASE_URL}/isClientExists`, data, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public getMerchantById(merchantId): any {
		let myResponse = this.http.get(`${environment.BASE_URL}/getMerchantById` + '/' + merchantId);
		console.log(merchantId);
		return myResponse;
	}
}
