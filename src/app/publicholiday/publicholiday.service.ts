import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { JwtService } from 'src/app/login/jwt.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class PublicholidayService {
	public session_token: any;
	constructor(public http: HttpClient, private jwtService: JwtService) {
		this.session_token = this.jwtService.getToken('session_token');
	}
	setHeader() {
		return new HttpHeaders().set('session_token', localStorage.getItem('jwt_token'));
	}

	public addHoliday(data): Observable<any> {
		console.log(data);
		return this.http.post(`${environment.BASE_URL}/addHoliday`, data, {
			headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }).set(
				'SESSION-TOKEN',
				localStorage.getItem('jwt_token')
			)
		});
	}

	public getHolidayDateById(holidayId): any {
		let myResponse = this.http.get(`${environment.BASE_URL}/getHolidayDateById` + '/' + holidayId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(holidayId);
		return myResponse;
	}

	public editHoliday(holidayData): Observable<any> {
		return this.http.post(`${environment.BASE_URL}/editHoliday`, holidayData, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public deleteHoliday(holidayData): any {
		let myResponse = this.http.post(`${environment.BASE_URL}/deleteHoliday`, holidayData, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}
}
