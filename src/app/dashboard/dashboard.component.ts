import { DashboardService } from './dashboard.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
// import { ChartDataSets, ChartOptions } from 'chart.js';
// import { Color, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { AdminService } from 'src/app/admin/admin.service';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	totalCounts: any;
	totalEmployees:any;
	public pieChartOptions: ChartOptions = {
		responsive: true
	};
	public pieChartLabels: Label[] = [['Expense'], ['Income']];
	public pieChartData: SingleDataSet = [30, 50, 20];
	public pieChartType: ChartType = 'pie';
	public pieChartLegend = true;
	public pieChartPlugins = [];
	constructor(
		public router: Router,
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		public adminService: AdminService,
		private jwtService: JwtService,
		private _route: ActivatedRoute,
		public dashboardService: DashboardService,
		private route: ActivatedRoute
	) {
		monkeyPatchChartJsTooltip();
		monkeyPatchChartJsLegend();
	}

	lineChartData: ChartDataSets[] = [
		{
			data: [0, 100, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55],
			label: 'John Doe',

			fill: false
		},
		{
			data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27],
			label: 'Bettie Castro',
			fill: false
		},
		{
			data: [10, 30, 40, 19, 40, 5, 20, 28, 60, 40, 55, 86, 78, 80, 99, 66, 44, 19, 34, 27],
			label: 'Elanor',
			fill: false
		}
	];

	//Labels shown on the x-axis
	lineChartLabels: Label[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

	// Define chart options
	lineChartOptions: ChartOptions = {
		responsive: true,
		maintainAspectRatio: false
	};

	// Define colors of chart segments
	lineChartColors: Color[] = [
		{
			backgroundColor: 'rgba(243,181,18,1)',
			borderColor: 'rgba(243,181,18,1)'
		},
		{
			backgroundColor: 'rgba(121,82,227,1)',
			borderColor: 'rgba(121,82,227,1)'
		},
		{
			backgroundColor: 'rgba(82,192,218,1)',
			borderColor: 'rgba(82,192,218,1)'
		}
	];

	// Set true to show legends
	lineChartLegend = true;

	// Define type of chart
	lineChartType = 'line';

	lineChartPlugins = [];

	// events
	chartClicked({ event, active }: { event: MouseEvent; active: {}[] }): void {
		console.log(event, active);
	}

	chartHovered({ event, active }: { event: MouseEvent; active: {}[] }): void {
		console.log(event, active);
	}

	ngOnInit(): void {
		this.getDashboardData();
		this.getTotalCountData();
	}

	public getDashboardData(): any {
		this.adminService.getDashboardData().subscribe(
			data => {
				console.log(data);
				this.totalCounts = data['data'];
			},
			error => {
				console.log('some error occurred');
				this.toastr.errorToastr('some error occurred');
			}
		);
	}

	public getTotalCountData(): any {
		this.adminService.getTotalCountData().subscribe(
			data => {
				this.totalEmployees = data['data'];
			},
			error => {
				console.log('some error occurred');
				this.toastr.errorToastr('some error occurred');
			}
		);
	}
}
