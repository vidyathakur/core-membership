import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
	private tokenExpirationTimer: any;

	changeText: boolean;
	changeText0: boolean;
	changeText1: boolean;
	changeText2: boolean;
	changeText3: boolean;
	changeText4: boolean;
	changeText5: boolean;
	changeText6: boolean;
	changeText7: boolean;
	changeText8: boolean;
	changeText9: boolean;
	changeText10: boolean;
	active;
	constructor(private router: Router, private jwtService: JwtService) {
		this.changeText = false;
		router.events.subscribe((url: any) => console.log(url));
		console.log(router.url);
		this.active = router.url ? router.url : false;
	}

	ngOnInit() {}

	logout() {
		console.log('clicked');
		this.jwtService.destroyToken();
		this.router.navigate(['/login']);
		if (this.tokenExpirationTimer) {
			clearTimeout(this.tokenExpirationTimer);
		}
		this.tokenExpirationTimer = null;
	}

	autoLogout(expirationDuration: number) {
		this.tokenExpirationTimer = setTimeout(() => {
			this.logout();
		}, 2000);
	}

	private handleAuthentication(session_token: string, expiresIn: number) {
		const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
		this.autoLogout(expiresIn * 1000);
	}
}
