import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtService } from 'src/app/login/jwt.service';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	constructor(public http: HttpClient, private jwtService: JwtService) {}

	setHeader() {
		return new HttpHeaders().set('session_token', localStorage.getItem('jwt_token'));
	}


	public signinFunction(data): Observable<any> {
		localStorage.setItem('jwt_token', data.session_token);
		return this.http.post(`${environment.BASE_URL}/login`, data);
	}

	public getMerchant(data): Observable<any> {
		return this.http.post(`${environment.BASE_URL}/getMerchant`, data, 
		{
				headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
			}
			);
		}

	private handleError(err: HttpErrorResponse) {
		let errorMessage = '';

		if (err.error instanceof Error) {
			errorMessage = `An error occurred: ${err.error.message}`;
		} else {
			errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
		} // end condition *if

		console.error(errorMessage);

		return Observable.throw(errorMessage);
	} // END handleError
}
