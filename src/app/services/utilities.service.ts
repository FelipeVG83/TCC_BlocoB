import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UtilitiesService {

	constructor(private http: HttpClient) { }

	convertObjToArray(obj) {
		// tslint:disable-next-line: prefer-const
		let values = [];
		for (const key in obj) {
			if (key.indexOf('-', 0) < 0) {
				continue;
			}
			obj[key].id = key;
			values.push(obj[key]);
		}
		return values;
	}

	async getImage(): Promise<IImage> {
		return await this.http.get<IImage>(
			'https://api.pexels.com/v1/search?query=condominium&per_page=10&page=1', { headers: { Authorization: '563492ad6f917000010000019b4bcffdefa840a69c7ab0074b998663' } }).toPromise();
	}
}

interface IImage {
	total_results: number;
	page: number;
	per_page: number;
	photos: {
		id: number;
		width: number;
		height: number;
		url: string;
		photographer: string;
		photographer_url: string;
		photographer_id: number;
		src: {
			original: string;
			large2x: string;
			large: string;
			medium: string;
			small: string;
			portrait: string;
			landscape: string;
			tiny: string;
		};
	}[];
	next_page: string;
}