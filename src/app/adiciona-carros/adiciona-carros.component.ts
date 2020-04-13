import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AutoCompletesService, IMarcas, IModelos } from '../services/auto-completes.service';
import { NotifierService } from 'angular-notifier';
import { DbService } from '../services/db.service';
import { IVeiculo } from 'src/models/interfaces';
import { SessionService } from '../services/session.service';
import { UtilitiesService } from '../services/utilities.service';


@Component({
	selector: 'app-adiciona-carros',
	templateUrl: './adiciona-carros.component.html',
	styleUrls: ['./adiciona-carros.component.css'],
	providers: [AutoCompletesService]
})
export class AdicionaCarrosComponent implements OnInit {

	@Output() mudaComponente = new EventEmitter();

	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;

	marcaSelecionada: IMarcas;
	modeloSelecionado: IModelos;

	autoCompleteMarcas = new FormControl();
	autoCompleteModelos = new FormControl();
	opcoesMarcas = [];
	opcoesModelos = [];
	opcoesCores = [
		'AMARELO',
		'AZUL',
		'BEGE',
		'BRANCA',
		'CINZA',
		'DOURADA',
		'GRENÁ',
		'LARANJA',
		'MARROM',
		'PRATA',
		'PRETA',
		'ROSA',
		'ROXA',
		'VERDE',
		'VERMELHA',
		'FANTASIA'
	];
	opcoesMarcasFiltradas: Observable<string[]>;
	opcoesModelosFiltrados: Observable<string[]>;

	Bloco: string;
	NoApto: string;
	Cor: string;
	Observacao: string;
	tabSelecionada = 'carros';
	Blocos: any[];

	constructor(private autoCompletes: AutoCompletesService, private db: DbService, private notifierService: NotifierService, private session: SessionService, private utilities: UtilitiesService) {
		this.listaMarcas();
		this.listaInfosCampos();
	}

	ngOnInit() {
		this.opcoesMarcasFiltradas = this.autoCompleteMarcas.valueChanges
			.pipe(
				startWith(''),
				map(value => this._filtroMarcas(value))
			);
		this.opcoesModelosFiltrados = this.autoCompleteModelos.valueChanges
			.pipe(
				startWith(''),
				map(value => this._filtroModelos(value))
			);
	}

	async listaInfosCampos() {
		const cond = this.db.Condominios[this.session.idCondominio];
		this.Blocos = this.utilities.convertObjToArray(cond.Bloco);
	}

	private async listaMarcas() {
		this.autoCompletes.autoCompleteMarcas(this.tabSelecionada).then((data: IMarcas[]) => {
			this.opcoesMarcas = data;
		});
	}

	private _filtroMarcas(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.opcoesMarcas.filter(option => option.fipe_name.toLowerCase().includes(filterValue));
	}

	private _filtroModelos(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.opcoesModelos.filter(option => option.fipe_name.toLowerCase().includes(filterValue));
	}

	selecionarMarca(opcao: IMarcas) {
		this.marcaSelecionada = opcao;
		this.autoCompletes.autoCompleteModelos(opcao.id, this.tabSelecionada).then((data: IModelos[]) => {
			this.opcoesModelos = data;
		});
	}

	selecionarModelo(opcao: IModelos) {
		this.modeloSelecionado = opcao;
	}

	adicionarVeiculo(tipo: string) {
		const veiculo: IVeiculo = {
			IdApto: this.Bloco,
			Tipo: tipo,
			Marca: this.marcaSelecionada.fipe_name,
			Modelo: this.modeloSelecionado.fipe_name,
			Cor: this.Cor,
			Observacao: this.Observacao
		};

		this.db.inserirVeiculo(veiculo);
		this.limparCampos();
		this.notifierService.notify('success', 'Veículo cadastrado com sucesso!');
		this.mudaComponente.emit('veiculos/listar');
	}

	selecionarTab($event) {
		const tabs = ['carros', 'motos', 'caminhoes'];
		this.tabSelecionada = tabs[$event.index];
		this.listaMarcas();
	}

	limparCampos() {
		this.Cor = null;
		this.Observacao = '';
		this.Bloco = '';
		this.NoApto = '';
	}
}
