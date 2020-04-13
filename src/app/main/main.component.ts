import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  title = 'bloco-b';
	componente = 'dashboard';

	constructor() {	}

	mudarComponente(event) {
		this.componente = event;
	}

}
