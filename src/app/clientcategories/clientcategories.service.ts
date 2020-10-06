import { Injectable } from '@angular/core';
import { JwtService } from 'src/app/login/jwt.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ClientcategoriesService {
	public session_token: any;
	constructor(public http: HttpClient, private jwtService: JwtService) {
		this.session_token = this.jwtService.getToken('session_token');
	}
	setHeader() {
		return new HttpHeaders().set('session_token', localStorage.getItem('jwt_token'));
	}

	public addClientCat(data): Observable<any> {
		console.log(data);
		return this.http.post(`${environment.BASE_URL}/addClientCat`, data, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public getClientCatDetails(clientCatData): any {
		let myResponse = this.http.post(`${environment.BASE_URL}/getClientCatDetails`, clientCatData, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(clientCatData);
		return myResponse;
	}

	public editClientCat(clientCatData): Observable<any> {
		return this.http.post(`${environment.BASE_URL}/editClientCat`, clientCatData, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public deleteClientCat(clientcatData): any {
		let myResponse = this.http.post(`${environment.BASE_URL}/deleteClientCat`, clientcatData, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}
}
