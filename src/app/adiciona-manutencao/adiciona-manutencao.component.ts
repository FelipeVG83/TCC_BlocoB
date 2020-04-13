import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ImageService } from '../services/image.service';
import { DbService } from '../services/db.service';
import { NotifierService } from 'angular-notifier';
import { IManutencao } from 'src/models/interfaces';
import * as moment from 'moment';

class ImageSnippet {
	constructor(public src: string, public file: File) { }
}

@Component({
	selector: 'app-adiciona-manutencao',
	templateUrl: './adiciona-manutencao.component.html',
	styleUrls: ['./adiciona-manutencao.component.scss']
})
export class AdicionaManutencaoComponent implements OnInit {

	@Output() mudaComponente = new EventEmitter();

	public uploader = new FileUploader({ url: 'https://evening-anchorage-3159.herokuapp.com/api/' });
	selectedFile: any;
	idImagem: string;
	fileImagem: File;

	constructor(private imageService: ImageService, private db: DbService, private notifierService: NotifierService) { }

	Assunto: string;
	Local: string;
	Descricao: string;
	Categoria: string;

	ngOnInit() {
	}

	processarFile(imageInput) {
		this.fileImagem = imageInput.files[0];
		this.idImagem = this.imageService.nomeImagem();
	}

	adicionaManutencao() {
		this.imageService.uploadImagem(this.idImagem, this.fileImagem);
		const manutencao: IManutencao = {
			Assunto: this.Assunto,
			Local: this.Local,
			Descricao: this.Descricao,
			Categoria: this.Categoria,
			Imagem: this.idImagem,
			DiaChamado: moment(new Date()).format('DD/MM/YYYY'),
			HoraChamado: moment(new Date()).format('HH:mm')
		};
		this.db.inserirManutencao(manutencao);
		this.limparCampos();
		this.notifierService.notify('success', 'Manutenção cadastrada com sucesso!');
		this.mudaComponente.emit('manutencao/listar');
	}

	limparCampos() {
		this.Assunto = '';
		this.Local = '';
		this.Descricao = '';
		this.Categoria = '';
		this.selectedFile = null;
	}
}
