import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { JwtService } from 'src/app/login/jwt.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ServiceresourceService {
	public session_token: any;

	constructor(public http: HttpClient, private jwtService: JwtService) {
		this.session_token = this.jwtService.getToken('session_token');
	}
	setHeader() {
		return new HttpHeaders().set('session_token', localStorage.getItem('jwt_token'));
	}

	public addServiceResource(data): Observable<any> {
		console.log(data);
		return this.http.post(`${environment.BASE_URL}/addServiceResource`, data, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public getResource(): any {
		let myResponse = this.http.get(`${environment.BASE_URL}/getResource `, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public getServiceResourceByServiceId(serviceresourceId): Observable<any> {
		console.log(serviceresourceId);
		return this.http.get(`${environment.BASE_URL}/getServiceResourceByServiceId` + '/' + serviceresourceId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public getServiceResourceById(serviceresourcesId): Observable<any> {
		console.log(serviceresourcesId);
		return this.http.get(`${environment.BASE_URL}/getServiceResourceById` + '/' + serviceresourcesId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public editServiceResource(serviceResourceData): Observable<any> {
		return this.http.patch(`${environment.BASE_URL}/editServiceResource`, serviceResourceData, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public deleteServiceResource(serviceresourcesId): any {
		let myResponse = this.http.delete(`${environment.BASE_URL}/deleteServiceResource` + '/' + serviceresourcesId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}
}
