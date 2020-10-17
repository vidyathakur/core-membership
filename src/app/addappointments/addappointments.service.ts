import { Injectable } from '@angular/core';
import { JwtService } from 'src/app/login/jwt.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AddappointmentsService {
	public session_token: any;
	constructor(public http: HttpClient, private jwtService: JwtService) {
		this.session_token = this.jwtService.getToken('session_token');
	}

	setHeader() {
		return new HttpHeaders().set('session_token', localStorage.getItem('jwt_token'));
	}

	public createEmployee(data): Observable<any> {
		console.log(data);
		return this.http.post(`${environment.BASE_URL}/createEmployee`, data, {
			headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }).set(
				'SESSION-TOKEN',
				localStorage.getItem('jwt_token')
			)
		});
	}

	public getServiceByCatId(serviceCatId): any {
		let myResponse = this.http.get(`${environment.BASE_URL}/getServiceByCatId` + '/' + serviceCatId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	// public getTimeSlotForAppointByEmpId(EmpId, date): any {
	// 	let myResponse = this.http.get(
	// 		`${environment.BASE_URL}/getTimeSlotForAppointByEmpId` + '/' + EmpId + `{day} '/' + {month} + '/' + {year}`,
	// 		{
	// 			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
	// 		}
	// 	);
	// 	console.log(date);
	// 	return myResponse;
	// }

	public getTimeSlotForAppointByEmpId(EmpId, start_date): any {
		let myResponse = this.http.get(
			`${environment.BASE_URL}/getTimeSlotForAppointByEmpId` + '/' + EmpId + start_date,
			{
				headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
			}
		);
		console.log(start_date);
		return myResponse;
	}
}
