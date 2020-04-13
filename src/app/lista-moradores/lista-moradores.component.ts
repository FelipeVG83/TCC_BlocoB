import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { IApto } from 'src/models/interfaces';
import { SessionService } from '../services/session.service';
import { DbService } from '../services/db.service';
import { UtilitiesService } from '../services/utilities.service';
import { NotifierService } from 'angular-notifier';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
	selector: 'app-lista-moradores',
	templateUrl: './lista-moradores.component.html',
	styleUrls: ['./lista-moradores.component.scss'],
	animations: [
		trigger('detailExpand', [
		  state('collapsed', style({height: '0px', minHeight: '0'})),
		  state('expanded', style({height: '*'})),
		  transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	  ],
})
export class ListaMoradoresComponent implements OnInit {

	@Output() mudaComponente = new EventEmitter();

	displayedColumns: string[] = ['Seleciona', 'NroApto'];
	dataSource = new MatTableDataSource();
	selection = new SelectionModel<IApto>(true, []);
	expandedElement: IApto | null;
	Aptos: any[] = [];
	Moradores: any = {};

	row;
	element;

	constructor(private db: DbService, private session: SessionService, private utilities: UtilitiesService, private notifierService: NotifierService) { }

	ngOnInit() {
		this.lista();
	}

	lista() {
		const bloco = this.utilities.convertObjToArray(this.db.Condominios[this.session.idCondominio].Bloco);
		for (let i = 0; i < bloco.length; i++) {
			const element = bloco[i];
			if (element.Apartamento) {
				const aptos = this.utilities.convertObjToArray(element.Apartamento);
				this.Aptos = this.Aptos.concat(aptos);
				for (let j = 0; j < aptos.length; j++) {
					const elem = aptos[j];
					if (elem.Morador) {
						this.Moradores[j] = this.utilities.convertObjToArray(elem.Morador);
					}
				}
			}
		}

		this.dataSource = new MatTableDataSource(this.Aptos);
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
		this.mudaComponente.emit('moradores/cadastrar');
	}

}
