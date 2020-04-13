import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { ICondominio, IBlocos } from 'src/models/interfaces';
import { NotifierService } from 'angular-notifier';

@Component({
	selector: 'app-adiciona-condominio',
	templateUrl: './adiciona-condominio.component.html',
	styleUrls: ['./adiciona-condominio.component.scss']
})
export class AdicionaCondominioComponent implements OnInit {

	Bloco: string;
	Blocos: string[] = [];
	Nome: string;
	RazaoSocial: string;
	CEP: string;
	Endereco: string;
	Bairro: string;
	Cidade: string;
	Estado: string;
	Pais: string;

	constructor(private db: DbService, private notifierService: NotifierService) { }

	ngOnInit() {
	}

	adicionarBloco() {
		this.Blocos.push(this.Bloco);
		this.Bloco = '';
	}

	deletarBloco(i) {
		this.Blocos.splice(i, 1);
	}

	async adicionarCondominio() {
		const condominio: ICondominio = {
			Bairro: this.Bairro,
			CEP: this.CEP,
			Cidade: this.Cidade,
			Endereco: this.Endereco,
			Estado: this.Estado,
			Nome: this.Nome,
			Pais: this.Pais,
			RazaoSocial: this.RazaoSocial
		}
		const idCondominio = await this.db.inserirCondominio(condominio);

		// tslint:disable-next-line: prefer-for-of
		for (let i = 0; i < this.Blocos.length; i++) {
			const elem = this.Blocos[i];
			const bloco: IBlocos = {
				Nome: elem
			};
			this.db.inserirBlocos(bloco, idCondominio);
		}

		this.limpaCampos();
		this.notifierService.notify('success', 'Condomínio cadastrado com sucesso!');
	}

	limpaCampos() {
		this.Bloco = '';
		this.Blocos = [];
		this.Nome = '';
		this.RazaoSocial = '';
		this.CEP = '';
		this.Endereco = '';
		this.Bairro = '';
		this.Cidade = '';
		this.Estado = '';
		this.Pais = '';
	}
}
