import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from 'src/app/login/jwt.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class TaxrateService {
	public session_token: any;
	constructor(public http: HttpClient, private jwtService: JwtService) {
		this.session_token = this.jwtService.getToken('session_token');
	}
	setHeader() {
		return new HttpHeaders().set('session_token', localStorage.getItem('jwt_token'));
	}
	public addTaxRates(data): Observable<any> {
		console.log(data);
		return this.http.post(`${environment.BASE_URL}/addTaxRates`, data, {
			headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }).set(
				'SESSION-TOKEN',
				localStorage.getItem('jwt_token')
			)
		});
	}

	public getTaxRatesById(taxrateId): any {
		let myResponse = this.http.get(`${environment.BASE_URL}/getTaxRatesById` + '/' + taxrateId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(taxrateId);
		return myResponse;
	}

	public editTaxRate(taxrateData): Observable<any> {
		return this.http.post(`${environment.BASE_URL}/editTaxRate`, taxrateData, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public deleteTaxRate(taxrateData): any {
		let myResponse = this.http.post(`${environment.BASE_URL}/deleteTaxRate`, taxrateData, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}
}
