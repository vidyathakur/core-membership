import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
declare var $: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	showHeader = false;
	showSidebar = false;
	showFooter = false;
	title = 'coremanagement';

	constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

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
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.showHeader = this.activatedRoute.firstChild.snapshot.data.showHeader !== false;
				this.showSidebar = this.activatedRoute.firstChild.snapshot.data.showSidebar !== false;
				this.showFooter = this.activatedRoute.firstChild.snapshot.data.showFooter !== false;
			}
		});
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
