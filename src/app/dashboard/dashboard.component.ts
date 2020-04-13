import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import * as Chart from 'chart.js';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	constructor() { }

	ngOnInit() {
		const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
		const consumo = [230, 240, 210, 200, 180, 150, 155, 150, 170, 190, 200, 210];
		const sumConsumo = consumo.reduce((previous, current) => current += previous);
		const avgConsumo = sumConsumo / consumo.length;

		const speedData = {
			labels: meses,
			datasets: [{
				label: 'Consumo mensal (kW/H)',
				data: consumo,
				backgroundColor: 'rgb(63, 81, 181, 0.8)'
			}, {
				label: 'Media',
				data: [avgConsumo, avgConsumo, avgConsumo, avgConsumo, avgConsumo, avgConsumo, avgConsumo, avgConsumo, avgConsumo, avgConsumo, avgConsumo, avgConsumo],
				lineTension: 0,
				fill: false,
				borderColor: 'orange',
				backgroundColor: 'transparent',
				borderDash: [5, 5],
				pointBorderColor: 'orange',
				pointBackgroundColor: 'rgba(255,150,0,0.5)',
				pointRadius: 5,
				pointHoverRadius: 10,
				pointHitRadius: 0,
				pointBorderWidth: 0,
				type: 'line'
			}]
		};

		const chartOptions = {
			legend: {
				display: true,
				position: 'top',
				labels: {
					boxWidth: 80,
					fontColor: 'black'
				}
			}
		};

		// tslint:disable-next-line: no-unused-expression
		const chart = document.getElementById('area-chart') as HTMLCanvasElement;
		// tslint:disable-next-line: no-unused-expression
		new Chart(chart, {
			type: 'line',
			data: speedData,
			options: chartOptions as ChartConfiguration
		});
	}

}
