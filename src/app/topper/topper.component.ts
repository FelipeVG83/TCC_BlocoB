import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { SessionService } from '../services/session.service';
import { UtilitiesService } from '../services/utilities.service';
import { Router } from '@angular/router';
import { ICondominio } from 'src/models/interfaces';

@Component({
	selector: 'app-topper',
	templateUrl: './topper.component.html',
	styleUrls: ['./topper.component.scss']
})
export class TopperComponent implements OnInit {

	condominioSelecionado: string;
	Condominios: ICondominio[];

	constructor(private session: SessionService, private db: DbService, private utilities: UtilitiesService, private router: Router) {
	}

	ngOnInit() {
		setTimeout(() => {
			this.Condominios = this.utilities.convertObjToArray(this.db.Condominios);
			if (this.Condominios.length > 0) {
				this.condominioSelecionado = this.Condominios[0]['id'];
				this.mudaCondominio();
			}
		}, 2000);
	}

	mudaCondominio() {
		this.session.idCondominio = this.condominioSelecionado;
	}

	logout() {
		this.router.navigate(['/login']);
	}

}
