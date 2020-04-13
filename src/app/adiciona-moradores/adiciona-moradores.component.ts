import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { IMoradores, IApto } from 'src/models/interfaces';
import { NotifierService } from 'angular-notifier';
import { SessionService } from '../services/session.service';
import { UtilitiesService } from '../services/utilities.service';

@Component({
	selector: 'app-adiciona-moradores',
	templateUrl: './adiciona-moradores.component.html',
	styleUrls: ['./adiciona-moradores.component.scss']
})
export class AdicionaMoradoresComponent implements OnInit {

	public noApto: string;
	public bloco: string;
	public nome: string;
	public sobrenome: string;
	public cpf: string;
	public rg: string;
	public email: string;
	public dataNascimento: string;
	public telefone: string;
	public acesso;
	public cracha;
	public senha;
	public confirmarSenha;
	usuario: string;

	public exibirTabela = false;

	displayedColumns: string[] = ['no', 'nome', 'email', 'telefone'];
	dataSource: IMoradores[] = [];
	Condominios = [];
	Blocos: any;

	constructor(private db: DbService, private session: SessionService, private utilities: UtilitiesService, private notifierService: NotifierService) {}

	ngOnInit() {
		this.listaInfosCampos();
	}

	async listaInfosCampos() {
		const cond = this.db.Condominios[this.session.idCondominio];

		this.Blocos = this.utilities.convertObjToArray(cond.Bloco);
	}

	async adicionarMorador() {
		if (this.senha !== this.confirmarSenha) {
			this.notifierService.notify('error', 'As senhas devem ser iguais!');
			return;
		}

		this.exibirTabela = false;

		const apto: IApto = {
			Bloco: this.bloco,
			Condominio: '1',
			NroApto: this.noApto,
		};
		const idApto = await this.db.inserirApto(apto);

		const morador: IMoradores = {
			Usuario: this.usuario,
			Senha: this.senha,
			Nome: this.nome,
			Sobrenome: this.sobrenome,
			Cpf: this.cpf,
			Rg: this.rg,
			DataNascimento: this.dataNascimento,
			Email: this.email,
			Telefone: this.telefone,
		};
		this.db.inserirMorador(morador, idApto, this.bloco);
		this.dataSource.push(morador);

		setTimeout(() => {
			this.exibirTabela = true;
		}, 200);

		this.limparCampos();
		this.notifierService.notify('success', 'Apartamento cadastrado com sucesso!');
	}

	limparCampos() {
		this.nome = '';
		this.sobrenome = '';
		this.cpf = '';
		this.rg = '';
		this.email = '';
		this.dataNascimento = '';
		this.telefone = '';
		this.acesso = '';
		this.cracha = '';
	}

}
