import { Injectable } from '@angular/core';
import { JwtService } from 'src/app/login/jwt.service';
import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
	constructor(private jwtService: JwtService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const headersConfig = {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		};
		const token = this.jwtService.getToken('session_token');
		if (token) {
			headersConfig['Authorization'] = `bearer ${token}`;
		}
		const _req = req.clone({ setHeaders: headersConfig });
		return next.handle(_req);
	}
}
