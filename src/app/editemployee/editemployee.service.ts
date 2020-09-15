import { Injectable } from '@angular/core';
import { JwtService } from 'src/app/login/jwt.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class EditemployeeService {
	public session_token: any;
	constructor(public http: HttpClient, private jwtService: JwtService) {
		this.session_token = this.jwtService.getToken('session_token');
	}
	setHeader() {
		return new HttpHeaders().set('session_token', localStorage.getItem('jwt_token'));
	}

	public getEmployeesDetailsById(currentEmpId): any {
		let myResponse = this.http.post(`${environment.BASE_URL}/getEmployeesDetailsById `, currentEmpId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(currentEmpId);
		return myResponse;
	}

	public editEmployee(employeeData): any {
		let myResponse = this.http.post(`${environment.BASE_URL}/editEmployee `, employeeData, {
			headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }).set(
				'SESSION-TOKEN',
				localStorage.getItem('jwt_token')
			)
		});
		console.log(myResponse);
		return myResponse;
	}
	public getCountry(): any {
		const myResponse = this.http.post(`${environment.BASE_URL}/getCountry`, {});
		console.log(myResponse);
		return myResponse;
	}

	public getEmplevelByMechantId(data): any {
		let myResponse = this.http.post(`${environment.BASE_URL}/getEmplevelByMechantId `, data, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}
	public getStates(data): any {
		let myResponse = this.http.post(`${environment.BASE_URL}/getStates `, data);
		console.log(myResponse);
		return myResponse;
	}
}
