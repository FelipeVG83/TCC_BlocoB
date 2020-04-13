import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { IVisitantes } from 'src/models/interfaces';
import { DbService } from '../services/db.service';
import { SessionService } from '../services/session.service';
import { UtilitiesService } from '../services/utilities.service';
import { NotifierService } from 'angular-notifier';
import * as moment from 'moment';

@Component({
	selector: 'app-lista-visitantes',
	templateUrl: './lista-visitantes.component.html',
	styleUrls: ['./lista-visitantes.component.scss']
})
export class ListaVisitantesComponent implements OnInit {

	@Output() mudaComponente = new EventEmitter();

	displayedColumns: string[] = ['Seleciona', 'Bloco', 'Apto', 'Nome', 'Telefone', 'Status'];
	dataSource = new MatTableDataSource();
	selection = new SelectionModel<IVisitantes>(true, []);
	expandedElement: IVisitantes | null;
	Aptos: any[] = [];
	Moradores: any = {};

	row;
	element;
	VisitantesObj: any;
	Visitantes: any[];

	constructor(private db: DbService, private session: SessionService, private utilities: UtilitiesService, private notifierService: NotifierService) { }

	ngOnInit() {
		this.lista();
	}

	lista() {
		this.VisitantesObj = this.db.Condominios[this.session.idCondominio].Visitantes;
		this.Visitantes = this.utilities.convertObjToArray(this.VisitantesObj);
		this.dataSource = new MatTableDataSource(this.Visitantes);
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	/** The label for the checkbox on the passed row */
	checkboxLabel(row): string {
		if (!row) {
			return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
	}

	deletar() {
		for (let i = 0; i < this.selection.selected.length; i++) {
			const element = this.selection.selected[i];
			this.db.deleta('Cliente/Condominio/' + this.session.idCondominio + '/Visitantes/' + element['id']);
		}
		this.lista();
		this.notifierService.notify('success', 'Notificação removida com sucesso!');
	}

	adicionar() {
		this.mudaComponente.emit('visitantes/cadastrar');
	}

	getBloco(idBloco: string) {
		if (!idBloco) {
			return '';
		}
		return this.db.getBloco(idBloco).Nome;
	}

	getApto(idBloco: string, idApto: string) {
		if (!idBloco || !idApto) {
			return '';
		}
		return this.db.getApto(idBloco, idApto).NroApto;
	}

	getStatus(status) {
		if (!status) {
			return 'Ativo';
		}
		return status;
	}

	alteraStatus() {
		for (let i = 0; i < this.selection.selected.length; i++) {
			const element = this.selection.selected[i];
			let caminho: string = 'Cliente/Condominio/' + this.session.idCondominio + '/Visitantes/' + element['id'] + '/Status';
			this.db.atualizaCampo(caminho, 'Inativo');
			caminho = 'Cliente/Condominio/' + this.session.idCondominio + '/Visitantes/' + element['id'] + '/DataHoraSaida';
			this.db.atualizaCampo(caminho, moment(new Date()).format('DD/MM/YYYY HH:mm').toString());
		}
		this.notifierService.notify('success', 'Status alterado com sucesso!');
		this.lista();
	}

}
