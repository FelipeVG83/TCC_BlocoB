import { Component, OnInit } from '@angular/core';
import { IGastoGanho } from 'src/models/interfaces';
import { DbService } from '../services/db.service';
import { NotifierService } from 'angular-notifier';
import { UtilitiesService } from '../services/utilities.service';
import { SessionService } from '../services/session.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'app-financeiro',
	templateUrl: './financeiro.component.html',
	styleUrls: ['./financeiro.component.scss']
})
export class FinanceiroComponent implements OnInit {

	Gasto: IGastoGanho = {
		Data: '',
		Descricao: '',
		Valor: ''
	};
	Ganho: IGastoGanho = {
		Data: '',
		Descricao: '',
		Valor: ''
	};

	Gastos: IGastoGanho[] = [];
	Ganhos: IGastoGanho[] = [];

	displayedColumns = ['Data', 'Descricao', 'Valor'];

	dataSourceGanhos: any;
	dataSourceGastos: any;

	constructor(private db: DbService, private notifierService: NotifierService, private utilities: UtilitiesService, private session: SessionService) { }

	ngOnInit() {
		this.listaGanhos();
		this.listaGastos();		
	}

	listaGanhos() {
		let GanhosObj = this.db.Condominios[this.session.idCondominio].Ganhos;
		this.Ganhos = this.utilities.convertObjToArray(GanhosObj);
		this.dataSourceGanhos = new MatTableDataSource(this.Ganhos);
	}

	listaGastos() {
		let GastosObj = this.db.Condominios[this.session.idCondominio].Gastos;
		this.Gastos = this.utilities.convertObjToArray(GastosObj);
		this.dataSourceGastos = new MatTableDataSource(this.Gastos);
	}

	AdicionarGanho() {
		this.db.inserirGanho(this.Ganho);
		this.Ganho = {
			Data: '',
			Descricao: '',
			Valor: ''
		}
		this.notifierService.notify('success', 'Ganho cadastrado com sucesso!');
		this.listaGanhos();
	}

	AdicionarGasto() {
		this.db.inserirGasto(this.Gasto);
		this.Gasto = {
			Data: '',
			Descricao: '',
			Valor: ''
		}
		this.notifierService.notify('success', 'Gasto cadastrado com sucesso!');
		this.listaGastos();
	}

}
