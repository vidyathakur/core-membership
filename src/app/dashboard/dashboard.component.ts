import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

// import { ChartDataSets, ChartOptions } from 'chart.js';
// import { Color, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	public pieChartOptions: ChartOptions = {
		responsive: true
	};
	public pieChartLabels: Label[] = [['Expense'], ['Income']];
	public pieChartData: SingleDataSet = [30, 50, 20];
	public pieChartType: ChartType = 'pie';
	public pieChartLegend = true;
	public pieChartPlugins = [];
	constructor() {
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

	ngOnInit(): void {}
	
}
