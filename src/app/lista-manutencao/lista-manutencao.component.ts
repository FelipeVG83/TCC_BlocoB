import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { IManutencao, IArea } from 'src/models/interfaces';
import { DbService } from '../services/db.service';
import { SessionService } from '../services/session.service';
import { UtilitiesService } from '../services/utilities.service';
import { NotifierService } from 'angular-notifier';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
	selector: 'app-lista-manutencao',
	templateUrl: './lista-manutencao.component.html',
	styleUrls: ['./lista-manutencao.component.scss'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class ListaManutencaoComponent implements OnInit {

	@Output() mudaComponente = new EventEmitter();

	expandedElement: IManutencao | null;

	dataSource: any;
	selection = new SelectionModel<IManutencao>(true, []);
	displayedColumns: string[] = ['Seleciona', 'Dia', 'Assunto', 'Descricao', 'Local', 'Status'];
	ChamadosObj: any;
	Chamados: any[];

	element;

	constructor(private db: DbService, private session: SessionService, private utilities: UtilitiesService, private notifierService: NotifierService) { }

	ngOnInit() {
		this.lista();
	}

	lista() {
		this.ChamadosObj = this.db.Condominios[this.session.idCondominio].Chamados;
		this.Chamados = this.utilities.convertObjToArray(this.ChamadosObj);
		this.dataSource = new MatTableDataSource(this.Chamados);
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

	alteraStatus(status: string) {
		for (let i = 0; i < this.selection.selected.length; i++) {
			const element = this.selection.selected[i];
			const caminho: string = 'Cliente/Condominio/' + this.session.idCondominio + '/Chamados/' + element['id'] + '/Status';
			this.db.atualizaCampo(caminho, status);
		}
		this.notifierService.notify('success', 'Status alterado com sucesso!');
		this.lista();
	}

	adicionar() {
		this.mudaComponente.emit('manutencao/cadastrar');
	}

	getLocal(local: string) {
		if (!(local.substring(0, 1) === '-')) {
			return local;
		}
		const areaComum = this.db.getAreaComum(local);
		if (areaComum && areaComum.Nome) {
			return areaComum.Nome;
		}
		return '';
	}

	getStatus(status) {
		if (!status) {
			return 'Não Resolvido';
		}
		return status;
	}
}
