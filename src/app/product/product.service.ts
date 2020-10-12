import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { JwtService } from 'src/app/login/jwt.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	public session_token: any;

	constructor(public http: HttpClient, private jwtService: JwtService) {
		this.session_token = this.jwtService.getToken('session_token');
	}
	setHeader() {
		return new HttpHeaders().set('session_token', localStorage.getItem('jwt_token'));
	}

	public createProduct(data): Observable<any> {
		console.log(data);
		return this.http.post(`${environment.BASE_URL}/createProduct`, data, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public getProductByMerchantId(): any {
		let myResponse = this.http.get(`${environment.BASE_URL}/getProductByMerchantId `, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public getProductById(productId): Observable<any> {
		console.log(productId);
		return this.http.get(`${environment.BASE_URL}/getProductById` + '/' + productId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public editProduct(productData): Observable<any> {
		return this.http.patch(`${environment.BASE_URL}/editProduct`, productData, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public deleteProduct(productId): any {
		let myResponse = this.http.delete(`${environment.BASE_URL}/deleteProduct` + '/' + productId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}
}
