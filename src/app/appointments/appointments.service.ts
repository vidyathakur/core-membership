import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from 'src/app/login/jwt.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AppointmentsService {
	public session_token: any;
	constructor(public http: HttpClient, private jwtService: JwtService) {
		this.session_token = this.jwtService.getToken('session_token');
	}
	setHeader() {
		return new HttpHeaders().set('session_token', localStorage.getItem('jwt_token'));
	}

	public createAppointment(data): Observable<any> {
		console.log(data);
		return this.http.post(`${environment.BASE_URL}/createAppointment`, data, {
			headers: new HttpHeaders().set(
				'SESSION-TOKEN',
				localStorage.getItem('jwt_token')
			)
		});
	}

	public getEmpDetailByMerchantId(data): any {
		let myResponse = this.http.post(`${environment.BASE_URL}/getEmpDetailByMerchantId `, data, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public getOpeningDay(): any {
		let myResponse = this.http.get(`${environment.BASE_URL}/getOpeningDay `, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}
}
