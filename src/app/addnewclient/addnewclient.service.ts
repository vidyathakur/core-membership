import { Injectable } from '@angular/core';
import { JwtService } from 'src/app/login/jwt.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AddnewclientService {
	public session_token: any;
	constructor(public http: HttpClient, private jwtService: JwtService) {
		this.session_token = this.jwtService.getToken('session_token');
	}

	setHeader() {
		return new HttpHeaders().set('session_token', localStorage.getItem('jwt_token'));
	}

	public createClient(data): Observable<any> {
		console.log(data);
		return this.http.post(`${environment.BASE_URL}/createClient`, data, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public getEmplevelByMechantId(data): any {
		let myResponse = this.http.post(`${environment.BASE_URL}/getEmplevelByMechantId `, data, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public getStates(currentCountryId): any {
		let myResponse = this.http.post(`${environment.BASE_URL}/getStates `, currentCountryId);
		console.log(currentCountryId);
		return myResponse;
	}

	public getClientDetailsByMerchantID(): any {
		let myResponse = this.http.post(`${environment.BASE_URL}/getClientDetailsByMerchantID `, {}, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public deleteClient(clientId): any {
		let myResponse = this.http.delete(`${environment.BASE_URL}/deleteClient` + '/' + clientId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public getClientDetails(clientId): any {
		let myResponse = this.http.get(`${environment.BASE_URL}/getClientDetails` + '/' + clientId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public editClient(data): Observable<any> {
		console.log(data);
		return this.http.patch(`${environment.BASE_URL}/editClient`, data, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}
}
