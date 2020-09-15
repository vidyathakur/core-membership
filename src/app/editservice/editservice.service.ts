import { Injectable } from '@angular/core';

import { JwtService } from 'src/app/login/jwt.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
	providedIn: 'root'
})
export class EditserviceService {
	public session_token: any;
	constructor(public http: HttpClient, private jwtService: JwtService) {
		this.session_token = this.jwtService.getToken('session_token');
	}
	setHeader() {
		return new HttpHeaders().set('session_token', localStorage.getItem('jwt_token'));
	}

	public getServiceById(serviceId): any {
		let myResponse = this.http.get(`${environment.BASE_URL}/getServiceById` + '/' + serviceId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(serviceId);
		return myResponse;
	}

	public editService(serviceData): any {
		let myResponse = this.http.patch(`${environment.BASE_URL}/editService`+'?', serviceData, {
			headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }).set(
				'SESSION-TOKEN',
				localStorage.getItem('jwt_token')
			)
		});
		console.log(serviceData);
		return myResponse;
	}
}

