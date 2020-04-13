
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { SessionService } from './session.service';
import { ICondominio, IBlocos, IApto, IMoradores, IVotacao, IVeiculo, IArea, INotificacao, IManutencao, IVisitantes, IGastoGanho } from 'src/models/interfaces';
import { UtilitiesService } from './utilities.service';

@Injectable({
	providedIn: 'root'
})
export class DbService {

	Condominios;

	constructor(private db: AngularFireDatabase, private session: SessionService, private utilities: UtilitiesService) { }

	async inserirCondominio(condominio: ICondominio) {
		const result = await this.db.list('Cliente/Condominio/').push(condominio);
		return result.key;
	}

	async inserirBlocos(blocos: IBlocos, idCondominio = this.session.idCondominio) {
		await this.db.list('Cliente/Condominio/' + idCondominio + '/Bloco').push(blocos);
	}

	async inserirApto(apto: IApto) {
		const result = await this.db.list('Cliente/Condominio/' + this.session.idCondominio + '/Bloco/' + apto.Bloco + '/Apartamento').push(apto);
		return result.key;
	}

	inserirMorador(morador: IMoradores, idApto: string, idBloco: string) {
		this.db.list('Cliente/Condominio/' + this.session.idCondominio + '/Bloco/' + idBloco + '/Apartamento/' + idApto + '/Morador').push(morador)
			.then((result: any) => {
				console.log('Morador: ' + result.key);
			});
	}

	inserirVotacao(votacao: IVotacao) {
		this.db.list('Cliente/Condominio/' + this.session.idCondominio + '/Votacao').push(votacao)
			.then((result: any) => {
				console.log(result.key);
			});
	}

	inserirVeiculo(veiculo: IVeiculo) {
		this.db.list('Cliente/Condominio/' + this.session.idCondominio + '/Veiculo').push(veiculo)
			.then((result: any) => {
				console.log(result.key);
			});
	}

	inserirAreaComum(area: IArea) {
		this.db.list('Cliente/Condominio/' + this.session.idCondominio + '/Bloco/' + area.Localizacao + '/AreaComum').push(area)
			.then((result: any) => {
				console.log(result.key);
			});
	}

	inserirNotificacao(notificacao: INotificacao) {
		this.db.list('Cliente/Condominio/' + this.session.idCondominio + '/Notificacao').push(notificacao)
			.then((result: any) => {
				console.log(result.key);
			});
	}

	inserirInadimplente(inadimplente) {
		this.db.list('Cliente/Condominio/' + this.session.idCondominio + '/Inadimplentes').push(inadimplente)
			.then((result: any) => {
				console.log(result.key);
			});
	}

	inserirManutencao(manutencao: IManutencao) {
		this.db.list('Cliente/Condominio/' + this.session.idCondominio + '/Chamados').push(manutencao)
			.then((result: any) => {
				console.log(result.key);
			});
	}

	inserirVisitante(visitante: IVisitantes) {
		console.log('!! visitante', visitante);
		this.db.list('Cliente/Condominio/' + this.session.idCondominio + '/Visitantes').push(visitante)
			.then((result: any) => {
				console.log(result.key);
			});
	}

	inserirGasto(gasto: IGastoGanho) {
		this.db.list('Cliente/Condominio/' + this.session.idCondominio + '/Gastos').push(gasto)
			.then((result: any) => {
				console.log(result.key);
			});
	}

	inserirGanho(ganho: IGastoGanho) {
		this.db.list('Cliente/Condominio/' + this.session.idCondominio + '/Ganhos').push(ganho)
			.then((result: any) => {
				console.log(result.key);
			});
	}

	deleta(url: string) {
		this.db.database.ref().child(url).remove();
	}

	listaCondominios = () => {
		const result = this.db.database.ref('Cliente/Condominio');
		result.on('value', (snapshot) => {
			this.Condominios = snapshot.toJSON();
		});
	}

	getBloco(idBloco: string) {
		const blocoObj = this.Condominios[this.session.idCondominio].Bloco;
		const blocos = this.utilities.convertObjToArray(blocoObj);
		return blocos.filter(_ => _.id === idBloco).pop();
	}

	getApto(idBloco: string, idApto: string) {
		if (!idBloco) {
			const aptoObj = this.Condominios[this.session.idCondominio].Bloco;
			const blocos = this.utilities.convertObjToArray(aptoObj);
			return blocos.forEach(_ => _.Apartamento.forEach(i => i === idApto));
		}
		return this.Condominios[this.session.idCondominio].Bloco[idBloco].Apartamento[idApto];
	}

	getAreaComum(idLocal: string) {
		const aptoObj = this.Condominios[this.session.idCondominio].Bloco;
		const blocos = this.utilities.convertObjToArray(aptoObj);
		for (let i = 0; i < blocos.length; i++) {
			const element = blocos[i];
			if (element.AreaComum) {
				const areasComuns = this.utilities.convertObjToArray(element.AreaComum);
				return areasComuns.filter(_ => _.id === idLocal).pop();
			}
		}
		return '';
	}

	getMorador(idBloco: string, idApto: string, idMorador: string) {
		return this.Condominios[this.session.idCondominio].Bloco[idBloco].Apartamento[idApto].Morador[idMorador];
	}

	atualizaCampo(caminho: string, valor) {
		this.db.database.ref(caminho).set(valor)
			.then((result: any) => {
				console.log(result.key);
			});
	}
}
