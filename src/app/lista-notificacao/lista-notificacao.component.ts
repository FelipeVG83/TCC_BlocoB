import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DbService } from '../services/db.service';
import { INotificacao } from 'src/models/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { SessionService } from '../services/session.service';
import { UtilitiesService } from '../services/utilities.service';
import { SelectionModel } from '@angular/cdk/collections';
import { NotifierService } from 'angular-notifier';

@Component({
	selector: 'app-lista-notificacao',
	templateUrl: './lista-notificacao.component.html',
	styleUrls: ['./lista-notificacao.component.scss']
})
export class ListaNotificacaoComponent implements OnInit {

	@Output() mudaComponente = new EventEmitter();

	Notificacoes: INotificacao[];
	NotificacoesObj: any;
	displayedColumns: string[] = ['Seleciona', 'Titulo', 'Descricao'];
	dataSource = new MatTableDataSource();
	selection = new SelectionModel<INotificacao>(true, []);

	constructor(private db: DbService, private session: SessionService, private utilities: UtilitiesService, private notifierService: NotifierService) { }

	ngOnInit() {
		this.lista();
	}

	lista() {
		this.NotificacoesObj = this.db.Condominios[this.session.idCondominio].Notificacao;
		this.Notificacoes = this.utilities.convertObjToArray(this.NotificacoesObj);
		this.dataSource = new MatTableDataSource(this.Notificacoes);
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
			this.db.deleta('Cliente/Condominio/' + this.session.idCondominio + '/Notificacao/' + element['id']);
		}
		this.lista();
		this.notifierService.notify('success', 'Notificação removida com sucesso!');
	}

	adicionar() {
		this.mudaComponente.emit('notificacao/cadastrar');
	}

}
