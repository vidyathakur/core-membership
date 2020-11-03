import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtService } from 'src/app/login/jwt.service';

@Injectable({
	providedIn: 'root'
})
export class AdminService {
	public session_token: any;
	constructor(public http: HttpClient, private jwtService: JwtService) {
		this.session_token = this.jwtService.getToken('session_token');
	}
	setHeader() {
		return new HttpHeaders().set('session_token', localStorage.getItem('jwt_token'));
	}
	public createEmpLevel(data): Observable<any> {
		console.log(data);
		return this.http.post(`${environment.BASE_URL}/createEmpLevel`, data, {
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

	public editEmpLevel(empData): any {
		let myResponse = this.http.post(`${environment.BASE_URL}/editEmpLevel `, empData, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public deleteEmpLevel(data): any {
		let myResponse = this.http.post(`${environment.BASE_URL}/deleteEmpLevel `, data, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	///////////////////////////////Eployees List///////////////////////////////////////////////////
	public getEmpDetailByMerchantId(data): any {
		let myResponse = this.http.post(`${environment.BASE_URL}/getEmpDetailByMerchantId `, data, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public deleteEmployee(data): any {
		let myResponse = this.http.post(`${environment.BASE_URL}/deleteEmployee `, data, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public getClientCatDetailsByMerchantId(data): any {
		let myResponse = this.http.post(`${environment.BASE_URL}/getClientCatDetailsByMerchantId `, data, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public getHolidayDate(data): any {
		let myResponse = this.http.post(`${environment.BASE_URL}/getHolidayDate `, data, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public getServiceCatByMerchantId(data): any {
		let myResponse = this.http.get(`${environment.BASE_URL}/getServiceCatByMerchantId `, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public getServiceByMerchantId(): any {
		let myResponse = this.http.get(`${environment.BASE_URL}/getServiceByMerchantId `, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public getServiceById(serviceId): any {
		let myResponse = this.http.get(`${environment.BASE_URL}/getServiceById` + '/' + serviceId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(serviceId);
		return myResponse;
	}

	public getTaxRates(data): any {
		let myResponse = this.http.post(`${environment.BASE_URL}/getTaxRates `, data, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public deleteServiceCat(servicecatId): any {
		let myResponse = this.http.delete(`${environment.BASE_URL}/deleteServiceCat` + '/' + servicecatId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public deleteService(serviceId): any {
		let myResponse = this.http.delete(`${environment.BASE_URL}/deleteService` + '/' + serviceId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public addOpeningDay(data): Observable<any> {
		console.log(data);
		if (data.opening_hours_id) {
			return this.http.patch(`${environment.BASE_URL}/updateOpeningHour `, data, {
				headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
			});
		} else {
			return this.http.post(`${environment.BASE_URL}/addOpeningDay`, data, {
				headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
			});
		}
	}

	public getResource(): any {
		let myResponse = this.http.get(`${environment.BASE_URL}/getResource `, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public deleteResource(resourceId): any {
		let myResponse = this.http.delete(`${environment.BASE_URL}/deleteResource` + '/' + resourceId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public getOpeningDay(): any {
		let myResponse = this.http.get(`${environment.BASE_URL}/getOpeningDay `, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}

	public getTotalCountData(): any {
		let myResponse = this.http.get(`${environment.BASE_URL}/getTotalCountData `, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
		console.log(myResponse);
		return myResponse;
	}
}
