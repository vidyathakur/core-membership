import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { JwtService } from 'src/app/login/jwt.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ProductbrandService {
	public session_token: any;
	constructor(public http: HttpClient, private jwtService: JwtService) {
		this.session_token = this.jwtService.getToken('session_token');
	}
	setHeader() {
		return new HttpHeaders().set('session_token', localStorage.getItem('jwt_token'));
	}

	public createProductBrand(data): Observable<any> {
		console.log(data);
		return this.http.post(`${environment.BASE_URL}/createProductBrand`, data, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public getProductBrandByMerchantId(): any {
		let myResponse = this.http.get(`${environment.BASE_URL}/getProductBrandByMerchantId`, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public getProductBrandById(productbrandId): any {
		let myResponse = this.http.get(`${environment.BASE_URL}/getProductBrandById` + '/' + productbrandId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public editProductBrand(data): Observable<any> {
		return this.http.patch(`${environment.BASE_URL}/editProductBrand`, data, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public deleteProductBrand(productbrandId): any {
		let myResponse = this.http.delete(`${environment.BASE_URL}/deleteProductBrand` + '/' + productbrandId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}
}
