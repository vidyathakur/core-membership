import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { JwtService } from 'src/app/login/jwt.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class PosClientService {
	public session_token: any;
	constructor(public http: HttpClient, private jwtService: JwtService) {
		this.session_token = this.jwtService.getToken('session_token');
	}
	setHeader() {
		return new HttpHeaders().set('session_token', localStorage.getItem('jwt_token'));
	}

	public getTransactionByMerchantId(): any {
		let myResponse = this.http.get(`${environment.BASE_URL}/getTransactionByMerchantId`, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log();
		return myResponse;
	}

	public searchClient(data): Observable<any> {
		console.log(data);
		return this.http.post(`${environment.BASE_URL}/searchClient`, data, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public getAppointmentByClientId(data): any {
		let myResponse = this.http.post(`${environment.BASE_URL}/getAppointmentByClientId`, data, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public createPos(data): any {
		let myResponse = this.http.post(`${environment.BASE_URL}/createPos`, data, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}
	public deleteTransaction(transactionId): any {
		let myResponse = this.http.delete(`${environment.BASE_URL}/deleteTransaction` + '/' + transactionId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public searchServiceByMerchantId(data): Observable<any> {
		console.log(data);
		return this.http.post(`${environment.BASE_URL}/searchServiceByMerchantId`, data, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public searchProductByMerchantId(data): Observable<any> {
		console.log(data);
		return this.http.post(`${environment.BASE_URL}/searchProductByMerchantId`, data, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}
}
