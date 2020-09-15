import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
	constructor(private jwtService: JwtService, public router: Router) {
    
  }
  
  canActivate(): boolean{
    if (this.jwtService.getToken('session_token')) {
		return true;
	} else {
		this.router.navigate(['/login']);
		return false;
	}
  }
}
