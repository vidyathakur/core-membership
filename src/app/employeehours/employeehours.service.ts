import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { JwtService } from 'src/app/login/jwt.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
	providedIn: 'root'
})
export class EmployeehoursService {
	public session_token: any;

	constructor(public http: HttpClient, private jwtService: JwtService) {
		this.session_token = this.jwtService.getToken('session_token');
	}
	setHeader() {
		return new HttpHeaders().set('session_token', localStorage.getItem('jwt_token'));
	}



	public getEmpRosterHoursByMechantId(): any {
		let myResponse = this.http.get(`${environment.BASE_URL}/getEmpRosterHoursByMechantId `, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public getEmpRosterHoursByEmpId(emprosterId): Observable<any> {
		console.log(emprosterId);
		return this.http.get(`${environment.BASE_URL}/getEmpRosterHoursByEmpId` + '/' + emprosterId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public editEmpRosterHours(emproasterData): Observable<any> {
		return this.http.patch(`${environment.BASE_URL}/editEmpRosterHours`, emproasterData, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public addEmpRosterHours(data): Observable<any> {
		console.log(data);
		if (data.empRosterhours_id) {
			return this.http.patch(`${environment.BASE_URL}/editEmpRosterHours `, data, {
				headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
			});
		} else {
			return this.http.post(`${environment.BASE_URL}/addEmpRosterHours`, data, {
				headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
			});
		}
	}
}
