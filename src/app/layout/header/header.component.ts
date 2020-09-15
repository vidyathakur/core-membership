import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	constructor() {}

	ngOnInit() {
		let scriptPath = [
			'../assets/js/jquery-2.2.4.min.js',
			'../assets/js/bootstrap.min.js',
			'../assets/js/jquery.slimscroll.min.js',
			'../assets/js/jquery.slicknav.min.js',
			'../assets/js/scripts.js',
			'../assets/js/metisMenu.min.js'
		];
		this.loadScript(scriptPath);
	}

	public loadScript(url) {
		for (let i in url) {
			const body = <HTMLDivElement>document.body;
			const script = document.createElement('script');
			script.innerHTML = '';
			script.src = url[i];
			script.async = false;
			script.defer = true;
			body.appendChild(script);
		}
	}
}
