import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { JwtService } from 'src/app/login/jwt.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ServicelevelService {
	public session_token: any;

	constructor(public http: HttpClient, private jwtService: JwtService) {
		this.session_token = this.jwtService.getToken('session_token');
	}
	setHeader() {
		return new HttpHeaders().set('session_token', localStorage.getItem('jwt_token'));
	}

	public addServiceEmpLevel(data): Observable<any> {
		console.log(data);
		return this.http.post(`${environment.BASE_URL}/addServiceEmpLevel`, data, {
			headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }).set(
				'SESSION-TOKEN',
				localStorage.getItem('jwt_token')
			)
		});
	}

	public getServiceEmpLevelByServiceId(servicelevelId): Observable<any> {
		console.log(servicelevelId);
		return this.http.get(`${environment.BASE_URL}/getServiceEmpLevelByServiceId` + '/' + servicelevelId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public getServiceEmpLevel(serviceEmplevelId): Observable<any> {
		console.log(serviceEmplevelId);
		return this.http.get(`${environment.BASE_URL}/getServiceEmpLevel` + '/' + serviceEmplevelId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public editServicelevel(serviceEmplevelData): Observable<any> {
		return this.http.patch(`${environment.BASE_URL}/editServicelevel`, serviceEmplevelData, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public deleteServicelevel(servicelevelId): any {
		let myResponse = this.http.delete(`${environment.BASE_URL}/deleteServicelevel` + '/' + servicelevelId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}
	
}
