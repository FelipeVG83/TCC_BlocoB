import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class AutoCompletesService {

	constructor(private http: HttpClient) { }

	private cache: any = {};

	async autoCompleteMarcas(tipo: string) {
		const url = 'http://fipeapi.appspot.com/api/1/' + tipo + '/marcas.json';
		if (this.cache[tipo]) {
			return this.cache[tipo];
		}
		return new Promise((resolve, reject) => {
			this.http.get(url)
				.subscribe((data: IMarcas[]) => {
					this.cache[tipo] = data;
					resolve(data);
				});
		});
	}

	async autoCompleteModelos(id: string, tipo: string) {
		const url = 'http://fipeapi.appspot.com/api/1/' + tipo + '/veiculos/' + id + '.json';
		return new Promise((resolve, reject) => {
			this.http.get(url)
				.subscribe((data: IModelos[]) => {
					resolve(data);
				});
		});
	}
}

export interface IMarcas {
	name: string;
	fipe_name: string;
	order: string;
	key: string;
	id: string;
}

export interface IModelos {
	key: string;
	name: string;
	id: string;
	fipe_name: string;
}
