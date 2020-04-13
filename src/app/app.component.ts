import { Component } from '@angular/core';
import { DbService } from './services/db.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(private db: DbService) {
		this.db.listaCondominios();
	}

}
