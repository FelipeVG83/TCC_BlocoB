import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DbService } from '../services/db.service';
import { SessionService } from '../services/session.service';
import { UtilitiesService } from '../services/utilities.service';
import * as moment from 'moment';

@Component({
	selector: 'app-calendario',
	templateUrl: './calendario.component.html',
	styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

	calendarPlugins = [dayGridPlugin];
	CarrosObj: any;
	Carros: any;
	Eventos = [];

	constructor(private db: DbService, private session: SessionService, private utilities: UtilitiesService) { }

	ngOnInit() {
		this.lista();
	}

	lista() {
		this.CarrosObj = this.db.Condominios[this.session.idCondominio].Reservas;
		this.Carros = this.utilities.convertObjToArray(this.CarrosObj);
		for (let i = 0; i < this.Carros.length; i++) {
			const element = this.Carros[i];
			const data = moment(element.DiaReserva, 'DD/MM/YYYY').format('YYYY-MM-DD');
			this.Eventos.push(
				{ title: element.NomeReserva, date: data, textColor: 'white' }
			);
		}
	}
}
