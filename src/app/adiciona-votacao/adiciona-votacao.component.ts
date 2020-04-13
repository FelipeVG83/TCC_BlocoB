import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { DbService } from '../services/db.service';
import { IVotacao } from 'src/models/interfaces';

@Component({
	selector: 'app-adiciona-votacao',
	templateUrl: './adiciona-votacao.component.html',
	styleUrls: ['./adiciona-votacao.component.scss']
})
export class AdicionaVotacaoComponent implements OnInit {

	constructor(private dbMoradores: DbService, private notifierService: NotifierService) { }

	public nome: string;
	public descricao: string;
	public opcao: string;
	public opcoes: string[] = [];
	public alerta = true;
	public dataInicial: string;
	public dataFinal: string;

	public opcaoSelecionada: string;

	ngOnInit() {
	}

	onChangeOpcao($event) {
		this.opcaoSelecionada = $event.value;
	}

	adicionarOpcao() {
		this.opcoes.push(this.opcao);
		this.opcao = '';
	}

	adicionarVotacao() {
		const votacao: IVotacao = {
			Nome: this.nome,
			Descricao: this.descricao,
			Opcoes: this.opcoes,
			TipoVotacao: this.opcaoSelecionada,
			DataInicial: this.dataInicial,
			DataFinal: this.dataFinal
		};
		this.dbMoradores.inserirVotacao(votacao);
		this.limparCampos();
		this.notifierService.notify('success', 'Votação cadastrada com sucesso!');
	}

	deleteItem(item) {
		this.opcoes.splice(item, 1);
	}

	limparCampos() {
		this.nome = '';
		this.descricao = '';
		this.opcoes = [];
	}
}
