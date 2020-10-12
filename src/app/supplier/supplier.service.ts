import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { JwtService } from 'src/app/login/jwt.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class SupplierService {
	public session_token: any;

	constructor(public http: HttpClient, private jwtService: JwtService) {
		this.session_token = this.jwtService.getToken('session_token');
	}
	setHeader() {
		return new HttpHeaders().set('session_token', localStorage.getItem('jwt_token'));
	}

	public createSupplier(data): Observable<any> {
		console.log(data);
		return this.http.post(`${environment.BASE_URL}/createSupplier`, data, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public getSupplierDetailByMerchantId(): any {
		let myResponse = this.http.get(`${environment.BASE_URL}/getSupplierDetailByMerchantId `, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public getServiceResourceByServiceId(serviceresourceId): Observable<any> {
		console.log(serviceresourceId);
		return this.http.get(`${environment.BASE_URL}/getServiceResourceByServiceId` + '/' + serviceresourceId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public getSupplierDetailById(supplierId): Observable<any> {
		console.log(supplierId);
		return this.http.get(`${environment.BASE_URL}/getSupplierDetailById` + '/' + supplierId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public editSupplier(supplierData): Observable<any> {
		return this.http.patch(`${environment.BASE_URL}/editSupplier`, supplierData, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public deleteSupplier(supplierId): any {
		let myResponse = this.http.delete(`${environment.BASE_URL}/deleteSupplier` + '/' + supplierId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}
}
