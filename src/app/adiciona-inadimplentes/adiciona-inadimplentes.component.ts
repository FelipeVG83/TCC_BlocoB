import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { UtilitiesService } from '../services/utilities.service';
import { SessionService } from '../services/session.service';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { IMoradores, IBlocos, IApto, IInadimplente } from 'src/models/interfaces';
import { Observable } from 'rxjs';
import { NotifierService } from 'angular-notifier';

@Component({
	selector: 'app-adiciona-inadimplentes',
	templateUrl: './adiciona-inadimplentes.component.html',
	styleUrls: ['./adiciona-inadimplentes.component.scss']
})
export class AdicionaInadimplentesComponent implements OnInit {
	Blocos: any[];
	Bloco: string;
	noApto: string;
	Tipo = '1';

	opcoesMoradores = [];
	opcoesAptos = [];

	opcoesMoradoresFiltrados: Observable<string[]>;
	opcoesAptosFiltrados: Observable<string[]>;

	autoCompleteMoradores = new FormControl();
	autoCompleteAptos = new FormControl();

	aptoSelecionado: IApto;
	moradorSelecionado: IMoradores;
	blocoSelecionado: any;

	Nome: string;
	Sobrenome: string;
	Rg: string;
	Cpf: string;
	Data: string;
	Descricao: string;
	Valor: string;

	Dividas = [];
	Total = 0;

	constructor(private db: DbService, private utilities: UtilitiesService, private session: SessionService, private notifierService: NotifierService, private dbMoradores: DbService) {
		this.listaInfosCampos();
	}

	ngOnInit() {
		this.opcoesMoradoresFiltrados = this.autoCompleteMoradores.valueChanges
			.pipe(
				startWith(''),
				map(value => this._filtroMoradores(value))
			);

		this.opcoesAptosFiltrados = this.autoCompleteAptos.valueChanges
			.pipe(
				startWith(''),
				map(value => this._filtroAptos(value))
			);
	}

	async listaInfosCampos() {
		const cond = this.db.Condominios[this.session.idCondominio];
		this.Blocos = this.utilities.convertObjToArray(cond.Bloco);
	}

	private _filtroMoradores(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.opcoesMoradores.filter(option => option.Nome.toLowerCase().includes(filterValue));
	}

	private _filtroAptos(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.opcoesAptos.filter(option => option.NroApto.toLowerCase().includes(filterValue));
	}

	selecionaBloco() {
		this.blocoSelecionado = this.Blocos.filter(_ => _.id === this.Bloco).pop();
		this.opcoesAptos = this.utilities.convertObjToArray(this.db.Condominios[this.session.idCondominio].Bloco[this.Bloco].Apartamento);
	}

	selecionarApto(opcao: IApto) {
		this.aptoSelecionado = opcao;
		this.opcoesMoradores = this.utilities.convertObjToArray(this.db.Condominios[this.session.idCondominio].Bloco[this.Bloco].Apartamento[opcao['id']].Morador);
	}

	selecionarMorador(opcao: IMoradores) {
		this.moradorSelecionado = opcao;
	}

	adicionarOpcao() {
		this.Dividas.push({
			Data: this.Data,
			Descricao: this.Descricao,
			Valor: (+this.Valor).toFixed(2).toString()
		});

		this.Total = this.Total + +this.Valor;
		this.Data = '';
		this.Descricao = '';
		this.Valor = '';
	}

	adicionarInadimplente() {
		let inadimplente: IInadimplente;
		if (!this.validacao()) {
			return;
		}

		if (this.Tipo === '1') {
			inadimplente = {
				Bloco: this.blocoSelecionado['id'],
				Apto: this.aptoSelecionado['id'],
				Morador: this.moradorSelecionado['id'],
				Dividas: this.Dividas,
				Status: 'Inadimplente',
				Tipo: this.Tipo,
				Total: this.Total
			};
		} else {
			inadimplente = {
				Nome: this.Nome,
				Sobrenome: this.Sobrenome,
				Rg: this.Rg,
				Cpf: this.Cpf,
				Dividas: this.Dividas,
				Status: 'Inadimplente',
				Tipo: this.Tipo,
				Total: this.Total
			};
		}

		this.dbMoradores.inserirInadimplente(inadimplente);
		this.limparCampos();
		this.notifierService.notify('success', 'Inadimplente cadastrado com sucesso!');
	}

	validacao() {
		let status = true;
		if (this.Tipo === '1') {
			if (!this.blocoSelecionado || !this.blocoSelecionado['id']) {
				this.notifierService.notify('error', 'Selecione um Bloco!');
				status = false;
			}
			if (!this.aptoSelecionado || !this.aptoSelecionado['id']) {
				this.notifierService.notify('error', 'Selecione um Apartamento!');
				status = false;
			}
			if (!this.moradorSelecionado || !this.moradorSelecionado['id']) {
				this.notifierService.notify('error', 'Selecione um Morador!');
				status = false;
			}
			if (!this.Dividas || this.Dividas.length < 1) {
				this.notifierService.notify('error', 'Adicione uma dívida!');
				status = false;
			}
		} else {
			if (!this.Nome) {
				this.notifierService.notify('error', 'Digite o Nome!');
				status = false;
			}
			if (!this.Sobrenome) {
				this.notifierService.notify('error', 'Digite o Sobrenome!');
				status = false;
			}
			if (!this.Rg) {
				this.notifierService.notify('error', 'Digite o Rg!');
				status = false;
			}
			if (!this.Cpf) {
				this.notifierService.notify('error', 'Digite o Cpf!');
				status = false;
			}
			if (!this.Dividas || this.Dividas.length < 1) {
				this.notifierService.notify('error', 'Adicione uma dívida!');
				status = false;
			}
		}
		console.log('!! status', status);
		return status;
	}

	limparCampos() {
		this.blocoSelecionado = null;
		this.aptoSelecionado = null;
		this.moradorSelecionado = null;
		this.Dividas = [];

		this.opcoesAptos = [];
		this.opcoesMoradores = [];

		this.Nome = '';
		this.Sobrenome = '';
		this.Rg = '';
		this.Cpf = '';

		this.Tipo = '1';
		this.Total = 0;
	}

	deleteItem(item) {
		this.Total = this.Total - +this.Dividas[item].Valor;
		this.Dividas.splice(item, 1);
	}
}
