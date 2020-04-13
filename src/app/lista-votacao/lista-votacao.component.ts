import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DbService } from '../services/db.service';
import { SessionService } from '../services/session.service';
import { UtilitiesService } from '../services/utilities.service';
import { NotifierService } from 'angular-notifier';
import { IVotacao } from 'src/models/interfaces';

@Component({
	selector: 'app-lista-votacao',
	templateUrl: './lista-votacao.component.html',
	styleUrls: ['./lista-votacao.component.scss']
})
export class ListaVotacaoComponent implements OnInit {

	@Output() mudaComponente = new EventEmitter();

	displayedColumns: string[] = ['Seleciona', 'Titulo', 'Descricao'];
	dataSource = new MatTableDataSource();
	selection = new SelectionModel<IVotacao>(true, []);
	VotacaoObj: any;
	Votacao: any[];

	constructor(private db: DbService, private session: SessionService, private utilities: UtilitiesService, private notifierService: NotifierService) { }

	ngOnInit() {
		this.lista();
	}

	lista() {
		this.VotacaoObj = this.db.Condominios[this.session.idCondominio].Votacao;
		this.Votacao = this.utilities.convertObjToArray(this.VotacaoObj);
		this.dataSource = new MatTableDataSource(this.Votacao);
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
			this.db.deleta('Cliente/Condominio/' + this.session.idCondominio + '/Bloco/' + element['Bloco' + '/Apartamento/' + element['id']]);
		}
		this.lista();
		this.notifierService.notify('success', 'Votação removida com sucesso!');
	}

	adicionar() {
		this.mudaComponente.emit('votacao/cadastrar');
	}

}
