import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class SignupService {
	constructor(public http: HttpClient) {}
	public getUserInfoFromLocalstorage = () => {
		return JSON.parse(localStorage.getItem('userInfo'));
	};

	public setUserInfoInLocalStorage = data => {
		localStorage.setItem('userInfo', JSON.stringify(data));
	};

	public signupFunction(data): Observable<any> {
		return this.http.post(`${environment.BASE_URL}/createMerchant`, data);
	} // end of signupFunction function.

	public getCountry(): any {
		const myResponse = this.http.post(`${environment.BASE_URL}/getCountry`, {});
		console.log(myResponse);
		return myResponse;
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
