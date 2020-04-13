import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { IInadimplente, IMoradores } from 'src/models/interfaces';
import { NotifierService } from 'angular-notifier';
import { UtilitiesService } from '../services/utilities.service';
import { SessionService } from '../services/session.service';
import { DbService } from '../services/db.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'app-lista-inadimplentes',
	templateUrl: './lista-inadimplentes.component.html',
	styleUrls: ['./lista-inadimplentes.component.scss']
})
export class ListaInadimplentesComponent implements OnInit {

	@Output() mudaComponente = new EventEmitter();

	CarrosObj: any;
	Carros: any[];
	dataSource: any;
	selection = new SelectionModel<IInadimplente>(true, []);
	displayedColumns: string[] = ['Seleciona', 'Bloco', 'Apto', 'Morador', 'Total'];
	InadimplentesObj: any;
	Inadimplentes: any[];

	constructor(private db: DbService, private session: SessionService, private utilities: UtilitiesService, private notifierService: NotifierService) { }

	ngOnInit() {
		this.lista();
	}

	lista() {
		this.InadimplentesObj = this.db.Condominios[this.session.idCondominio].Inadimplentes;
		this.Inadimplentes = this.utilities.convertObjToArray(this.InadimplentesObj);
		this.dataSource = new MatTableDataSource(this.Inadimplentes);
	}

	infoBloco(idBloco: string) {
		return this.db.getBloco(idBloco).Nome;
	}

	infoApto(idBloco: string, idApto: string) {
		return this.db.getApto(idBloco, idApto).NroApto;
	}

	infoMorador(idBloco: string, idApto: string, idMorador: string) {
		const morador: IMoradores = this.db.getMorador(idBloco, idApto, idMorador);
		return morador.Nome + ' ' + morador.Sobrenome + ' (' + morador.Cpf + ')';
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
			this.db.deleta('Cliente/Condominio/' + this.session.idCondominio + '/Inadimplentes/' + element['id']);
		}
		this.lista();
		this.notifierService.notify('success', 'Inadimplente removido com sucesso!');
	}

	adicionar() {
		this.mudaComponente.emit('inadimplentes/cadastrar');
	}
}
