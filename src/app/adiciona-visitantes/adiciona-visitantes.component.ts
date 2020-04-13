import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DbService } from '../services/db.service';
import { IVisitantes, IApto, IMoradores } from 'src/models/interfaces';
import { NotifierService } from 'angular-notifier';
import { SessionService } from '../services/session.service';
import { UtilitiesService } from '../services/utilities.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
	selector: 'app-adiciona-visitantes',
	templateUrl: './adiciona-visitantes.component.html',
	styleUrls: ['./adiciona-visitantes.component.scss']
})
export class AdicionaVisitantesComponent implements OnInit {
	@Output() mudaComponente = new EventEmitter();

	NoApto: string;
	Bloco: string;
	Nome: string;
	Cpf: string;
	DataNascimento: string;
	Telefone: string;
	Observacao: string;

	Blocos: any;

	opcoesMoradores = [];
	opcoesAptos = [];

	opcoesMoradoresFiltrados: Observable<string[]>;
	opcoesAptosFiltrados: Observable<string[]>;

	autoCompleteMoradores = new FormControl();
	autoCompleteAptos = new FormControl();

	aptoSelecionado: IApto;
	moradorSelecionado: IMoradores;
	blocoSelecionado: any;

	constructor(private db: DbService, private session: SessionService, private utilities: UtilitiesService, private notifierService: NotifierService) { }

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
		this.listaInfosCampos();
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
		console.log('!! blocoSelecionado', this.blocoSelecionado);
		this.opcoesAptos = this.utilities.convertObjToArray(this.db.Condominios[this.session.idCondominio].Bloco[this.Bloco].Apartamento);
		console.log('!! opcoesAptos', this.opcoesAptos);
	}

	selecionarApto(opcao: IApto) {
		this.aptoSelecionado = opcao;
		this.opcoesMoradores = this.utilities.convertObjToArray(this.db.Condominios[this.session.idCondominio].Bloco[this.Bloco].Apartamento[opcao['id']].Morador);
	}

	selecionarMorador(opcao: IMoradores) {
		this.moradorSelecionado = opcao;
	}

	async listaInfosCampos() {
		const cond = this.db.Condominios[this.session.idCondominio];
		this.Blocos = this.utilities.convertObjToArray(cond.Bloco);
	}

	async adicionarVisitante() {
		if (!this.validacao()) {
			return;
		}
		const visitante: IVisitantes = {
			NomeCompleto: this.Nome,
			Cpf: this.Cpf,
			DataNascimento: this.DataNascimento,
			Telefone: this.Telefone,
			Bloco: this.blocoSelecionado['id'],
			Apto: this.aptoSelecionado['id'],
			DataHoraChegada: moment(new Date()).format('DD/MM/YYYY HH:mm'),
			Morador: this.moradorSelecionado['id'],
			Observacao: this.Observacao
		};
		this.db.inserirVisitante(visitante);
		this.notifierService.notify('success', 'Visitante cadastrado com sucesso!');
		this.mudaComponente.emit('visitantes/listar');
	}

	validacao() {
		let status = true;
		if (!this.Nome) {
			this.notifierService.notify('error', 'Digite o Nome!');
			status = false;
		}
		if (!this.Cpf) {
			this.notifierService.notify('error', 'Digite o Cpf!');
			status = false;
		}
		if (!this.DataNascimento) {
			this.notifierService.notify('error', 'Digite a Data de Nascimento!');
			status = false;
		}
		if (!this.Telefone) {
			this.notifierService.notify('error', 'Digite o Telefone para contato!');
			status = false;
		}
		return status;
	}
}
