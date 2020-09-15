import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class JwtService {
	constructor() {}

	setToken(key, session_token) {
		window.localStorage.setItem(key, session_token);
	}

	getToken(key) {
		return window.localStorage.getItem('jwt_token');
	}
	
	getTokenByParams(key) {
		return window.localStorage.getItem(key);
	}

	destroyToken() {
		window.localStorage.removeItem('jwt_token');
		window.localStorage.removeItem('merchant_id');
		window.localStorage.removeItem('full_name');
		window.localStorage.removeItem('country_id');
	}
}
