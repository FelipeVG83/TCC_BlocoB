import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DbService } from '../services/db.service';
import { SessionService } from '../services/session.service';
import { UtilitiesService } from '../services/utilities.service';
import { NotifierService } from 'angular-notifier';
import { SelectionModel } from '@angular/cdk/collections';
import { IArea } from 'src/models/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { ɵELEMENT_PROBE_PROVIDERS__POST_R3__ } from '@angular/platform-browser';

@Component({
	selector: 'app-lista-areas-comuns',
	templateUrl: './lista-areas-comuns.component.html',
	styleUrls: ['./lista-areas-comuns.component.scss']
})
export class ListaAreasComunsComponent implements OnInit {

	@Output() mudaComponente = new EventEmitter();

	AreasComunsObj: any;
	AreasComuns: any[];
	dataSource: any;
	selection = new SelectionModel<IArea>(true, []);
	displayedColumns: string[] = ['Seleciona', 'Nome', 'Descricao', 'Funcionalidade', 'Localizacao', 'Reservavel'];

	constructor(private db: DbService, private session: SessionService, private utilities: UtilitiesService, private notifierService: NotifierService) { }

	ngOnInit() {
		this.lista();
	}

	lista() {
		this.AreasComunsObj = this.db.Condominios[this.session.idCondominio].Bloco;
		this.AreasComuns = this.utilities.convertObjToArray(this.AreasComunsObj);
		for (let i = 0; i < this.AreasComuns.length; i++) {
			const element = this.AreasComuns[i];
			if (this.AreasComuns[i].AreaComum) {
				this.AreasComuns[i].AreaComum = this.utilities.convertObjToArray(this.AreasComuns[i].AreaComum);
			}
		}

		let resultFinal = [];
		for (let i = 0; i < this.AreasComuns.length; i++) {
			const element = this.AreasComuns[i];
			if (!element.AreaComum) { continue; }
			for (let j = 0; j < element.AreaComum.length; j++) {
				const element2 = element.AreaComum[j];
				element2.NomeBloco = element.Nome;
				element2.IdBloco = element.id;
				resultFinal.push(element2);
			}
		}
		this.dataSource = new MatTableDataSource(resultFinal);
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
			this.db.deleta('Cliente/Condominio/' + this.session.idCondominio + '/Bloco/' + element['IdBloco'] + '/AreaComum/' + element['id']);
		}
		this.lista();
		this.notifierService.notify('success', 'Área Comum removida com sucesso!');
	}

	adicionar() {
		this.mudaComponente.emit('areas-comuns/cadastrar');
	}
}
