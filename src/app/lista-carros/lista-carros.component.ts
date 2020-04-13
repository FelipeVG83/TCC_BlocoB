import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DbService } from '../services/db.service';
import { SessionService } from '../services/session.service';
import { UtilitiesService } from '../services/utilities.service';
import { NotifierService } from 'angular-notifier';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { IVeiculo } from 'src/models/interfaces';

@Component({
	selector: 'app-lista-carros',
	templateUrl: './lista-carros.component.html',
	styleUrls: ['./lista-carros.component.scss']
})
export class ListaCarrosComponent implements OnInit {
	@Output() mudaComponente = new EventEmitter();

	CarrosObj: any;
	Carros: any[];
	dataSource: any;
	selection = new SelectionModel<IVeiculo>(true, []);
	displayedColumns: string[] = ['Seleciona', 'Bloco', 'Apto', 'Marca', 'Modelo', 'Cor'];

	constructor(private db: DbService, private session: SessionService, private utilities: UtilitiesService, private notifierService: NotifierService) { }

	ngOnInit() {
		this.lista();
	}

	lista() {
		this.CarrosObj = this.db.Condominios[this.session.idCondominio].Veiculo;
		this.Carros = this.utilities.convertObjToArray(this.CarrosObj);
		this.dataSource = new MatTableDataSource(this.Carros);
	}

	infoBloco(idApto: string) {
		return 'Bloco A';
	}

	infoApto(idApto: string) {
		return '100';
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
			this.db.deleta('Cliente/Condominio/' + this.session.idCondominio + '/Veiculo/' + element['id']);
		}
		this.lista();
		this.notifierService.notify('success', 'Veículo removido com sucesso!');
	}

	adicionar() {
		this.mudaComponente.emit('veiculos/cadastrar');
	}

}
