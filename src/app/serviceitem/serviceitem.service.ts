import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { JwtService } from 'src/app/login/jwt.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
	providedIn: 'root'
})
export class ServiceitemService {
	public session_token: any;

	constructor(public http: HttpClient, private jwtService: JwtService) {
		this.session_token = this.jwtService.getToken('session_token');
	}
	setHeader() {
		return new HttpHeaders().set('session_token', localStorage.getItem('jwt_token'));
	}

	public getServiceByMerchantIdByGroup(): any {
		let myResponse = this.http.get(`${environment.BASE_URL}/getServiceByMerchantIdByGroup `, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public addServiceItem(data): Observable<any> {
		console.log(data);
		return this.http.post(`${environment.BASE_URL}/addServiceItem`, data, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public getServiceItemByServiceId(serviceItemId): any {
		let myResponse = this.http.get(
			`${environment.BASE_URL}/getServiceItemByServiceId` + '/' + serviceItemId + '?',
			{
				headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
			}
		);
		console.log(serviceItemId);
		return myResponse;
	}

	public getServiceItem(serviceitemId): Observable<any> {
		console.log(serviceitemId);
		return this.http.get(`${environment.BASE_URL}/getServiceItem` + '/' + serviceitemId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public editServiceItem(serviceitemData): Observable<any> {
		return this.http.patch(`${environment.BASE_URL}/editServiceItem`, serviceitemData, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public deleteServiceItem(serviceitemId): any {
		let myResponse = this.http.delete(`${environment.BASE_URL}/deleteServiceItem` + '/' + serviceitemId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}
}
