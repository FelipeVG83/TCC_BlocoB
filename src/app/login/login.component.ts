import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	imageUrl: any;

	Usuario: string;
	Senha: string;

	constructor(private utilities: UtilitiesService, private router: Router) { }

	ngOnInit() {
		this.getImagem();
	}

	async getImagem() {
		const image = await this.utilities.getImage();
		const index = Math.floor(Math.random() * (10));
		this.imageUrl = image.photos[index].src.portrait;
	}

	logar() {
		if (this.Usuario === 'admin' && this.Senha === 'teste123@@') {
			this.router.navigate(['/main']);
		}
	}

}
