import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { JwtService } from 'src/app/login/jwt.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ResourcesService {
	public session_token: any;
	constructor(public http: HttpClient, private jwtService: JwtService) {
		this.session_token = this.jwtService.getToken('session_token');
	}
	setHeader() {
		return new HttpHeaders().set('session_token', localStorage.getItem('jwt_token'));
	}

	public addResource(data): Observable<any> {
		console.log(data);
		return this.http.post(`${environment.BASE_URL}/addResource`, data, {
			headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }).set(
				'SESSION-TOKEN',
				localStorage.getItem('jwt_token')
			)
		});
	}

	public getResourceById(resourceId): Observable<any> {
		console.log(resourceId);
		return this.http.get(`${environment.BASE_URL}/getResourceById` + '/' + resourceId, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}

	public editResource(resourceData): Observable<any> {
		return this.http.patch(`${environment.BASE_URL}/editResource`, resourceData, {
			headers: new HttpHeaders().set('SESSION-TOKEN', localStorage.getItem('jwt_token'))
		});
	}
}
