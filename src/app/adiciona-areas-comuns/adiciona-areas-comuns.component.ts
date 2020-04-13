import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DbService } from '../services/db.service';
import { IArea } from 'src/models/interfaces';
import { NotifierService } from 'angular-notifier';

@Component({
	selector: 'app-adiciona-areas-comuns',
	templateUrl: './adiciona-areas-comuns.component.html',
	styleUrls: ['./adiciona-areas-comuns.component.scss']
})
export class AdicionaAreasComunsComponent implements OnInit {

	@Output() mudaComponente = new EventEmitter();

	Nome: string;
	Descricao: string;
	Localizacao;
	Funcionalidade;
	Reservavel;

	constructor(private db: DbService, private notifierService: NotifierService) { }

	ngOnInit() {
	}

	adicionarArea() {
		const obj: IArea = {
			Descricao: this.Descricao,
			Funcionalidade: this.Funcionalidade,
			Localizacao: this.Localizacao,
			Nome: this.Nome,
			Reservavel: this.Reservavel
		}
		this.db.inserirAreaComum(obj);
		this.limpaCampos();
		this.notifierService.notify('success', 'Área Comum cadastrada com sucesso!');
		this.mudaComponente.emit('areas-comuns/listar');
	}

	limpaCampos() {
		this.Descricao = '';
		this.Funcionalidade = null;
		this.Localizacao = null;
		this.Nome = '';
		this.Reservavel = false;
	}
}
